// apps/server/src/routes/checkout.js
import express from 'express';
import QRCode from 'qrcode';
import { randomBytes } from 'crypto';
import bs58 from 'bs58';

export async function checkoutRoutes({ recipient, network }) {
  const router = express.Router();

  router.post('/checkout', async (req, res) => {
    try {
      // normalize amount: accept "0,5" and "0.5"
      const rawAmt = String((req.body?.amount ?? '')).replace(',', '.');
      const amount = parseFloat(rawAmt);
      if (!Number.isFinite(amount) || amount <= 0) {
        return res.status(400).json({ ok: false, error: 'Invalid amount' });
      }

      const asset = String(req.body?.asset || 'SOL').toUpperCase();

      // generate a base58 reference (NOT Buffer.toString('base58'))
      const reference = bs58.encode(randomBytes(16));

      // Build Solana Pay URL
      const url = new URL(`solana:${recipient}`);
      url.searchParams.set('label', 'EdgeKeys Access');
      url.searchParams.set('message', 'Pay to get access key');
      url.searchParams.append('reference', reference);
      if (network === 'devnet') url.searchParams.set('cluster', 'devnet');
      url.searchParams.set('amount', String(amount));

      // If you later support USDC SPL, add: url.searchParams.set('spl-token', MINT_ADDRESS)

      const qrSvg = await QRCode.toString(url.toString(), {
        type: 'svg',
        margin: 1,
        color: { dark: '#000000', light: '#00000000' }, // black on transparent
      });

      return res.json({ ok: true, reference, url: url.toString(), qrSvg });
    } catch (e) {
      console.error('checkout error:', e);
      return res.status(500).json({ ok: false, error: e.message });
    }
  });

  return router;
}
