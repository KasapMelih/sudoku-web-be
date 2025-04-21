import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verify } from "@/lib/hash";
import { signJwt, setAuthCookie } from "@/lib/auth";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ error: parsed.error }, { status: 400 });

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await verify(password, user.password)))
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = signJwt({ sub: user.id });
  setAuthCookie(token);

  return NextResponse.json({ token });
}
