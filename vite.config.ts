import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: {
    preset: "vercel",
    externals: {
      inline: true,
    },
  },

  ssr: {
    noExternal: [
      "tslib",
      "@supabase/supabase-js",
      "@supabase/auth-js",
      "@supabase/postgrest-js",
      "@supabase/realtime-js",
      "@supabase/functions-js",
      "@supabase/storage-js",
    ],
  },

  tanstackStart: {
    server: {
      entry: "server",
    },
  },
});