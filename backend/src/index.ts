import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", async (req: Request, res: Response) => {
  // testing fake authentication
  const username = req.headers.cookie?.split("=")[1];
  if (username !== "Joey") {
    res.status(401).send("Unauthorized");
    return;
  }
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();
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
