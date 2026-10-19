---
description: Run monorepo verification without modifying files
---

Do not modify files and do not read `.env`.

Run the checks separately:

1. From `backend/`:

```text
npm run build
npx vitest run
```

2. From `frontend/`:

```text
npm run lint
npm run build
```

Report each result separately.

Compare the backend result with `docs/verification-baseline.md`.
Distinguish pre-existing failures from new regressions.
Do not report the repository as green if the backend still has failing tests.
