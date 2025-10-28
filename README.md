# EdgeKeys — Pay-to-Use AI at the Edge (DAWN Black Box demo)

**One-liner:** Users scan a Solana Pay QR, pay a tiny fee (SOL or SPL USDC), and receive a short-lived access key (JWT) to call a local AI API. Optional: a Blackbox 0G badge image is included for a future cNFT mint.

## Quick Start (Docker)

```bash
cd apps/server
cp .env.example .env
# edit .env (RPC_URL, RECIPIENT, JWT_SECRET; set MINT_ADDRESS if using SPL USDC)
docker build -t edgekeys-server .
docker run --rm -p 8787:8787 --env-file .env edgekeys-server
```

Open http://localhost:8787/index.html to use the demo UI.

### Endpoints
- `POST /api/checkout` body: `{ asset: "SOL"|"SPL", amount: number }` → `{ reference, url, qrSvg }`
- `GET  /api/status?reference=...` → `{ paid, signature? }`
- `POST /api/issue` `{ reference, userPubkey }` → `{ token, quota }`
- `POST /v1/infer` (Authorization: Bearer token) `{ prompt }` → `{ output }` (stub)

> SPL/USDC: This starter uses the Solana Pay `"spl-token"` param. Some wallets may not display SPL on devnet without a known mint—set `MINT_ADDRESS` in `.env`. For precise on-chain verification (mint, amount), integrate a webhook/indexer (Helius/QuickNode) and parse the transfer instructions; the included checker is a minimal reference-based demo.

