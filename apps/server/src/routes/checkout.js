import express from 'express';
import QRCode from 'qrcode';
import { randomBytes } from 'crypto';

export async function checkoutRoutes() {
  const router = express.Router();

  router.post('/checkout', async (req, res) => {
    try {
      const { asset, amount } = req.body || {};
      if (!amount || amount <= 0) {
        return res.status(400).json({ ok: false, error: 'Invalid amount' });
      }

      // normalize asset
      const chosenAsset = asset === 'USDC' ? 'USDC' : 'SOL';
      const reference = randomBytes(16).toString('base58');
      const label = encodeURIComponent('EdgeKeys Access');
      const message = encodeURIComponent('Pay to get access key');

      const url = new URL(`solana:Gex8AA2MPfSpEQxmEqvpC7nwB8Qixws1LfvuBwfcTsvN`);
      url.searchParams.append('label', label);
      url.searchParams.append('message', message);
      url.searchParams.append('reference', reference);
      url.searchParams.append('cluster', 'devnet');
      url.searchParams.append('amount', amount);

      const qrSvg = await QRCode.toString(url.toString(), {
        type: 'svg',
        margin: 1,
        color: { dark: '#000000', light: '#00000000' } // black on transparent
      });

      return res.json({
        ok: true,
        reference,
        url: url.toString(),
        qrSvg
      });
    } catch (e) {
      console.error('checkout error:', e);
      return res.status(500).json({ ok: false, error: e.message });
    }
  });

  return router;
}
