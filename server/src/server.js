import "dotenv/config";
import cors from "cors";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { connectDatabase } from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
const port = process.env.PORT || 5000;
const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFile);
const clientBuildPath = path.resolve(currentDirectory, "../../client/dist");

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173"
  })
);
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.status(200).json({ message: "Kitchen Prep Planner API is running" });
});

app.use("/api/tasks", taskRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(clientBuildPath));

  app.get("/{*splat}", (_request, response) => {
    response.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

app.use((error, _request, response, _next) => {
  console.error(error);

  if (error.name === "ValidationError") {
    const message = Object.values(error.errors)
      .map((item) => item.message)
      .join(", ");
    return response.status(400).json({ message });
  }

  response.status(500).json({ message: "Something went wrong on the server" });
});

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Could not start server:", error.message);
    process.exit(1);
  });

