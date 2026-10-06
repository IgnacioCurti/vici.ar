# AGENTS.md — vici.ar

vici.ar is a web application intended to help a group of friends coordinate games around their available schedules. The repository currently contains authentication, email verification, user profile, and initial event-related functionality.

## Stack and Structure

This is a monorepo with two independent applications.

### Frontend

Verified from `frontend/package.json`:

- React `^19.2.0` and React DOM `^19.2.0`.
- TypeScript `~5.9.3`.
- Vite `^7.2.4`.
- React Router DOM `^7.12.0`.
- HeroUI `^2.8.7`.
- Tailwind CSS `^4.1.18` with the Vite plugin.
- Axios `^1.13.4`.
- ESLint `^9.39.1`.

Important frontend locations:

- `frontend/src/app/components/`: pages, authentication components, and layout components.
- `frontend/src/services/`: HTTP and authentication services.
- `frontend/src/types/`: frontend data and authentication types.
- `frontend/src/context/`: authentication context and provider.
- `frontend/src/hooks/`: reusable React hooks.
- `frontend/src/app/styles/`: feature styles.
- `frontend/src/App.tsx` and `frontend/src/main.tsx`: application routing and providers.

### Backend

Verified from `backend/package.json` and the Prisma schema:

- Node.js application using Express `^5.2.1`.
- TypeScript `^5.9.3`.
- Prisma `^7.2.0` with PostgreSQL.
- PostgreSQL access through `pg` and the Prisma PostgreSQL adapter.
- Supabase client `^2.89.0` is installed.
- JWT, bcrypt, and Google APIs are used for authentication, password hashing, and email delivery.
- Vitest `^1.4.9` is used for tests.

Important backend locations:

- `backend/src/routes/`: Express route definitions.
- `backend/src/controllers/`: HTTP request handling.
- `backend/src/services/`: application and domain services.
- `backend/src/models/dto/`: request and response DTOs.
- `backend/src/middleware/`: authentication and request middleware.
- `backend/src/config/`: infrastructure configuration, including Prisma.
- `backend/src/utils/`: shared utilities and email templates.
- `backend/src/tests/`: Vitest tests.
- `backend/prisma/schema.prisma`: database schema.
- `backend/prisma/migrations/`: existing Prisma migration history.

## Commands

There are no root-level package scripts. Run each command from the application directory shown below.

### Frontend

From `frontend/`:

```text
npm run dev
```

Starts the Vite development server.

```text
npm run build
```

Runs TypeScript build checking and the Vite production build.

```text
npm run lint
```

Runs ESLint.

```text
npm run preview
```

Serves the production build locally after `npm run build`.

### Backend

From `backend/`:

```text
npm run dev
```

Starts the development server through Nodemon and `tsx`.

```text
npm run build
```

Runs the TypeScript compiler.

```text
npm start
```

Starts the compiled backend from `dist/src/index.js`.

```text
npm test
```

Runs Vitest in watch mode, as defined by the package script.

```text
npm run test:watch
```

Runs Vitest explicitly in watch mode.

For a non-interactive test run, use the installed Vitest binary from `backend/`:

```text
npx vitest run
```

This is the deterministic verification command used for the current baseline; it is not a package script.

## Conventions

### Code

- Keep code readable, modular, and organized around single responsibilities.
- Handle errors explicitly and provide useful diagnostic messages.
- Add comments only when intent or a non-obvious decision needs clarification.
- Use English for new documentation, instructions, comments, user-facing technical explanations, commit messages, and identifiers where applicable.
- Preserve existing Spanish text when changing unrelated code.

### Branches

The repository README defines these branch prefixes:

- New backend features: `feature/BE-name`
- New frontend features: `feature/FE-name`
- Backend fixes: `fix/BE-name`
- Frontend fixes: `fix/FE-name`

Use short, descriptive names with hyphens, normally no more than four to six words. For work spanning both applications, the README mentions `feature/FE-BE-name`, while preferring separate branches by responsibility when possible.

The documented integration branches are:

- `dev`: integration and verification branch.
- `main`: stable branch for production-ready code.

### Commits and Pull Requests

- Make commits atomic and focused on one logical change.
- Use clear English commit messages for new commits.
- Keep pull requests small and easy to review.
- Include implementation notes and testing steps in the pull request description.
- Before opening a pull request, run the relevant checks, review the diff, check for secrets, and confirm that the branch is up to date.
- Do not treat a passing build as proof that the test suite is green.

## Domain Rules / Known Traps

The following behaviors are verified in the current code. They are not recommendations to redesign the system.

### Verified behaviors and technical traps

