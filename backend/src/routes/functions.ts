import { Router, Request, Response, NextFunction } from "express";
import {
  searchFunctions,
  getFunctionDetails,
} from "../services/functionService";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    const search = req.query.search as string | undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;

    const functions = searchFunctions(search, limit);

    res.json({
      count: functions.length,
      functions,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/details", (req: Request, res: Response, next: NextFunction) => {
  try {
    const { functionId } = req.body;

    if (!functionId) {
      return res.status(400).json({ error: "functionId required" });
    }

    const details = getFunctionDetails(functionId);

    if (!details) {
      return res.status(404).json({ error: "Function not found" });
    }

    res.json(details);
  } catch (error) {
    next(error);
  }
});

export default router;
