import { createContext, type ReactNode, useContext } from "react";

/** Default English messages for Flow components. */
export const defaultMessages = {
  // Controls
  "button.loading": "Loading…",
  // Selection
  "select.placeholder": "Select an option",
  "select.noOptions": "No options",
  "select.optionsAvailable": "{count} options available",
  "select.selected": "Selected {label}",
  // Search
  "search.placeholder": "Search…",
  "search.clear": "Clear search",
  // Autocomplete
  "autocomplete.noResults": "No results found",
  "autocomplete.resultsCount": "{count} results",
  // Dialog
  "dialog.close": "Close",
  // Pagination
  "pagination.previous": "Previous page",
  "pagination.next": "Next page",
  "pagination.page": "Page {page}",
  "pagination.of": "of {total}",
  // FileUpload
  "fileUpload.dropzone": "Drop files here or click to browse",
  "fileUpload.maxSize": "Max file size: {size}",
  // TransferList
  "transferList.moveRight": "Move to target",
  "transferList.moveLeft": "Move to source",
  "transferList.moveAllRight": "Move all to target",
  "transferList.moveAllLeft": "Move all to source",
  // Empty state
  "emptyState.title": "No data",
  "emptyState.description": "There is nothing to display.",
} as const;

export type FlowMessages = typeof defaultMessages;

const LocaleContext = createContext<Partial<FlowMessages>>({});

export interface FlowLocaleProviderProps {
  /** Override messages for i18n. Merged with defaults. */
  messages?: Partial<FlowMessages>;
  children: ReactNode;
}

/** Provider for overriding Flow component strings (i18n). */
export function FlowLocaleProvider({ messages = {}, children }: FlowLocaleProviderProps) {
  return <LocaleContext.Provider value={messages}>{children}</LocaleContext.Provider>;
}

/**
 * Hook to get a translated message. Falls back to English default.
 * Supports simple interpolation: `{key}` placeholders replaced by params.
 */
export function useFlowLocale() {
  const overrides = useContext(LocaleContext);

  return function t(key: keyof FlowMessages, params?: Record<string, string | number>): string {
    const template = overrides[key] ?? defaultMessages[key];
    if (!params) return template;
    return Object.entries(params).reduce<string>(
      (str, [k, v]) => str.replace(`{${k}}`, String(v)),
      template,
    );
  };
}
