import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    build: {
        manifest: true,
        rtl: true,
        outDir: "public/build",
        cssCodeSplit: true,
        rollupOptions: {
            output: {
                assetFileNames: (css) => {
                    if (css.name.split(".").pop() == "css") {
                        return "css/" + `[name]` + ".css";
                    } else {
                        return "icons/" + css.name;
                    }
                },
                entryFileNames: "js/" + `[name]` + `.js`,
            },
        },
    },
    plugins: [
        laravel({
            input: [
                "resources/css/app.css",
                "resources/js/app.js",
                "resources/js/main.jsx", // React entry
            ],
            refresh: true,
        }),
        react(),
    ],
});
