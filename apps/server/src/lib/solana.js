import { Connection, PublicKey } from '@solana/web3.js';

/**
 * Minimal reference-based payment finder.
 * NOTE: For SPL (USDC) verification of amount/mint, prefer a webhook/indexer.
 */
export async function findPayment({ rpcUrl, reference, recipient }){
  const conn = new Connection(rpcUrl, 'confirmed');
  const refKey = new PublicKey(reference);
  const sigs = await conn.getSignaturesForAddress(refKey, { limit: 30 });
  for(const s of sigs){
    const tx = await conn.getTransaction(s.signature, { maxSupportedTransactionVersion: 0 });
    if(!tx) continue;
    const accs = tx.transaction.message.staticAccountKeys.map(k=>k.toBase58());
    if(accs.includes(recipient)){
      return { paid: true, signature: s.signature };
    }
  }
  return { paid: false };
}
