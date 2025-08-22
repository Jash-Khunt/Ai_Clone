import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command, mode }) => {
  const base = mode === "production" ? "/frontend_v2/" : "/";

  return {
    plugins: [react()],
    base,
    server: {
      host: "localhost",
      port: 3000,
    },
    build: {
      outDir: "dist",
      assetsDir: "assets",
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            antd: ["antd"],
          },
        },
      },
    },
    preview: {
      port: 3000,
      open: true,
    },
    css: {
      modules: {
        localsConvention: "camelCase",
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  };
});
