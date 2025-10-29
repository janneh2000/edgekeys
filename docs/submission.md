# Hackathon Submission — EdgeKeys

## One-liner
**EdgeKeys** turns a **DAWN Black Box** into a pay-per-use **edge AI** micro‑service: users scan a Solana Pay QR (SOL/USDC), get a short‑lived access key (JWT), and invoke a local AI endpoint — no cloud, no accounts.

## Problem
Running AI at the edge is powerful, but there’s no easy way to **meter and monetize** access without standing up accounts, billing, and cloud gateways.

## Solution
- **On‑chain checkout:** Solana Pay deep link with a reference tag.
- **Instant access:** backend verifies on-chain payment → issues a **JWT** with quota.
- **Local compute:** users call `/v1/infer` on the Black Box (or any host).
- **Optional flair:** mint a compressed NFT badge (**Blackbox 0G**) post‑payment.

## Why DAWN Black Box
DAWN champions **user‑owned, privacy‑preserving edge compute**. EdgeKeys aligns by making a Black Box a **self‑hosted paid API** — owners earn directly, users retain privacy.

## Architecture
- **Frontend:** lightweight HTML/JS
- **Backend:** Express (Node), Docker
- **Payments:** Solana Pay deep link (SOL or SPL USDC)
- **Access Control:** short‑lived JWT + quota counter
- **Extensible:** add USDC webhook verification (Helius/QuickNode), cNFT badge, local LLM (`llama.cpp`)

## How to Run (Devnet)
```bash
cd apps/server
cp .env.example .env
# edit .env (RPC_URL, RECIPIENT, JWT_SECRET; optional MINT_ADDRESS for USDC SPL)
docker build -t edgekeys-server .
docker run --rm -p 8787:8787 --env-file .env edgekeys-server
```
Open `http://localhost:8787/index.html`

## Demo Steps
1) Generate QR → choose SOL or USDC (SPL)  
2) Pay from Phantom/Solflare (Devnet)  
3) Check Status → should show `"paid": true`  
4) Issue JWT → shows `token` and `quota`  
5) Call `/v1/infer` → returns stub response + `remaining`

## Links
- GitHub: (fill with repo URL)
- Demo video: (add link)
- Screenshots: see `/docs/screenshots`
