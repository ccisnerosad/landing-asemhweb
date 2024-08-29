import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

//direcrorio /landing/

// https://astro.build/config
export default defineConfig({
  output: "static",
  base: "/landing/",
  integrations: [tailwind()],
});
