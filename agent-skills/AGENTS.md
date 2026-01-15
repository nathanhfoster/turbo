# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, Cursor, Copilot, etc.) when working with the agent-skills directory.

## Directory Overview

Agent skills for React/Next.js development. These skills are packaged instructions that extend AI agent capabilities.

## Creating a New Skill

### Directory Structure

```
skills/
  {skill-name}/           # kebab-case directory name
    SKILL.md              # Required: quick reference
    AGENTS.md             # Optional: full guidelines
    rules/                # Optional: individual rule files
```

### Naming Conventions

- **Skill directory**: `kebab-case` (e.g., `react-best-practices`, `web-design-guidelines`)
- **SKILL.md**: Always uppercase, always this exact filename
- **AGENTS.md**: Full guidelines document (loaded on demand)

### SKILL.md Format

```markdown
---
name: {skill-name}
description: {One sentence describing when to use this skill.}
---

# {Skill Title}

{Brief description of what the skill does.}

## When to Apply

{Bullet list of use cases}

## Quick Reference

{Summary of key rules/patterns}

## Full Documentation

For complete guidelines: `AGENTS.md`
```

### Best Practices for Context Efficiency

Skills are loaded on-demand. To minimize context usage:

- **Keep SKILL.md under 500 lines** — put detailed reference material in AGENTS.md or rules/
- **Write specific descriptions** — helps the agent know exactly when to activate the skill
- **Use progressive disclosure** — reference supporting files that get read only when needed

## Build Tooling

Build tooling is located at `packages/agent-skills-build/`:

```bash
pnpm --filter @nathanhfoster/agent-skills-build build    # Build AGENTS.md from rules/
pnpm --filter @nathanhfoster/agent-skills-build validate # Validate skill structure
```
