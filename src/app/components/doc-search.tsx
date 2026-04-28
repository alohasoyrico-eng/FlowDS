/**
 * FLOW Docs — DocSearch Component
 * Composes FlowSearch with a results dropdown. Integrates into DocLayout.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import { Stack, Surface, Text } from "@flow/primitives";
import { FlowSearch } from "@flow/patterns";
import { FlowTag } from "@flow/components";
import { useDocSearch } from "../search/use-doc-search";
import type { SearchResult } from "../search/search";

const CATEGORY_COLOR: Record<string, string> = {
  Foundation: "var(--sys-energy-status-info)",
  Primitive: "var(--sys-energy-status-success)",
  Component: "var(--sys-energy-action-primary)",
  Pattern: "var(--sys-energy-status-warning)",
};

export function DocSearch({
  collapsed = false,
  onNavigate,
}: {
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  const navigate = useNavigate();
  const { query, setQuery, results, isOpen, setIsOpen, close } = useDocSearch();
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset selection when results change
  useEffect(() => setSelectedIdx(-1), [results]);

  // Close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [setIsOpen]);

  const handleSelect = useCallback(
    (result: SearchResult) => {
      navigate(result.entry.path);
      close();
      onNavigate?.();
    },
    [navigate, close, onNavigate],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen || results.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIdx((i) => (i + 1) % results.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIdx((i) => (i - 1 + results.length) % results.length);
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIdx >= 0 && selectedIdx < results.length) {
            handleSelect(results[selectedIdx]);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          break;
      }
    },
    [isOpen, results, selectedIdx, handleSelect, setIsOpen],
  );

  if (collapsed) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "var(--ref-frame-space-2) 0",
        }}
      >
        <button
          onClick={() => inputRef.current?.focus()}
          aria-label="Search docs"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "var(--ref-frame-space-2)",
            color: "var(--sys-energy-text-tertiary)",
            borderRadius: "var(--ref-frame-radius-2)",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>
    );
  }

  // Group results by category
  const grouped = results.reduce<Record<string, SearchResult[]>>((acc, r) => {
    const cat = r.entry.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(r);
    return acc;
  }, {});

  let flatIdx = 0;

  return (
    <div
      ref={containerRef}
      style={{ position: "relative" }}
      role="combobox"
      tabIndex={-1}
      aria-expanded={isOpen && results.length > 0}
      aria-haspopup="listbox"
      aria-controls="doc-search-listbox"
      onKeyDown={handleKeyDown}
    >
      <div style={{ padding: "0 var(--ref-frame-space-4) var(--ref-frame-space-2)" }}>
        <FlowSearch
          ref={inputRef}
          value={query}
          onChange={setQuery}
          placeholder="Search docs..."
          shortcut="/"
          size="sm"
          aria-label="Search documentation"
        />
      </div>

      {isOpen && results.length > 0 && (
        <div id="doc-search-listbox" role="listbox">
          <Surface
            elevation={3}
            radius="container"
            padding={0}
            style={{
              position: "absolute",
              top: "100%",
              left: "var(--ref-frame-space-2)",
              right: "var(--ref-frame-space-2)",
              zIndex: "var(--ref-depth-zIndex-dropdown)" as unknown as number,
              maxHeight: "360px",
              overflowY: "auto",
            }}
          >
            <Stack gap={0}>
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  {/* Category header */}
                  <div
                    style={{
                      padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)",
                      borderBottom: "1px solid var(--sys-energy-border-default)",
                    }}
                  >
                    <Text variant="overline" color="tertiary">
                      {category}s
                    </Text>
                  </div>
                  {/* Items */}
                  {items.map((result) => {
                    const idx = flatIdx++;
                    const isSelected = idx === selectedIdx;
                    return (
                      <button
                        key={result.entry.path + result.entry.title}
                        onClick={() => handleSelect(result)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "var(--ref-frame-space-3)",
                          width: "100%",
                          padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)",
                          border: "none",
                          cursor: "pointer",
                          textAlign: "left",
                          fontFamily: "var(--ref-voice-family-sans)",
                          background: isSelected
                            ? "var(--sys-energy-surface-tertiary)"
                            : "transparent",
                          borderBottom: "1px solid var(--sys-energy-border-default)",
                        }}
                      >
                        <FlowTag
                          size="sm"
                          style={{
                            flexShrink: 0,
                            background:
                              CATEGORY_COLOR[result.entry.category] ??
                              "var(--sys-energy-surface-accent)",
                            color: "white",
                            fontSize: "var(--ref-voice-size-1)",
                          }}
                        >
                          {result.entry.category.slice(0, 4)}
                        </FlowTag>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <Text variant="label-s" style={{ display: "block" }}>
                            {result.entry.title}
                          </Text>
                          <Text
                            variant="caption"
                            color="tertiary"
                            style={{
                              display: "block",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {result.entry.description}
                          </Text>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))}
            </Stack>
          </Surface>
        </div>
      )}
    </div>
  );
}
