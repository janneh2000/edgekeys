import { verifyJWT } from '../lib/session.js';

export async function inferRoutes({ jwtSecret, store }){
  const express = (await import('express')).default;
  const router = express.Router();

  router.post('/v1/infer', async (req,res)=>{
    try{
      const auth = req.headers.authorization || '';
      const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth;
      const payload = verifyJWT(token, jwtSecret);

      const k = 'quota:' + token;
      let q = await store.get(k);
      q = q ? parseInt(q, 10) : 0;
      if(q <= 0) return res.status(402).json({ ok:false, error: 'Quota exhausted' });

      await store.decr(k);

      const prompt = (req.body && req.body.prompt) ? String(req.body.prompt) : 'Hello';
      const output = `EdgeKeys (stub) response to: ${prompt.slice(0, 160)}`;
      return res.json({ ok:true, output, remaining: q - 1 });
    }catch(e){
      console.error(e);
      return res.status(401).json({ ok:false, error: e.message });
    }
  });

  return router;
}
