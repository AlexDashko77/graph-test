import { Router, Request, Response, NextFunction } from "express";
import { getSourceByPath } from "../services/sourceService";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    const filePath = req.query.file as string;

    if (!filePath) {
      return res.status(400).json({ error: "file parameter required" });
    }

    const source = getSourceByPath(filePath);

    if (!source) {
      return res.status(404).json({ error: "Source file not found" });
    }

    res.json(source);
  } catch (error) {
    next(error);
  }
});

export default router;
