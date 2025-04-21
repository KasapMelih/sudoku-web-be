import Router from "express";
import { signUp } from "../controllers/auth";

const router = Router();

router.post("/signup", signUp);

export { router as authRouter };
