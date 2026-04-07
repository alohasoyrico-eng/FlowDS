/**
 * Vitest setup file
 * Imported before each test file. Adds @testing-library/jest-dom matchers
 * and configures global DOM utilities.
 *
 * Run after: npm install --save-dev @testing-library/jest-dom
 */
import "@testing-library/jest-dom";
import "vitest-axe/extend-expect";

// jsdom does not implement matchMedia — provide a stub so components
// that call useFlowBreakpoint() (via FlowThemeProvider) don't crash.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
