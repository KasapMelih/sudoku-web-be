import { Router } from "express";
import prisma from "../utils/prisma";

const router = Router();

// GET /api/games
router.get("/", async (_, res) => {
  const games = await prisma.game.findMany({
    select: { id: true, name: true, slug: true },
  });
  res.json(games);
});

export default router;
