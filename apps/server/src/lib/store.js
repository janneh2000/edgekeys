// apps/server/src/lib/store.js
// Minimal in-memory store used by /status, /issue, /v1/infer routes.
// Exports BOTH a named and default createStore to avoid import mismatches.

export function createStore() {
  // paidByRef: reference -> { paid: boolean, signature?: string }
  const paidByRef = new Map();

  // tokenData: jwtToken -> { remaining: number, userPubkey: string, createdAt: number }
  const tokenData = new Map();

  return {
    // --- Payment status by reference ---
    setPaid(reference, signature) {
      paidByRef.set(reference, { paid: true, signature });
    },
    getPaid(reference) {
      return paidByRef.get(reference) || { paid: false };
    },

    // --- Token quota management ---
    setToken(token, { remaining, userPubkey }) {
      tokenData.set(token, {
        remaining: Number.isFinite(remaining) ? remaining : 5,
        userPubkey: userPubkey || null,
        createdAt: Date.now(),
      });
    },
    getToken(token) {
      return tokenData.get(token) || null;
    },
    decrement(token) {
      const info = tokenData.get(token);
      if (!info) return null;
      if (info.remaining > 0) info.remaining -= 1;
      tokenData.set(token, info);
      return info;
    },

    // --- Utilities (optional) ---
    reset() {
      paidByRef.clear();
      tokenData.clear();
    },
  };
}

// Also provide a default export so either style works.
export default createStore;
