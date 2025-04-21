import { Request, Response } from "express";
import { _signUp } from "../../services/auth/auth.service";
export const signUp = async (req: Request, res: Response) => {
  const params = req.body;
  try {
    const user = await _signUp(params);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};
