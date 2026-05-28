import js from "@eslint/js";

export default [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "build/**", "**/*.ts", "**/*.tsx"],
  },
  js.configs.recommended,
];
