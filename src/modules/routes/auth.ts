import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma";

const router = Router();

// POST /api/auth/register
router.post("/signup", async (req, res) => {
  const { fullName, userName, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { fullName, userName, email, password: hash },
    });
    res.status(201).json({ id: user.id });
  } catch (e) {
    res.status(400).json({ error: "Kullanıcı zaten var mı? Kontrol et." });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: "Geçersiz bilgiler" });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
  res.json({
    token,
    user: { id: user.id, fullName: user.fullName, points: user.points },
  });
});

export default router;
