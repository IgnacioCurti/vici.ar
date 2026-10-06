---
name: skill-builder
description: Create, review, and improve OpenCode skills with valid SKILL.md metadata, precise activation rules, and practical verification steps. Use when the user asks to create a skill, improve an agent skill, package reusable workflow instructions, or validate a skill definition.
---

# Skill Builder

Design skills as focused, reusable operating instructions for OpenCode agents. A skill should improve decisions and execution, not merely restate generic coding advice.

## Workflow

1. Identify the skill's one primary job and its activation boundary. Ask a clarifying question if the scope spans unrelated workflows.
2. Inspect existing project instructions, skills, agents, commands, and MCP configuration. Reuse established terminology and avoid conflicting rules.
3. Decide the scope:
   - Project skill: `.opencode/skills/<name>/SKILL.md`.
   - Shared skill: use the configured external skills path only when the user explicitly requests it.
4. Choose a lowercase hyphen-separated name no longer than 64 characters. The directory name and frontmatter `name` must match.
5. Write frontmatter with:
   - `name`.
   - A concise `description` that states what the skill does and when to use it.
   - Optional `license`, `compatibility`, or string-valued `metadata` only when needed.
6. Write the body around decisions and workflow:
   - Preconditions and required context.
   - Ordered steps the agent can execute.
   - Tool-selection guidance.
   - Safety boundaries and approval points.
   - Expected outputs.
   - Verification and failure reporting.
7. Keep the skill narrow. Put adjacent concerns in separate skills rather than adding a large collection of loosely related instructions.
8. If the skill needs current library, SDK, service, or API behavior, use Context7. Resolve the library ID first and query one focused concept at a time.
9. If the skill needs repository examples or GitHub operations, use GitHub tools deliberately and keep authentication context out of the skill text.
10. Validate the file path, frontmatter, trigger description, internal consistency, and examples. Review for secrets and unsupported OpenCode configuration fields.

## Writing Rules

- Write instructions in the repository's established documentation language unless the user requests otherwise.
- Use direct imperative language and concrete conditions.
- Put likely trigger words in the description, but avoid descriptions so broad that the skill activates on every coding request.
- Use `Use ONLY when...` when adjacent topics should not trigger the skill.
- State what the agent must not do when mistakes would be costly.
- Prefer repository commands and paths over generic placeholders when the skill is project-specific.
- Do not embed credentials, personal data, environment-file contents, or machine-specific secrets.
- Do not claim that a tool, API, or command exists unless it was inspected or documented.
- Avoid duplicating global agent instructions; add only skill-specific behavior.

## Review Checklist

Check all of the following before reporting success:

- File is exactly `SKILL.md` inside a directory named after the skill.
- `name` is present, valid, lowercase, hyphen-separated, and matches the directory.
- `description` explains both capability and activation conditions.
- Instructions are actionable, ordered, and scoped to one primary responsibility.
- Tool usage, permissions, dependencies, and approval points are explicit.
- Verification steps can actually be run in the target repository.
- No unsupported frontmatter or invented OpenCode configuration is included.
- No secrets or sensitive values are present.

## Expected Output

When creating or revising a skill, report:

- The skill path and activation description.
- The workflow and safety boundaries added.
- Any tools, references, or dependencies it expects.
- Validation performed and remaining limitations.
- A reminder to restart OpenCode after adding or changing the skill, because skills are loaded when the session starts.
