import { useEffect, useState } from 'react';

/** Executa `fn(signal)` quando `deps` mudam; cancela requisições obsoletas. */
export function useAsync(fn, deps, enabled = true) {
  const [state, setState] = useState({ data: null, loading: enabled, error: null });
  useEffect(() => {
    if (!enabled) { setState({ data: null, loading: false, error: null }); return; }
    const ctrl = new AbortController();
    setState((s) => ({ ...s, loading: true, error: null }));
    fn(ctrl.signal)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err) => { if (err.name !== 'AbortError') setState({ data: null, loading: false, error: err.message }); });
    return () => ctrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, enabled]);
  return state;
}
