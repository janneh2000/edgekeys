import { findPayment } from '../lib/solana.js';

export async function statusRoutes({ rpcUrl, recipient }){
  const express = (await import('express')).default;
  const router = express.Router();

  router.get('/status', async (req,res)=>{
    try{
      const reference = req.query.reference;
      if(!reference) return res.status(400).json({ ok:false, error:'missing reference' });
      const result = await findPayment({ rpcUrl, reference, recipient });
      res.json({ ok:true, ...result, network: process.env.NETWORK || 'devnet', mint: process.env.MINT_ADDRESS || null });
    }catch(e){
      console.error(e);
      res.status(500).json({ ok:false, error: e.message });
    }
  });

  return router;
}
