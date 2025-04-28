import "dotenv/config";
import express from "express";
import authRouter from "./routes/auth";
import gameRouter from "./routes/games";
import scoreRouter from "./routes/scores";

const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/games", gameRouter);
app.use("/api/scores", scoreRouter);

// 404 fallback
app.use((req, res) => res.status(404).json({ message: "not found" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 API ready on http://localhost:${PORT}`));

export default app;
