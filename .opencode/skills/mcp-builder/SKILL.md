---
name: mcp-builder
description: Design, scaffold, configure, and verify Model Context Protocol servers. Use when the user asks to create an MCP server, connect a new MCP integration, expose tools or resources through MCP, or troubleshoot an MCP configuration.
---

# MCP Builder

Create MCP integrations deliberately. Treat the MCP server implementation, its OpenCode configuration, and its verification steps as separate deliverables.

## Workflow

1. Clarify the integration goal before editing files:
   - What external system or local capability should be exposed?
   - Which tools, resources, or prompts are needed?
   - Is the server local over stdio or remote over HTTP?
   - What authentication and data-sensitivity constraints apply?
2. Inspect the repository and existing OpenCode configuration. Preserve existing MCP entries and conventions.
3. If an SDK, protocol detail, or service API is involved, use Context7 to retrieve current documentation. Resolve the library ID before querying documentation.
4. If examples or an existing implementation are useful, use GitHub search. Call the authenticated-user lookup first when GitHub operations require account context.
5. Choose the smallest appropriate implementation:
   - Prefer an existing official or maintained MCP server when it meets the requirement.
   - Otherwise scaffold a local server in the repository's existing language and package structure.
   - Do not add a dependency without user approval.
6. Define a narrow tool/resource contract. Document input schemas, output shapes, errors, side effects, and required permissions.
7. Configure OpenCode only after validating the shape:
   - Local servers require `type: "local"` and a `command` array.
   - Remote servers require `type: "remote"` and a URL.
   - Use `{env:VARIABLE}` interpolation for credentials; never place secrets in files.
   - Keep `enabled: false` available for an incomplete or optional integration.
8. Add focused tests or a smoke-test procedure for successful calls, invalid input, unavailable upstream services, and authentication failures.
9. Run the repository's relevant formatter, type check, lint, and test commands. Report pre-existing failures separately.
10. Review the diff for secrets, excessive permissions, accidental public-contract changes, and unnecessary dependencies.

## Implementation Rules

- Keep tools small and deterministic. Validate all arguments at the boundary.
- Return structured, useful errors without leaking tokens, personal data, or upstream credentials.
- Make read-only operations the default. Call out every write or destructive operation explicitly.
- Prefer least-privilege credentials and document the exact environment variables required.
- Do not invent authorization, ownership, visibility, or retention rules. Ask for a product decision when they are undefined.
- Do not silently register, publish, deploy, or enable a server. Present those changes for approval.
- Do not modify `.env` files or copy credential values into logs, tests, documentation, or configuration.

## Expected Output

When implementing an MCP, report:

- The server location and transport.
- Tools/resources added and their contracts.
- Configuration changes and required environment variable names.
- Tests or smoke checks run and their results.
- Any approval still needed, including dependencies, deployment, or enabling the server.

## OpenCode Configuration Checklist

Before finishing, verify that:

- The MCP entry is under the `mcp` object and has the correct `type`.
- Local `command` is an array, not a shell string or a separate `args` field.
- Remote headers do not contain literal tokens.
- Existing `$schema` and unrelated configuration are preserved.
- The user is told to restart OpenCode after configuration changes because config is loaded at startup.
