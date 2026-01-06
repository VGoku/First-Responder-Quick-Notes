/**
 * index.ts
 * --------
 * Entry point for the Express backend.
 * Provides a simple health check route and JSON parsing middleware.
 */

import express from "express";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

// Middleware
app.use(express.json());

// Health check route
app.get("/", (_req, res) => {
  res.status(200).send("Backend is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});