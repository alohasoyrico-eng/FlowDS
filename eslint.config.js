import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  // ── Global ignores ──────────────────────────────────────────────────────────
  { ignores: ["**/dist/**", "node_modules/**", "stats.html"] },
  // ── Base: eslint recommended + typescript-eslint recommended ────────────────
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // ── React & JSX-a11y ────────────────────────────────────────────────────────
  {
    ...react.configs.flat.recommended,
    settings: { react: { version: "detect" } },
  },
  react.configs.flat["jsx-runtime"],
  jsxA11y.flatConfigs.recommended,
  // ── React Hooks ─────────────────────────────────────────────────────────────
  {
    plugins: { "react-hooks": reactHooks },
    rules: reactHooks.configs.recommended.rules,
  },
  // ── Prettier (disable formatting rules that conflict) ───────────────────────
  prettier,
  // ── Project rules ───────────────────────────────────────────────────────────
  {
    files: ["src/**/*.{ts,tsx}", "packages/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "sort-imports": [
        "warn",
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          allowSeparatedGroups: true,
        },
      ],

      // ─── A11y & React rules ────────────────────────────────────────────────
      "jsx-a11y/aria-role": ["error", { ignoreNonDOM: true }],
      "react/no-unescaped-entities": "error",
      "jsx-a11y/click-events-have-key-events": "error",
      "jsx-a11y/no-static-element-interactions": "error",
      "react/jsx-no-comment-textnodes": "error",
      "no-useless-escape": "error",

      // ─── Pre-existing a11y issues ───────────────────────────────────────────
      "jsx-a11y/interactive-supports-focus": "error",
      "jsx-a11y/no-noninteractive-element-interactions": ["error", { handlers: ["onClick", "onMouseDown", "onMouseUp"], allowedRoles: ["search", "group", "dialog"] }],
      "jsx-a11y/no-noninteractive-tabindex": "error",
      "jsx-a11y/no-autofocus": ["error", { "ignoreNonDOM": true }],
      "jsx-a11y/no-redundant-roles": "error",
      "jsx-a11y/role-supports-aria-props": "error",

      // ─── React Hooks ────────────────────────────────────────────────────────
      "react-hooks/rules-of-hooks": "error",

      // ─── React compiler rules (new in react-hooks v7) ──────────────────────
      "react-hooks/set-state-in-effect": "error",
      "react-hooks/preserve-manual-memoization": "error",
      "react-hooks/purity": "error",
      "react-hooks/refs": "error",
      "react-hooks/static-components": "error",

      // ─── TypeScript ────────────────────────────────────────────────────────
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-expressions": "error",

      // PropTypes not needed with TypeScript
      "react/prop-types": "off",

      // Allow img alt text that contains the word 'image'
      "jsx-a11y/img-redundant-alt": "error",
    },
  },
  // ─── .tsx overrides ─────────────────────────────────────────────────────────
  {
    files: ["src/**/*.tsx", "packages/**/*.tsx"],
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },
);
