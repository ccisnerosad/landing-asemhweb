import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";

//direcrorio /landing/

// https://astro.build/config
export default defineConfig({
  output: "static",
  base: "/landing/",
  integrations: [tailwind()],
});
