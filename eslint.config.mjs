import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"] }, // NodeNext destekli dosyalar eklendi
  { files: ["**/*.{js,cjs,cts}"], languageOptions: { sourceType: "commonjs" } }, // CommonJS dosyaları
  { files: ["**/*.{mjs,mts}"], languageOptions: { sourceType: "module" } }, // ESM dosyaları
  { languageOptions: { globals: globals.node } }, // Node.js global değişkenleri
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module", // Varsayılanı ESM olarak ayarla
        project: "./tsconfig.json", // TypeScript için proje yapılandırmasını belirt
      },
    },
  },
];
