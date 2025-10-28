import jwt from 'jsonwebtoken';
export function issueJWT(pubkey, quota, secret){
  return jwt.sign({ sub: pubkey, quota }, secret, { expiresIn: '2h', issuer: 'edgekeys' });
}
export function verifyJWT(token, secret){
  return jwt.verify(token, secret);
}
