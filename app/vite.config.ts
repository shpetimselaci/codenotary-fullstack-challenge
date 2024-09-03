import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsConfigPaths(), react(), TanStackRouterVite()],
});
