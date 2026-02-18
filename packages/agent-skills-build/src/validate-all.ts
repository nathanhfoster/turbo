#!/usr/bin/env node
/**
 * Validate all skills have a well-formed SKILL.md with correct frontmatter.
 * This checks every skill directory, not just rules-based ones.
 */

import { readdir, readFile, stat } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import { SKILLS_ROOT } from './config.js'

interface SkillValidationError {
  skill: string
  message: string
}

const NAME_MAX_LENGTH = 64
const DESCRIPTION_MAX_LENGTH = 1024
const NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const SKILL_MD_MAX_LINES = 500

/**
 * Discover all skill directories. A skill directory contains SKILL.md directly.
 * Handles namespace directories (e.g., `claude.ai/vercel-deploy/SKILL.md`)
 * by searching one level deeper.
 */
async function discoverSkills(root: string): Promise<string[]> {
  const skills: string[] = []
  const entries = await readdir(root)

  for (const entry of entries) {
    const entryPath = join(root, entry)
    const entryStat = await stat(entryPath)
    if (!entryStat.isDirectory()) continue

    if (existsSync(join(entryPath, 'SKILL.md'))) {
      skills.push(entry)
    } else {
      const subEntries = await readdir(entryPath)
      for (const sub of subEntries) {
        const subPath = join(entryPath, sub)
        const subStat = await stat(subPath)
        if (subStat.isDirectory() && existsSync(join(subPath, 'SKILL.md'))) {
          skills.push(join(entry, sub))
        }
      }
    }
  }

  return skills
}

function parseFrontmatter(content: string): Record<string, string> | null {
  if (!content.startsWith('---')) return null

  const endIdx = content.indexOf('---', 3)
  if (endIdx === -1) return null

  const frontmatterText = content.slice(3, endIdx).trim()
  const result: Record<string, string> = {}

  let currentKey = ''
  let currentValue = ''

  for (const line of frontmatterText.split('\n')) {
    const colonIdx = line.indexOf(':')
    if (colonIdx !== -1 && !line.startsWith(' ') && !line.startsWith('\t')) {
      if (currentKey) {
        result[currentKey] = currentValue.trim()
      }
      currentKey = line.slice(0, colonIdx).trim()
      currentValue = line.slice(colonIdx + 1)
    } else if (currentKey) {
      currentValue += ' ' + line
    }
  }

  if (currentKey) {
    result[currentKey] = currentValue.trim()
  }

  return result
}

async function validateSkill(skillName: string): Promise<SkillValidationError[]> {
  const errors: SkillValidationError[] = []
  const skillPath = join(SKILLS_ROOT, skillName)
  const skillMdPath = join(skillPath, 'SKILL.md')

  if (!existsSync(skillMdPath)) {
    errors.push({ skill: skillName, message: 'Missing SKILL.md' })
    return errors
  }

  const content = await readFile(skillMdPath, 'utf-8')
  const lineCount = content.split('\n').length

  if (lineCount > SKILL_MD_MAX_LINES) {
    errors.push({
      skill: skillName,
      message: `SKILL.md is ${lineCount} lines (max ${SKILL_MD_MAX_LINES})`,
    })
  }

  const frontmatter = parseFrontmatter(content)
  if (!frontmatter) {
    errors.push({ skill: skillName, message: 'Missing YAML frontmatter (---) in SKILL.md' })
    return errors
  }

  // Validate name
  if (!frontmatter.name) {
    errors.push({ skill: skillName, message: 'Missing "name" in frontmatter' })
  } else {
    if (frontmatter.name.length > NAME_MAX_LENGTH) {
      errors.push({
        skill: skillName,
        message: `name "${frontmatter.name}" exceeds ${NAME_MAX_LENGTH} chars (${frontmatter.name.length})`,
      })
    }
    if (!NAME_PATTERN.test(frontmatter.name)) {
      errors.push({
        skill: skillName,
        message: `name "${frontmatter.name}" must be lowercase letters, numbers, and hyphens only`,
      })
    }
    const leafDir = skillName.includes('/') ? skillName.split('/').pop()! : skillName
    if (frontmatter.name !== leafDir) {
      errors.push({
        skill: skillName,
        message: `name "${frontmatter.name}" does not match directory name "${leafDir}"`,
      })
    }
  }

  // Validate description
  if (!frontmatter.description) {
    errors.push({ skill: skillName, message: 'Missing "description" in frontmatter' })
  } else {
    if (frontmatter.description.length === 0) {
      errors.push({ skill: skillName, message: 'description is empty' })
    }
    if (frontmatter.description.length > DESCRIPTION_MAX_LENGTH) {
      errors.push({
        skill: skillName,
        message: `description exceeds ${DESCRIPTION_MAX_LENGTH} chars (${frontmatter.description.length})`,
      })
    }
  }

  // Check for content after frontmatter
  const endIdx = content.indexOf('---', 3)
  if (endIdx !== -1) {
    const body = content.slice(endIdx + 3).trim()
    if (body.length === 0) {
      errors.push({ skill: skillName, message: 'SKILL.md has frontmatter but no body content' })
    }
  }

  return errors
}

async function validateAll() {
  try {
    console.log('Validating all skills...')
    console.log(`Skills root: ${SKILLS_ROOT}\n`)

    const skillDirs = await discoverSkills(SKILLS_ROOT)

    if (skillDirs.length === 0) {
      console.log('No skill directories found.')
      return
    }

    const allErrors: SkillValidationError[] = []
    const results: { skill: string; valid: boolean; hasRules: boolean }[] = []

    for (const skill of skillDirs.sort()) {
      const errors = await validateSkill(skill)
      const hasRules = existsSync(join(SKILLS_ROOT, skill, 'rules'))
      results.push({ skill, valid: errors.length === 0, hasRules })
      allErrors.push(...errors)
    }

    // Print results table
    console.log('  Skill                          Status    Type')
    console.log('  ' + '─'.repeat(55))

    for (const { skill, valid, hasRules } of results) {
      const status = valid ? '✓ valid' : '✗ invalid'
      const type = hasRules ? 'rules-based' : 'standard'
      console.log(`  ${skill.padEnd(33)}${status.padEnd(10)}${type}`)
    }

    console.log()

    if (allErrors.length > 0) {
      console.error(`✗ ${allErrors.length} validation error(s):\n`)
      for (const error of allErrors) {
        console.error(`  ${error.skill}: ${error.message}`)
      }
      console.log()
      process.exit(1)
    }

    console.log(`✓ All ${skillDirs.length} skills are valid`)
  } catch (error) {
    console.error('Validation failed:', error)
    process.exit(1)
  }
}

validateAll()
