 EdgeKeys — Pay-to-Use AI at the Edge (DAWN Black Box demo)

One-liner: Users scan a Solana Pay QR, pay a tiny fee (SOL or SPL USDC), and receive a short-lived access key (JWT) to call a local AI API. Optional: a Blackbox 0G badge image is included for a future cNFT mint.

 Quick Start (Docker)

```bash
cd apps/server
cp .env.example .env
# edit .env (RPC_URL, RECIPIENT, JWT_SECRET; set MINT_ADDRESS if using SPL USDC)
docker build -t edgekeys-server .
docker run --rm -p 8787:8787 --env-file .env edgekeys-server
```

Open http://localhost:8787/index.html to use the demo UI. Or whatever port you assigh.

Endpoints
- `POST /api/checkout` body: `{ asset: "SOL"|"SPL", amount: number }` → `{ reference, url, qrSvg }`
- `GET  /api/status?reference=...` → `{ paid, signature? }`
- `POST /api/issue` `{ reference, userPubkey }` → `{ token, quota }`
- `POST /v1/infer` (Authorization: Bearer token) `{ prompt }` → `{ output }` (stub)

> SPL/USDC: This starter uses the Solana Pay `"spl-token"` param. Some wallets may not display SPL on devnet without a known mint—set `MINT_ADDRESS` in `.env`. For precise on-chain verification (mint, amount), integrate a webhook/indexer (Helius/QuickNode) and parse the transfer instructions; the included checker is a minimal reference-based demo.
> 
  - ![QR Checkout](./docs/screenshots/Screenshot%202025-10-28%20at%2023.42.11.png)
  - ![Payment Flow](./docs/screenshots/Screenshot%202025-10-28%20at%2023.42.31.png)


 How It Works

1. Generate QR: User chooses SOL or USDC and clicks *Generate QR.  
2. Pay via Solana Pay: Phantom or Solflare opens and sends the payment.  
3. Verify: `/api/status` checks the blockchain for the reference tag.  
4. Access Granted: `/api/issue` issues a short-lived JWT with quota.  
5. Edge AI Use: `/v1/infer` accepts authorized requests (stub → LLM-ready).  

This enables pay-per-use AI at the edge, directly compatible with the DAWN Black Box.


  

Repo: [https://github.com/janneh2000/edgekeys](https://github.com/janneh2000/edgekeys)  
Tech Stack: Node.js, Express, Solana Pay, JWT, Docker  
Future Roadmap: cNFT badge mint, on-chain webhook verification (Helius), local LLM (llama.cpp) container  
Built by: Alie  Janneh (X:@cjanneh2000, github:janneh2000)

  Live Demo
- Render: https://edgekeys.onrender.com/index.html

[![Open Demo](https://img.shields.io/badge/Demo-EdgeKeys-informational)](https://edgekeys.onrender.com/index.html)


## 🎥 Demo
- <>

