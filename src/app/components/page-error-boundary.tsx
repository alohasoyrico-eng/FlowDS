/**
 * FLOW — PageErrorBoundary
 *
 * Catches lazy-module load failures ("Failed to fetch dynamically imported
 * module") and React render errors in a contained recovery UI instead of
 * crashing the entire app.
 *
 * Architecture rationale
 * ──────────────────────
 * Vite code-splits every lazy-loaded page via dynamic import(). If any file
 * in that import chain has a parse/syntax error, Vite caches the failure and
 * throws a ChunkLoadError. Without an ErrorBoundary this kills the whole tree.
 *
 * Two boundaries are exported:
 *   • <PageErrorBoundary>   – wraps each lazy page in routes.tsx
 *   • <DemoErrorBoundary>   – wraps individual demo sections inside component-detail
 *
 * Recovery UX
 * ───────────
 * The boundary shows an informative message and a "Reload" button.
 * After the developer fixes the offending file, pressing Reload forces
 * Vite to re-fetch the module with a fresh timestamp, clearing the cache.
 *
 * @layer infrastructure (no FLOW tokens — intentionally uses only CSS vars
 *        already guaranteed to exist in flow.css)
 */

import React from "react";

// ─── Shared recovery UI ─────────────────────────────────────────────────────

interface ErrorState {
  hasError: boolean;
  message: string;
  isChunkError: boolean;
}

function isChunkLoadError(err: unknown): boolean {
  if (err instanceof Error) {
    return (
      err.name === "ChunkLoadError" ||
      err.message.includes("Failed to fetch dynamically imported module") ||
      err.message.includes("Loading chunk") ||
      err.message.includes("Importing a module script failed")
    );
  }
  return false;
}

// ─── Page-level boundary ────────────────────────────────────────────────────

interface PageErrorBoundaryProps {
  children: React.ReactNode;
}

/**
 * Wrap each lazy-loaded page route with this boundary so a single broken
 * module cannot crash the entire app.
 *
 * Usage (in routes.tsx lazyPage helper):
 * ```tsx
 * return (
 *   <PageErrorBoundary>
 *     <Suspense fallback={null}>
 *       <LazyComponent />
 *     </Suspense>
 *   </PageErrorBoundary>
 * );
 * ```
 */
export class PageErrorBoundary extends React.Component<PageErrorBoundaryProps, ErrorState> {
  constructor(props: PageErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, message: "", isChunkError: false };
  }

  static getDerivedStateFromError(err: unknown): ErrorState {
    const message = err instanceof Error ? err.message : String(err);
    return {
      hasError: true,
      message,
      isChunkError: isChunkLoadError(err),
    };
  }

  componentDidCatch(err: unknown, info: React.ErrorInfo) {
    // Surface to console for developer visibility
    console.error("[FLOW PageErrorBoundary] Page crashed:", err, info);
  }

  handleReload = () => {
    // Full reload clears Vite's module registry — necessary after fixing a
    // syntax error that Vite has cached as a chunk-load failure.
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, message: "", isChunkError: false });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    const { message, isChunkError } = this.state;

    return (
      <div className="flow-error-boundary flow-error-boundary--page">
        <div className="flow-error-boundary__card">
          {/* Icon */}
          <div className="flow-error-boundary__icon" aria-hidden="true">
            {isChunkError ? "⚡" : "⚠️"}
          </div>

          {/* Heading */}
          <p className="flow-error-boundary__heading">
            {isChunkError ? "Module failed to load" : "Page crashed"}
          </p>

          {/* Body */}
          <p className="flow-error-boundary__body">
            {isChunkError
              ? "A syntax error or import failure prevented this page from loading. Fix the source file, then reload to clear Vite's module cache."
              : "An unexpected error occurred while rendering this page."}
          </p>

          {/* Error detail (collapsible) */}
          <details className="flow-error-boundary__details">
            <summary>Technical details</summary>
            <code className="flow-error-boundary__code">{message}</code>
          </details>

          {/* Actions */}
          <div className="flow-error-boundary__actions">
            <button
              className="flow-error-boundary__btn flow-error-boundary__btn--primary"
              onClick={this.handleReload}
              type="button"
            >
              Reload page
            </button>
            <a className="flow-error-boundary__btn flow-error-boundary__btn--ghost" href="/">
              Go home
            </a>
          </div>
        </div>
      </div>
    );
  }
}

// ─── Demo-level boundary ─────────────────────────────────────────────────────

interface DemoErrorBoundaryProps {
  /** Label shown in the error card (e.g., "Overview", "Variants", "Developer") */
  section?: string;
  children: React.ReactNode;
}

/**
 * Wraps individual demo sections inside component-detail.tsx so that a single
 * broken demo cannot crash the whole documentation page.
 *
 * Usage:
 * ```tsx
 * <DemoErrorBoundary section="Overview">
 *   {demos.overview()}
 * </DemoErrorBoundary>
 * ```
 */
export class DemoErrorBoundary extends React.Component<DemoErrorBoundaryProps, ErrorState> {
  constructor(props: DemoErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, message: "", isChunkError: false };
  }

  static getDerivedStateFromError(err: unknown): ErrorState {
    const message = err instanceof Error ? err.message : String(err);
    return {
      hasError: true,
      message,
      isChunkError: isChunkLoadError(err),
    };
  }

  componentDidCatch(err: unknown, info: React.ErrorInfo) {
    console.error(
      `[FLOW DemoErrorBoundary] Demo section "${this.props.section ?? "unknown"}" crashed:`,
      err,
      info,
    );
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    const { section } = this.props;
    const { message } = this.state;

    return (
      <div className="flow-error-boundary flow-error-boundary--demo">
        <p className="flow-error-boundary__heading">
          {section ? `"${section}" section failed to render` : "Demo crashed"}
        </p>
        <p className="flow-error-boundary__body">
          A runtime error occurred in this demo. Other tabs remain functional.
        </p>
        <details className="flow-error-boundary__details">
          <summary>Technical details</summary>
          <code className="flow-error-boundary__code">{message}</code>
        </details>
        <button
          className="flow-error-boundary__btn flow-error-boundary__btn--ghost"
          onClick={() => this.setState({ hasError: false, message: "", isChunkError: false })}
          type="button"
        >
          Try again
        </button>
      </div>
    );
  }
}
