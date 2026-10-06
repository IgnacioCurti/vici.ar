# Verification Baseline

Snapshot date: 2026-10-04

This document describes the known state before introducing OpenCode preparation changes. It does not represent a fully green state.

## Frontend

Directory: `frontend/`

Commands executed:

```text
npm run lint
npm run build
```

Result:

- Lint: passed.
- Build: passed.
- Build: reports a JavaScript bundle larger than 500 kB.
- The warning does not prevent the build from succeeding.

## Backend

Directory: `backend/`

Commands executed:

```text
npm run build
npx vitest run
```

Result:

- TypeScript build: passed.
- Tests: 28 passed, 4 failed.
- The suite contains 32 tests in 5 files.

## Known Failures

### Login

File:

```text
backend/src/tests/unit/services/auth.service.spec.ts
```

Test:

```text
AuthService > login > should successfully login user with valid credentials
```

Failure:

```text
Email not verified
```

Causal context:

The user mock does not include a verified email state, while `AuthService.login()` rejects unverified users.

### Email

File:

```text
backend/src/tests/unit/services/email.service.spec.ts
```

Affected tests:

```text
EmailService > sendVerificationEmail > should send verification email with correct parameters (Arrange / Act / Assert)
EmailService > sendVerificationEmail > should construct verification URL with userId and code
EmailService > sendVerificationEmail > should handle email sending errors gracefully
```

Observed failure:

```text
No access, refresh token, API key or refresh handler callback is set.
```

Causal context:

The test mocks `nodemailer`, but `EmailService` uses `googleapis` and Gmail OAuth. Therefore, the mock does not intercept the actual dependency.

The test must not be considered a real Gmail access test. A future fix must isolate the external dependency.

## Current Warnings

Vitest reports warnings related to `backend/tsconfig.json`:

- `target` appears outside and inside `compilerOptions`.
- `strict` appears outside and inside `compilerOptions`.
- The test transformer warns about the `es2024` target.

These warnings did not prevent the build and do not explain the four failures above by themselves.

## Rule for Comparing Future Changes

A change must not be presented as fully verified while these four tests are still failing.

Each future change must state:

- whether it reduces, maintains, or increases the number of failures;
- which new or modified tests cover the behavior;
- which checks were executed;
- whether it involved an external integration or mocks only.
