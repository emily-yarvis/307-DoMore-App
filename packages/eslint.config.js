import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  // Ignore dist directory
  { ignores: ["dist"] },

  // Node.js environment for specific configuration files
  {
    files: ["**/tailwind.config.js"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node, // Include Node.js globals like `module` and `require`
      },
      parserOptions: {
        sourceType: "script", // Use script mode for Node.js files
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },

  // Configuration for JS/JSX files (browser environment)
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
