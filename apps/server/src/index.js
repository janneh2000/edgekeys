import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { createStore } from './lib/redis.js';
import { checkoutRoutes } from './routes/checkout.js';
import { statusRoutes } from './routes/status.js';
import { issueRoutes } from './routes/issue.js';
import { inferRoutes } from './routes/infer.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));
app.use(express.static('public'));

const RPC_URL = process.env.RPC_URL || 'https://api.devnet.solana.com';
const RECIPIENT = process.env.RECIPIENT;
const JWT_SECRET = process.env.JWT_SECRET || 'change-me';
const REDIS_URL = process.env.REDIS_URL || '';
const DEFAULT_QUOTA = parseInt(process.env.DEFAULT_QUOTA || '5', 10);
const NETWORK = process.env.NETWORK || 'devnet';

if(!RECIPIENT){
  console.error('RECIPIENT not set'); process.exit(1);
}

const store = createStore(REDIS_URL);

app.get('/', (_,res)=> res.send('EdgeKeys server is running. Visit /index.html for the demo UI.'));

app.use('/api', await checkoutRoutes({ recipient: RECIPIENT, network: NETWORK }));
app.use('/api', await statusRoutes({ rpcUrl: RPC_URL, recipient: RECIPIENT }));
app.use('/api', await issueRoutes({ jwtSecret: JWT_SECRET, store, defaultQuota: DEFAULT_QUOTA }));
app.use('/', await inferRoutes({ jwtSecret: JWT_SECRET, store }));

const port = process.env.PORT || 8787;
app.listen(port, ()=> console.log('EdgeKeys listening on :' + port));
