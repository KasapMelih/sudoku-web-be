import { Router } from "express";
import verifyToken, { AuthRequest } from "../middleware/verifyToken";
import prisma from "../utils/prisma";

const router = Router();

// POST /api/scores  { gameSlug, value }
router.post("/", verifyToken, async (req: AuthRequest, res) => {
  const { gameSlug, value } = req.body;
  const game = await prisma.game.findUnique({ where: { slug: gameSlug } });
  if (!game) return res.status(404).json({ error: "Game yok" });

  await prisma.score.create({
    data: { value, userId: req.userId!, gameId: game.id },
  });

  // puanı User tablosunda topla
  await prisma.user.update({
    where: { id: req.userId },
    data: { points: { increment: value } },
  });

  res.sendStatus(201);
});

// GET /api/scores/leaderboard?game=tictactoe&limit=20
router.get("/leaderboard", async (req, res) => {
  const { game, limit = 10 } = req.query;
  const where = game ? { game: { slug: game as string } } : {};
  const leaders = await prisma.score.findMany({
    where,
    select: {
      value: true,
      user: { select: { userName: true, fullName: true } },
      game: { select: { slug: true } },
    },
    orderBy: { value: "desc" },
    take: Number(limit),
  });
  res.json(leaders);
});

export default router;
