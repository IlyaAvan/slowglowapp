import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import obfuscator from "vite-plugin-javascript-obfuscator";

// Обфускация включается ТОЛЬКО для прод-сборки (vite build).
// В режиме разработки (vite dev) код остаётся читаемым.
// Настройки намеренно «лёгкие»: переименование имён + упаковка строк в
// base64-массив (рецепты, тексты и ссылки не видны в открытую), но без
// тяжёлых трансформаций, которые ломают React или замедляют приложение.
export default defineConfig({
  plugins: [
    react(),
    obfuscator({
      apply: "build",
      exclude: [/node_modules/],
      include: ["src/**/*.js", "src/**/*.jsx"],
      options: {
        compact: true,
        simplify: true,
        identifierNamesGenerator: "hexadecimal",
        renameGlobals: false,
        controlFlowFlattening: false,
        deadCodeInjection: false,
        debugProtection: false,
        selfDefending: false,
        numbersToExpressions: false,
        splitStrings: false,
        stringArray: true,
        stringArrayEncoding: ["base64"],
        stringArrayThreshold: 0.5,
        transformObjectKeys: false,
        unicodeEscapeSequence: false,
        disableConsoleOutput: false,
      },
    }),
  ],
});
