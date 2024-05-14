// Load environment variables
import * as dotenv from "dotenv";
import jwt from 'jsonwebtoken'
dotenv.config();

const  ONE_MINUTE_IN_MILISECONDS = 60 * 1000;
const SECRET = process.env.SECRET

export const signToken = (user) => {
  const payload = {
    // TODO: add sub, name, and exp claims
    sub: user.id,
    name: user.fullname,
    exp: Date.now() + ONE_MINUTE_IN_MILISECONDS
  };

  // TODO: Return signed token
  return jwt.sign(payload, SECRET)
  
};

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};

export const validateExpiration = (payload) => {
  if (Date.now() > payload.exp) {
    throw new Error("Token expired");
  }
};
