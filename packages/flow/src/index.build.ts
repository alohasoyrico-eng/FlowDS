/**
 * FLOW Design System — Build Entry Point
 * ────────────────────────────────────────
 * Same as index.ts but includes the CSS side-effect import.
 * Vite build extracts the CSS into dist/style.css.
 *
 * This file is ONLY used by vite.config.ts for production builds.
 * The docs app dev server uses index.ts (no CSS import) +
 * explicit CSS loading in styles-index.css.
 */
import "./flow.css";
export * from "./index";
