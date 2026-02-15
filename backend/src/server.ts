import express, { type Request, type Response } from "express";
import cors from "cors";
import routes from "./routes";
import { getDatabase, closeDatabase } from "./db/database";

const app = express();
const PORT = parseInt(process.env.PORT || "4000");

app.use(cors());
app.use(express.json());

app.use((req, _, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.use("/", routes);

app.use((_, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err: Error, _: Request, res: Response) => {
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
  });
});

try {
  getDatabase();
} catch (error) {
  console.log("Db error");

  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  closeDatabase();
  process.exit(0);
});
