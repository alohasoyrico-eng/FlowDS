import { createBrowserRouter, Navigate } from "react-router";
import { type ComponentType } from "react";

import { DocLayout } from "./components/doc-layout";
import { PageErrorBoundary } from "./components/page-error-boundary";

// ── Helper: build a route-level `lazy` that returns { Component } ──
// React Router's route `lazy` uses startTransition internally,
// avoiding the "suspended while responding to synchronous input" error.
function routeLazy(load: () => Promise<Record<string, unknown>>, exportName?: string) {
  return async () => {
    const mod = await load();
    let Comp: ComponentType;
    if ("default" in mod && typeof mod.default === "function") {
      Comp = mod.default as ComponentType;
    } else {
      const name = exportName ?? Object.keys(mod).find((k) => typeof mod[k] === "function");
      if (!name) throw new Error("No component export found");
      Comp = mod[name] as ComponentType;
    }
    // Wrap in PageErrorBoundary at route level
    const Wrapped = () => (
      <PageErrorBoundary>
        <Comp />
      </PageErrorBoundary>
    );
    return { Component: Wrapped };
  };
}

function FoundationsRedirect() {
  return <Navigate to="/foundations/energy" replace />;
}

function NotFound() {
  return <Navigate to="/" replace />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DocLayout,
    HydrateFallback: () => null,
    children: [
      { index: true, lazy: routeLazy(() => import("./pages/philosophy"), "PhilosophyPage") },
      { path: "foundations", Component: FoundationsRedirect },
      {
        path: "foundations/:id",
        lazy: routeLazy(() => import("./pages/foundation-detail"), "FoundationDetailPage"),
      },
      { path: "tokens", lazy: routeLazy(() => import("./pages/tokens"), "TokensPage") },
      { path: "primitives", lazy: routeLazy(() => import("./pages/primitives"), "PrimitivesPage") },
      {
        path: "state-model",
        lazy: routeLazy(() => import("./pages/state-model"), "StateModelPage"),
      },

      // ── Legacy component routes (still accessible) ──
      {
        path: "components/core",
        lazy: routeLazy(() => import("./pages/components-core"), "ComponentsCorePage"),
      },
      {
        path: "components/mobile",
        lazy: routeLazy(() => import("./pages/components-mobile"), "ComponentsMobilePage"),
      },
      {
        path: "components/desktop",
        lazy: routeLazy(() => import("./pages/components-desktop"), "ComponentsDesktopPage"),
      },
      {
        path: "components/adaptive",
        lazy: routeLazy(() => import("./pages/components-adaptive"), "ComponentsAdaptivePage"),
      },
      {
        path: "components/templates/doc-template",
        lazy: routeLazy(() => import("./pages/doc-template-page"), "DocTemplatePage"),
      },

      // ── Components (L3) — domain-organized ──
      {
        path: "components/:domain",
        lazy: routeLazy(() => import("./pages/components-by-domain"), "ComponentsByDomainPage"),
      },
      {
        path: "components/:domain/:component",
        lazy: routeLazy(() => import("./pages/component-detail"), "ComponentDetailPage"),
      },

      // ── Patterns (L4) ──
      { path: "patterns", lazy: routeLazy(() => import("./pages/patterns"), "PatternsPage") },
      {
        path: "patterns/:category",
        lazy: routeLazy(() => import("./pages/patterns-by-category"), "PatternsByCategoryPage"),
      },
      {
        path: "patterns/:category/:pattern",
        lazy: routeLazy(() => import("./pages/pattern-detail"), "PatternDetailPage"),
      },

      // ── Other ──
      { path: "governance", lazy: routeLazy(() => import("./pages/governance"), "GovernancePage") },
      { path: "templates", lazy: routeLazy(() => import("./pages/templates"), "TemplatesPage") },
      { path: "demos", lazy: routeLazy(() => import("./pages/demos"), "DemosPage") },
      {
        path: "layout-grid",
        lazy: routeLazy(() => import("./pages/layout-grid"), "LayoutGridPage"),
      },
      {
        path: "density-showcase",
        lazy: routeLazy(() => import("./pages/density-showcase"), "DensityShowcasePage"),
      },
      {
        path: "density-audit-showcase",
        lazy: routeLazy(() => import("./pages/density-audit-showcase"), "DensityAuditShowcasePage"),
      },
      {
        path: "momentum-audit-showcase",
        lazy: routeLazy(
          () => import("./pages/momentum-audit-showcase"),
          "MomentumAuditShowcasePage",
        ),
      },
      {
        path: "flag-explorer",
        lazy: routeLazy(() => import("./pages/flag-explorer"), "FlagExplorerPage"),
      },
      { path: "tone-demo", lazy: routeLazy(() => import("./pages/tone-demo"), "ToneDemo") },
      {
        path: "system-audit",
        lazy: routeLazy(() => import("./pages/system-audit"), "SystemAuditPage"),
      },
      {
        path: "phase3-showcase",
        lazy: routeLazy(() => import("./pages/phase3-showcase"), "Phase3ShowcasePage"),
      },
      { path: "energy", Component: FoundationsRedirect },
      { path: "*", Component: NotFound },
    ],
  },
]);
