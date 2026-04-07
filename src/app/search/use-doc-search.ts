/**
 * FLOW Docs — Search Hook
 * Provides query state, debounced results, and open/close toggles.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { COMPONENT_REGISTRY } from "../pages/component-registry";
import { PATTERN_REGISTRY } from "../pages/pattern-registry";
import { buildSearchIndex, type SearchEntry } from "./search-index";
import { search, type SearchResult } from "./search";

export function useDocSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  // Build index once
  const index = useMemo<SearchEntry[]>(
    () => buildSearchIndex(COMPONENT_REGISTRY, PATTERN_REGISTRY),
    [],
  );

  // Debounced search
  const updateQuery = useCallback(
    (value: string) => {
      setQuery(value);
      if (!value.trim()) {
        setResults([]);
        setIsOpen(false);
        return;
      }
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        const r = search(value, index);
        setResults(r);
        setIsOpen(r.length > 0);
      }, 150);
    },
    [index],
  );

  // Cleanup timer
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  }, []);

  return { query, setQuery: updateQuery, results, isOpen, setIsOpen, close };
}
