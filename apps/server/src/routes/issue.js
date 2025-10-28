import { issueJWT } from '../lib/session.js';

export async function issueRoutes({ jwtSecret, store, defaultQuota }){
  const express = (await import('express')).default;
  const router = express.Router();

  router.post('/issue', async (req,res)=>{
    try{
      const { reference, userPubkey } = req.body || {};
      if(!reference || !userPubkey) return res.status(400).json({ ok:false, error:'missing reference or userPubkey' });
      const token = issueJWT(userPubkey, defaultQuota, jwtSecret);
      await store.set('quota:' + token, defaultQuota);
      res.json({ ok:true, token, quota: defaultQuota });
    }catch(e){
      console.error(e);
      res.status(500).json({ ok:false, error: e.message });
    }
  });

  return router;
}
