import { defineConfig } from "vite";
//@ts-ignore
import tailwindcss from "@tailwindcss/vite"; // 引入 Vite 插件
import { FileCache } from "@masx200/vite-plugin-virtual-http-resolve";
import remoteToLocal from "@masx200/vite-plugin-virtual-http-resolve";
import { fetch } from "undici";
import { resolve } from "path";
import { readdirSync, statSync } from "fs";
import htmlMinifier from "rollup-plugin-html-minifier";
// 动态获取当前目录下所有HTML文件
function getHtmlFiles() {
  const currentDir = __dirname;
  const files = readdirSync(currentDir);
  const htmlFiles: Record<string, string> = {};

  files.forEach((file) => {
    const filePath = resolve(currentDir, file);
    const stats = statSync(filePath);

    // 检查是否是HTML文件
    if (stats.isFile() && file.endsWith(".html")) {
      // 使用文件名（不带.html后缀）作为entry名称
      const entryName = file.replace(".html", "");
      htmlFiles[entryName] = filePath;
    }
  });

  return htmlFiles;
}

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
    tailwindcss(),
  ],

  // 多入口页面配置
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      plugins: [
        htmlMinifier({
          options: {
            collapseWhitespace: true,
            removeComments: true,
            removeAttributeQuotes: true,
          },
        }),
      ],
      input: getHtmlFiles(),
      output: {
        // 生成的文件名格式
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
  },

  // 开发服务器配置
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
    // 开发时默认打开的页面
    open: "/index.html",
  },

  // 预览服务器配置
  preview: {
    port: 4173,
    open: "/index.html",
  },

  resolve: {
    alias: {
      "chart.js/auto": "virtual:https://esm.sh/chart.js/auto/auto.js",
      "prismjs/prism":
        "virtual:https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js",
      "prismjs/components/prism-bash":
        "virtual:https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-bash.min.js",
    },
  },
});
