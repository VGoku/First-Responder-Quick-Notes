/**
 * Vite Configuration
 * ------------------
 * Provides build and dev settings for the React + TypeScript app.
 * Uses the official React plugin with fast refresh enabled.
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // Optional: Dev server settings
  // server: {
  //   port: 5173,
  //   open: true,
  // },

  // Optional: Path aliases (uncomment if you want cleaner imports)
  // resolve: {
  //   alias: {
  //     "@": "/src",
  //   },
  // },
});