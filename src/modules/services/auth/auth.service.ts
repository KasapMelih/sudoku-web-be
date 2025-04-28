// src/modules/services/auth/auth.service.ts
import { prisma } from "../../../db/connection";
import bcrypt from "bcrypt";

export async function _signUp(params: any) {
  const { fullName, userName, email, password, role = "player" } = params; // 👉 alan adları net

  const hash = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        fullName, // ✔ Prisma modelinde zorunlu
        userName, // ✔ unique
        email,
        password,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
