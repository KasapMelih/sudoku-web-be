import express, { Express, Request, Response } from "express";
import "dotenv/config";
import { PORT } from "./config/settings";
import logger from "./middlewares/logger";

import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter } from "./modules/routes";

const app: Express = express();

const corsOptions = {
  origin: ["http://localhost:3001"],
  credentials: true,
};

// express body parser
app.use(express.json());
app.use(cors(corsOptions));

// logger middleware
app.use(logger);
app.use("/auth", authRouter);

app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
