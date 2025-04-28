import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: number;
}

export default function verifyToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const bearer = req.headers.authorization;
  if (!bearer?.startsWith("Bearer ")) return res.sendStatus(401);

  const token = bearer.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
    };
    req.userId = payload.id;
    next();
  } catch {
    res.sendStatus(403);
  }
}
