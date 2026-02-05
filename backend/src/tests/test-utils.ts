// Simple Express response mock used across controller tests.
// Kept minimal and deterministic (no test framework hooks here) so tests can assert on
// status and payload without depending on Express internals.
export function makeResponse() {
  const res: any = {};
  res._status = 200;
  res._json = null;
  res.status = (code: number) => { res._status = code; return res; };
  res.json = (payload: any) => { res._json = payload; return res; };
  return res as import('express').Response & { _status: number; _json: any };
}
