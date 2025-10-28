import { PublicKey, Keypair } from '@solana/web3.js';
import QRCode from 'qrcode';

export async function checkoutRoutes({ recipient, network }){
  const express = (await import('express')).default;
  const router = express.Router();

  router.post('/checkout', async (req,res)=>{
    try{
      const { asset = 'SOL', amount = 0.01 } = req.body || {};
      const ref = Keypair.generate().publicKey.toBase58();
      const recipientPk = new PublicKey(recipient);

      const url = new URL('solana:' + recipientPk.toBase58());
      url.searchParams.set('label', 'EdgeKeys Access');
      url.searchParams.set('message', 'Pay to get access key');
      url.searchParams.append('reference', ref);
      if(network==='devnet') url.searchParams.set('cluster', 'devnet');

      if(amount && Number(amount) > 0){
        url.searchParams.set('amount', String(amount));
      }

      if(String(asset).toUpperCase() === 'SPL'){
        const mint = process.env.MINT_ADDRESS || '';
        if(!mint){
          return res.status(400).json({ ok:false, error: 'MINT_ADDRESS not set in server .env for SPL payments' });
        }
        url.searchParams.set('spl-token', mint);
      }

      const qrSvg = await QRCode.toString(url.toString(), { type: 'svg', margin: 1 });
      res.json({ ok:true, reference: ref, url: url.toString(), qrSvg });
    }catch(e){
      console.error(e);
      res.status(500).json({ ok:false, error: e.message });
    }
  });

  return router;
}
