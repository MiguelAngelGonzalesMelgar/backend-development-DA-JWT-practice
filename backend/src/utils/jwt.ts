import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  

export const signToken = (
    payload: JwtPayload, 
    expiresIn: string | number = "1h"
): string => {
    const options: SignOptions = { 
        expiresIn: expiresIn as SignOptions["expiresIn"] };
    return jwt.sign(payload, JWT_SECRET, options);
}

export const verifyToken = <T>(token: string): T => {
    return jwt.verify(token, JWT_SECRET) as T;
}