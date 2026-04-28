import { createBrowserRouter, Navigate } from "react-router";
import { type ComponentType } from "react";

import { DocLayout } from "./components/doc-layout";
import { PageErrorBoundary } from "./components/page-error-boundary";
import { PreviewPage } from "./pages/preview";

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

// import.meta.env.BASE_URL is set by Vite from the `base` config option.
// In dev it's "/" — on GitHub Pages it's "/flow/" — React Router uses it as basename
// so all <Link to="/..."> paths stay relative to the deployment root automatically.
export const router = createBrowserRouter(
  [
  // Isolated preview routes — no DocLayout chrome, used for VRT and interaction tests
  {
    path: "/preview/:componentId",
    Component: PreviewPage,
  },
  {
    path: "/preview/:componentId/:variant",
    Component: PreviewPage,
  },
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
      {
        path: "installation",
        lazy: routeLazy(() => import("./pages/installation"), "InstallationPage"),
      },
      {
        path: "changelog",
        lazy: routeLazy(() => import("./pages/changelog"), "ChangelogPage"),
      },
      { path: "tokens", lazy: routeLazy(() => import("./pages/tokens"), "TokensPage") },
      { path: "primitives", lazy: routeLazy(() => import("./pages/primitives"), "PrimitivesPage") },

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
      {
        path: "flag-explorer",
        lazy: routeLazy(() => import("./pages/flag-explorer"), "FlagExplorerPage"),
      },
      {
        path: "icon-explorer",
        lazy: routeLazy(() => import("./pages/icon-explorer"), "IconExplorerPage"),
      },
      { path: "energy", Component: FoundationsRedirect },
      { path: "*", Component: NotFound },
    ],
  },
  ],
  { basename: import.meta.env.BASE_URL },
);
