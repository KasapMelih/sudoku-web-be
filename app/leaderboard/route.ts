import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const top = await prisma.user.findMany({
    orderBy: { points: "desc" },
    take: 50,
    select: { id: true, userName: true, points: true },
  });
  return NextResponse.json(top);
}
