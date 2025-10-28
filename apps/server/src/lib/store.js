export class MemoryStore {
  constructor(){ this.map = new Map(); }
  async get(k){ return this.map.get(k); }
  async set(k,v){ this.map.set(k,v); }
  async decr(k){ const v=(this.map.get(k)??0)-1; this.map.set(k,v); return v; }
  async del(k){ this.map.delete(k); }
}
