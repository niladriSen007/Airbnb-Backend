import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  // Base JavaScript configuration
  {
    files: ["**/*.{js,mjs,cjs}"],
    ...js.configs.recommended,
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "indent": ["error", 2],
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-use-before-define": "error",
      "no-mixed-spaces-and-tabs": "error",
      "no-multi-spaces": "error",
      "no-multi-str": "error",
      "no-lone-blocks": "error",
      "no-extra-semi": "error",
      "no-empty": "error",
      "no-empty-function": "error",
      "no-eval": "error",
      "no-implied-eval": "error"
    }
  },
  // TypeScript configuration
  ...tseslint.configs.recommended.map(config => ({
    ...config,
    files: ["**/*.{ts,mts,cts}"],
  })),
  // TypeScript-specific overrides
  {
    files: ["**/*.{ts,mts,cts}"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "indent": ["error", 2] // Use standard indent rule for TypeScript files
    }
  }
];
