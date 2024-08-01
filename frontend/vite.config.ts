import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
            @import './src/styles/_settings/_vars.scss';
            @import './src/styles/_settings/_mixins.scss';
            `,
      },
    },
  },
  root: ".",
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src/"),
      assets: path.resolve(__dirname, "src/assets"),
      atoms: path.resolve(__dirname, "src/components/atoms"),
      molecules: path.resolve(__dirname, "src/components/molecules"),
      organisms: path.resolve(__dirname, "src/components/organisms"),
      pages: path.resolve(__dirname, "src/components/pages"),
      utils: path.resolve(__dirname, "src/utils"),
      store: path.resolve(__dirname, "src/store"),
      styles: path.resolve(__dirname, "src/styles/_settings"),
      fonts: path.resolve(__dirname, "src/assets/fonts"),
    },
  },
});
