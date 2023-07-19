/* eslint-env node */

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ["unused-imports", "@typescript-eslint", "react-hooks"],
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
    "no-var": "error",
    "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": "error",
    "@typescript-eslint/no-unused-vars": "off",
    "react-hooks/exhaustive-deps": "off",
  },
  ignorePatterns: ["*.config.js", "*.config.ts", "*.cjs"],
};
