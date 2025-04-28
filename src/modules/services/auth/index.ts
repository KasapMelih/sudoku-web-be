// src/modules/controllers/auth/index.ts
import { Request, Response } from "express";
import { _signUp } from "../../services/auth/auth.service"; // 👌 export ismi uydu

export const signUp = async (req: Request, res: Response) => {
  try {
    const user = await _signUp(req.body); // body’de fullName, userName, email, password gönder
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ error: "Kayıt sırasında hata", detail: err });
  }
};
