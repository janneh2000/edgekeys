# EdgeKeys — 60–90s Demo Script

**Goal:** Show QR → pay → status → issue token → infer. Keep it crisp.

## 0) Setup (off-camera or at the start)
- Ensure the server is running: `docker run --rm -p 8787:8787 --env-file .env edgekeys-server`
- Open `http://localhost:8787/index.html`
- Your wallet (Phantom/Solflare) is on **Devnet** with a little devnet SOL

## 1) Intro (10s)
“Hi, this is EdgeKeys — a pay-to-use **edge AI** dApp designed for the **DAWN Black Box**. Users pay via Solana Pay and instantly get a short-lived access key to use an AI endpoint hosted locally.”

## 2) Generate QR (10s)
- On the page, choose **SOL**, set amount (e.g., `0.01`), click **Generate QR**.
- Briefly show the QR and the Solana link.

## 3) Pay from wallet (10–15s)
- On your phone, scan the QR with Phantom/Solflare (Devnet).
- Approve the transaction.

## 4) Verify payment (5–10s)
- Back on the page, click **Check Status** until it shows `"paid": true`.

## 5) Issue token & call AI (15–20s)
- Paste your **public key**, click **Issue JWT** (show the token + quota).
- Enter a prompt (e.g., “Hello from DAWN Black Box”) and click **Call /v1/infer**.
- Show the stub response and the **remaining** counter decreasing.

## 6) Close (10s)
“EdgeKeys makes **edge compute monetization** trivial — scan, pay, use. Next steps: SPL USDC webhook verification, compressed NFT ‘Blackbox 0G’ access badge, and a local LLM container for real inference.”
