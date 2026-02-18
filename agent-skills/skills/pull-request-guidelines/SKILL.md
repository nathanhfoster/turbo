---
name: pull-request-guidelines
description: Guidelines for creating pull requests with concise descriptions, proper template usage, and no AI signatures. Use when creating PRs, writing PR descriptions, or reviewing PR format.
---

# Pull Request Guidelines

Conventions for creating pull requests.

## Template

Always follow the PR template structure (`.github/pull_request_template.md`). Fill out both "Description" and "Reason/Reference" sections.

```markdown
## Description
[Brief summary of changes]

## Reason/Reference
[Why this change was needed — reference issue number or business requirement]

## Testing
[How the changes were tested]
```

## Rules

- **Keep descriptions concise**: Brief but informative. Focus on what changed and why, not extensive implementation details.
- **Never sign as AI**: Do not include any signatures, footers, or mentions indicating the PR was created by an AI assistant.
- **GitHub CLI available**: `gh` can be used for tasks like creating PRs and viewing issues.
