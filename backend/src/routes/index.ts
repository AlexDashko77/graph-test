import { Router } from "express";
import functionsRouter from "./functions";
import graphRouter from "./graph";
import sourceRouter from "./source";

const router = Router();

router.use("/api/functions", functionsRouter);
router.use("/api/graph", graphRouter);
router.use("/api/source", sourceRouter);

export default router;
