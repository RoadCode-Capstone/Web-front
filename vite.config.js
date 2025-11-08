import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig(() => {
  return {
    build: {
      outDir: "build",
    },
    plugins: [react(), tailwindcss(), svgr()],
    resolve: {
      alias: [
        { find: "@", replacement: path.resolve(__dirname, "src") },
        {
          find: "@assets",
          replacement: path.resolve(__dirname, "src/presentation/assets"),
        },
      ],
    },
  };
});
