import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite"; // 引入 Vite 插件

export default defineConfig({
  plugins: [
    tailwindcss(), // 使用它
    // ...其他插件
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/static": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
