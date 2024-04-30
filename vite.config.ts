import vue from "@vitejs/plugin-vue";
import laravel from "laravel-vite-plugin";
import { fileURLToPath } from "node:url";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());

  console.log(Number(env.VITE_HMR_PORT));

  return {
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
          replacement: fileURLToPath(
            new URL("./resources/vue", import.meta.url)
          ),
        },
      ],
    },

    server: {
      host: "0.0.0.0",
      port: Number(env.VITE_HMR_PORT),
      hmr: {
        host: "localhost",
      },
    },
  };
});
