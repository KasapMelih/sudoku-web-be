import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const secret = process.env.JWT_SECRET!;

export function signJwt(payload: object) {
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

export function verifyJwt<T>(token: string): T | null {
  try {
    return jwt.verify(token, secret) as T;
  } catch {
    return null;
  }
}

export function setAuthCookie(token: string) {
  cookies().set("token", token, { httpOnly: true, secure: true, path: "/" });
}
