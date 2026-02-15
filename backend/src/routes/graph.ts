import { Router, Request, Response, NextFunction } from "express";
import { getNeighborhood, buildGraphData } from "../services/graphService";
import { getFunctionDetails } from "../services/functionService";

const router = Router();

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    const { functionId } = req.body;

    if (!functionId) {
      return res.status(400).json({ error: "functionId required" });
    }

    const centerFunc = getFunctionDetails(functionId);

    if (!centerFunc) {
      return res.status(404).json({ error: "Function not found" });
    }

    const neighbors = getNeighborhood(functionId);

    const graphData = buildGraphData(centerFunc, neighbors, functionId);

    res.json({ elements: graphData });
  } catch (error) {
    next(error);
  }
});

export default router;
