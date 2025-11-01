import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite"; // 引入 Vite 插件
import { FileCache } from "@masx200/vite-plugin-virtual-http-resolve";
import remoteToLocal from "@masx200/vite-plugin-virtual-http-resolve";
import { fetch } from "undici";
export default defineConfig({
  plugins: [
    remoteToLocal({
      cache: new FileCache(),
      async fetcher(url: string) {
        const res = await fetch(url, {
          headers: {
            Accept: "application/javascript",

            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
          },
        });

        if (res.ok) return await res.text();

        throw Error("failed to fetch:" + url);
      },
    }),
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

  resolve: {
    alias: {},
  },
});
