import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: {
    preset: "vercel",
    externals: {
      inline: [
        "tslib",
        "@supabase/supabase-js",
        "@supabase/auth-js",
        "@supabase/postgrest-js",
        "@supabase/realtime-js",
        "@supabase/functions-js",
        "@supabase/storage-js",
      ],
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
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
