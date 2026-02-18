/**
 * Configuration for the build tooling
 */

import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const BUILD_DIR = join(__dirname, '..')
export const SKILLS_ROOT = join(__dirname, '../../..', 'agent-skills/skills')

const DEFAULT_SKILL = 'react-best-practices'

/**
 * Resolve which skill to operate on.
 * Accepts an explicit skill name or reads from the first CLI arg after `--skill`.
 */
export function resolveSkill(explicitSkill?: string): string {
  if (explicitSkill) return explicitSkill

  const idx = process.argv.indexOf('--skill')
  if (idx !== -1 && process.argv[idx + 1]) {
    return process.argv[idx + 1]
  }

  return DEFAULT_SKILL
}

export function skillDir(skill: string) {
  return join(SKILLS_ROOT, skill)
}
export function rulesDir(skill: string) {
  return join(skillDir(skill), 'rules')
}
export function metadataFile(skill: string) {
  return join(skillDir(skill), 'metadata.json')
}
export function outputFile(skill: string) {
  return join(skillDir(skill), 'AGENTS.md')
}
export function testCasesFile() {
  return join(BUILD_DIR, 'test-cases.json')
}

// Legacy constants for backward compatibility
export const SKILL_DIR = skillDir(resolveSkill())
export const RULES_DIR = rulesDir(resolveSkill())
export const METADATA_FILE = metadataFile(resolveSkill())
export const OUTPUT_FILE = outputFile(resolveSkill())
export const TEST_CASES_FILE = testCasesFile()
