import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyJwt } from "@/lib/auth";
import { z } from "zod";

const bodySchema = z.object({
  game: z.enum(["SUDOKU", "MINESWEEPER", "TICTACTOE"]),
  score: z.number().int().positive(),
});

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const payload = token && verifyJwt<{ sub: number }>(token);
  if (!payload)
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const body = await req.json();
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ error: parsed.error }, { status: 400 });

  const { game, score } = parsed.data;

  await prisma.gameScore.create({
    data: { game, score, userId: payload.sub },
  });

  // bonus puan ekle
  await prisma.user.update({
    where: { id: payload.sub },
    data: { points: { increment: score } },
  });

  return NextResponse.json({ ok: true });
}
