import {defineNuxtConfig} from "nuxt/config";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: true,
    modules: ["@nuxtjs/tailwindcss"],
    runtimeConfig: {
        public: {
            backendUrl: "http://localhost:8000",
            frontendUrl: "http://localhost:3000",
        },
    },
    imports: {
        dirs: ["./utils"],
    },
    experimental: {
        asyncContext: true,
    },
    tailwindcss: {
        viewer: false,
    },
    devtools: {
        enabled: true
    }
});
