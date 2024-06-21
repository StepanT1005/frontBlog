import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __APP_ENV__: process.env.VITE_VERCEL_ENV,
  },
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
});
