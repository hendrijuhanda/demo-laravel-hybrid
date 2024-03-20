import vue from "@vitejs/plugin-vue";
import laravel from "laravel-vite-plugin";
import { fileURLToPath } from "node:url";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    vue({
      template: {
        transformAssetUrls: {
          includeAbsolute: false,
        },
      },
    }),

    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false,
        }),
      ],
    }),

    laravel({
      input: ["resources/css/app.css", "resources/js/app.js"],
      refresh: true,
    }),
  ],

  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./resources/vue", import.meta.url)),
      },
    ],
  },

  server: {
    host: "0.0.0.0",
    hmr: {
      host: "localhost",
    },
  },
});
