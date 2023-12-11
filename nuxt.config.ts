import {defineNuxtConfig} from "nuxt/config";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: true,
    modules: [
        "@nuxtjs/tailwindcss",
        '@pinia/nuxt',
    ],
    runtimeConfig: {
        public: {
            backendUrl: "http://localhost:8000",
            frontendUrl: "http://localhost:3000",
            appName: process.env.NUXT_PUBLIC_APP_NAME ?? "NUXT"
        },
    },
    imports: {
        dirs: ["./utils", "./stores"],
    },
    experimental: {
        asyncContext: true,
    },
    tailwindcss: {
        viewer: false,
    },
    devtools: {
        enabled: true
    },
});
