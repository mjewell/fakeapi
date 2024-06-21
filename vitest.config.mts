import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ["/setup/vitest.ts"],
  },
  resolve: {
    alias: {
      "@": __dirname,
    },
  },
});
