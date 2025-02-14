import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  for (let i = 0; i < 10; i++) {
    res.write(`data: Hello, world! ${i}\n\n`);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  res.write("event: end\ndata: Stream ended\n\n");
  res.end();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
