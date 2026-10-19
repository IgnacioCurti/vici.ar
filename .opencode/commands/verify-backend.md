---
description: Verify backend build and tests without modifying files
---

Work from the `backend/` directory.

Run:

```text
npm run build
npx vitest run
```

Do not modify files.

Report:

- build result;
- total tests executed;
- passed tests;
- failed tests;
- relevant error messages;
- comparison with `docs/verification-baseline.md`.

Do not read or display `.env` files or secret values.
Do not report the suite as green if failures exist.
