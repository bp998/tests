import { Router } from "express";

import authRouter from "./authRouter.js";
import listRouter from "./listRouter.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/list", listRouter);

export default router;
