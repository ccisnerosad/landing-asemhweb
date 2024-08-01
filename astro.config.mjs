import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [tailwind()],
  adapter: node({ mode: "standalone" }), // Asegúrate de agregar esta línea
  vite: {
    ssr: {
      noExternal: ["fs"], // Añade esto para evitar problemas con fs en el contexto SSR
    },
    build: {
      rollupOptions: {
        external: ["fs"], // Excluye fs del bundle
      },
    },
  },
});
