import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
