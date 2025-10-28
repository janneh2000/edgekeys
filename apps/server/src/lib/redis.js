import Redis from 'ioredis';
import { MemoryStore } from './store.js';
export function createStore(url){
  if(!url) return new MemoryStore();
  const client = new Redis(url);
  return {
    async get(k){ return client.get(k); },
    async set(k,v){ return client.set(k,v); },
    async decr(k){ return client.decr(k); },
    async del(k){ return client.del(k); }
  };
}
