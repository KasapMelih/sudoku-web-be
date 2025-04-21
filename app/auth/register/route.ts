import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { hash } from "@/lib/hash";

const bodySchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2),
  userName: z.string().min(3),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = bodySchema.safeParse(body);

  if (!parsed.success)
    return NextResponse.json({ error: parsed.error }, { status: 400 });

  const { email, fullName, userName, password } = parsed.data;

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists)
    return NextResponse.json({ error: "User already exists" }, { status: 409 });

  const user = await prisma.user.create({
    data: { email, fullName, userName, password: await hash(password) },
  });

  return NextResponse.json({ id: user.id, email: user.email }, { status: 201 });
}
