# Solana Pay — Test Instructions (UI + curl)

## UI path (recommended)
1) Open `http://localhost:8787/index.html`
2) Asset = SOL (simplest). Amount ~ `0.01`
3) Generate QR → scan with Phantom/Solflare (Devnet) → approve
4) Click **Check Status**
5) Paste your **pubkey** → **Issue JWT**
6) **Call /v1/infer** with a prompt

## curl path (power users)
```bash
# Create checkout
curl -s -X POST http://localhost:8787/api/checkout   -H 'content-type: application/json' -d '{"asset":"SOL","amount":0.01}'

# Verify payment after paying from wallet (use the "reference" above)
curl -s "http://localhost:8787/api/status?reference=<REF>"

# Issue token
curl -s -X POST http://localhost:8787/api/issue   -H 'content-type: application/json'   -d '{"reference":"<REF>","userPubkey":"<YOUR_PUBKEY>"}'

# Infer (replace <TOKEN> with JWT from /api/issue)
curl -s -X POST http://localhost:8787/v1/infer   -H "authorization: Bearer <TOKEN>"   -H 'content-type: application/json'   -d '{"prompt":"Hello EdgeKeys"}'
```
