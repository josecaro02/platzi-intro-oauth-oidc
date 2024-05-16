// Load environment variables
import * as dotenv from "dotenv";
import jwt from 'jsonwebtoken'
import fs from 'node:fs'
dotenv.config();

const  ONE_MINUTE_IN_MILISECONDS = 60 * 1000;
const SECRET = process.env.SECRET
const PRIVATE_KEY_PATH = process.env.PRIVATE_KEY_PATH
const PUBLIC_KEY_PATH = process.env.PUBLIC_KEY_PATH

export const signToken = (user) => {
  const payload = {
    // TODO: add sub, name, and exp claims
    sub: user.id,
    name: user.fullname,
    exp: Date.now() + ONE_MINUTE_IN_MILISECONDS
  };

  if(PRIVATE_KEY_PATH){
    const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, 'utf8')
    return jwt.sign(payload, privateKey, {algorithm: 'RS256'})
  }
  // TODO: Return signed token
  return jwt.sign(payload, SECRET)
  
};

export const verifyToken = (token) => {
  if(PUBLIC_KEY_PATH){
    const publicKey = fs.readFileSync(PUBLIC_KEY_PATH, 'utf8')
    return jwt.verify(token, publicKey)
  }
  return jwt.verify(token, SECRET);
};

export const validateExpiration = (payload) => {
  if (Date.now() > payload.exp) {
    throw new Error("Token expired");
  }
};