- `AuthService.login()` rejects a user when `email_verified` is false.
- Registration creates an unverified user, generates a verification code, starts email delivery, and returns a token and user response.
- The backend user response DTO uses `userId`, while the frontend `User` type expects `id`.
- The frontend `User` type expects `emailVerified`, but the backend user response DTO does not currently expose that field.
- The backend DTO permits nullable `displayname` and `description`, while the frontend types do not express the same nullability.
- `EmailService` uses `googleapis` and Gmail OAuth. The email tests mock `nodemailer`, which is not the dependency used by the service, so those tests are not isolated from Gmail.
- `backend/src/routes/event.routes.ts` exists, but `backend/src/router.ts` currently mounts authentication and user routes only. Event routes are not mounted there.
- The authentication middleware verifies the JWT but does not attach the decoded payload to the Express request. Controllers cannot currently obtain the authenticated principal through `req.user` or an equivalent property.
- The current login test mock does not set `email_verified: true`, which is why that test fails against the current service behavior.

### Decisions still pending

- The repository does not document whether users may view any profile or event after authentication, or only profiles and events related to them.
- Ownership, participant, friendship, and visibility rules for profiles and events are not defined here.
- Do not invent or implement those access rules without an explicit product decision and tests describing the policy.

## Working Style

- Inspect the related code and tests before editing.
- Preserve the existing frontend/backend separation and layer structure.
- Keep changes small, focused, and easy to review.
- For a change that affects both frontend and backend, inspect and verify both sides of the contract.
- Before editing, state which files will change, what problem the change solves, what behavior remains unchanged, and how the result will be verified.
- Report pre-existing failures separately from regressions introduced by the change.
- Do not create commits, push changes, or modify branches unless explicitly requested.

## Limits

### ✅ Always

- Use English for new project documentation and technical communication.
- Inspect relevant implementation, DTOs, types, routes, and tests before editing.
- Preserve the existing architecture unless concrete evidence and approval support a change.
- Keep changes scoped to the requested task.
- Run the relevant frontend and backend verification commands.
- Isolate external integrations such as Gmail from unit tests.
- Review diffs and check for secrets before reporting a task complete.

### ⚠️ Ask Before

- Changing the public contract between frontend and backend.
- Changing authentication, authorization, profile visibility, or event access behavior.
- Changing the Prisma schema or adding a migration; first review the existing migration conventions and confirm the intended data change.
- Adding a dependency, even if it appears to simplify the implementation.
- Making a change that spans frontend and backend without a clear contract and testing plan.
- Treating an existing model, service, or route as evidence that the corresponding feature is complete.

### 🚫 Never

- Never read, display, copy, or modify `.env` files or expose their values.
- Never add secrets, tokens, passwords, or credentials to code, tests, documentation, or logs.
- Never introduce a new dependency without approval.
- Never change the Prisma schema without reviewing the migration conventions and creating the corresponding migration when approved.
- Never replace the existing framework, ORM, router, or layer structure without explicit approval.
- Never invent product or authorization rules for profiles, events, friendships, or availability.
- Never report the repository as fully green while known tests are failing.

## Verification

### Frontend

From `frontend/`:

```text
npm run lint
npm run build
```

Current baseline: frontend lint and build pass. The build currently reports a bundle-size warning, but the warning does not fail the build.

### Backend

From `backend/`:

```text
npm run build
npx vitest run
```

Current baseline: the backend build passes, but 4 of 32 tests fail.

The known failures are:

- One login service test does not set `email_verified: true`, although the current service requires verified email.
- Three email service tests mock `nodemailer` even though `EmailService` uses `googleapis` and Gmail OAuth. They fail because the real Gmail dependency is not isolated.

Do not describe this baseline as green. Any future change must state whether it reduces, preserves, or increases these failures, and must distinguish pre-existing failures from new regressions.

<!-- context7 -->
Use Context7 MCP to fetch current documentation whenever the user asks about a library, framework, SDK, API, CLI tool, or cloud service — even well-known ones like React, Next.js, Prisma, Express, Tailwind, Django, or Spring Boot. This includes API syntax, configuration, version migration, library-specific debugging, setup instructions, and CLI tool usage. Use even when you think you know the answer — your training data may not reflect recent changes. Prefer this over web search for library docs.

Do not use for: refactoring, writing scripts from scratch, debugging business logic, code review, or general programming concepts.

## Steps

1. Always start with `resolve-library-id` using the library name and what to look up in the library's documentation, unless the user provides an exact library ID in `/org/project` format
2. Pick the best match (ID format: `/org/project`) by: exact name match, description relevance, code snippet count, source reputation (High/Medium preferred), and benchmark score (higher is better). If results don't look right, try alternate names or queries (e.g., "next.js" not "nextjs", or rephrase the question). Use version-specific IDs when the user mentions a version
3. `query-docs` with the selected library ID and what to look up in the library's documentation (not single words), scoped to a single concept. If the question spans multiple distinct concepts (e.g. routing and auth and caching), make a separate `query-docs` call per concept with the same library ID, unless the question is about how the concepts interact — combined queries dilute ranking and return shallow results for each topic
4. Answer using the fetched docs
<!-- context7 -->
