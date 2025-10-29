// apps/server/src/index.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { checkoutRoutes } from './routes/checkout.js';
import { statusRoutes } from './routes/status.js';
import { issueRoutes } from './routes/issue.js';
import { inferRoutes } from './routes/infer.js';
import { createStore } from './lib/store.js';



dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// 🧠 Environment variables
const PORT = process.env.PORT || 8787;
const RPC_URL = process.env.RPC_URL || 'https://api.devnet.solana.com';
const RECIPIENT = process.env.RECIPIENT; // your wallet pubkey
const JWT_SECRET = process.env.JWT_SECRET || 'edgekeys-secret';
const NETWORK = process.env.NETWORK || 'devnet';
const MINT_ADDRESS = process.env.MINT_ADDRESS || null; // optional for USDC SPL
const DEFAULT_QUOTA = parseInt(process.env.DEFAULT_QUOTA || '5', 10);

if (!RECIPIENT) {
  console.error('❌ Missing RECIPIENT in .env');
  process.exit(1);
}

// 🧩 Shared memory / session store
const store = createStore();


// 🧱 Routes
app.use(
  '/api',
  await checkoutRoutes({
    recipient: RECIPIENT,
    network: NETWORK,
    mintAddress: MINT_ADDRESS,
  })
);
app.use('/api', await statusRoutes({ rpcUrl: RPC_URL, network: NETWORK }));
app.use(
  '/api',
  await issueRoutes({ jwtSecret: JWT_SECRET, store, defaultQuota: DEFAULT_QUOTA })
);
app.use('/', await inferRoutes({ jwtSecret: JWT_SECRET, store }));

// ✅ Start server
app.listen(PORT, () => {
  console.log(`EdgeKeys listening on :${PORT}`);
});
