/** FLOW — FlowCommandPalette (L4 Pattern) */
import React, {
  forwardRef,
  type KeyboardEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { FlowTextInput } from "@flow/components";
import { FlowIcon, GrowthObserver, Inline, Stack, Text, useFlowFocusTrap } from "@flow/primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMMAND PALETTE — Keyboard-driven command launcher
//    WAI-ARIA: role="combobox" + "listbox", typeahead filtering
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface CommandItem {
  /** Unique command identifier */
  id: string;
  /** Command display label */
  label: string;
  /** Icon name */
  icon?: string;
  /** Keyboard shortcut hint */
  shortcut?: string;
  /** Group name for categorized commands */
  group?: string;
  /** Category label for grouping — alias for group */
  category?: string;
  /** Whether the command is disabled */
  disabled?: boolean;
  /** Callback fired when the command is executed */
  onAction?: () => void;
}

/** Props for FlowCommandPalette — keyboard-driven command launcher with typeahead search and grouped results. */
export interface CommandPaletteProps {
  /** Whether the palette is open */
  open: boolean;
  /** Callback fired when the palette requests to close */
  onClose: () => void;
  /** Available commands */
  commands: CommandItem[];
  /** Placeholder text for the search input */
  placeholder?: string;
  /** Message shown when no commands match the query */
  emptyMessage?: string;
  /** Callback fired when a command is selected */
  onSelect?: (cmd: CommandItem) => void;
}

export const FlowCommandPalette = forwardRef<HTMLDivElement, CommandPaletteProps>(
  function FlowCommandPalette(
    {
      open,
      onClose,
      commands,
      placeholder = "Type a command...",
      emptyMessage = "No results found",
      onSelect,
      ...rest
    },
    ref,
  ) {
    const [query, setQuery] = useState("");
    const [activeIdx, setActiveIdx] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const dialogRef = useRef<HTMLDivElement>(null);
    const listId = useId();

    // Reset query & active index when palette opens (setState during render on prop change)
    const [prevOpen, setPrevOpen] = useState(open);
    if (open !== prevOpen) {
      setPrevOpen(open);
      if (open) {
        setQuery("");
        setActiveIdx(0);
      }
    }

    // Wrapper that co-locates activeIdx reset with query changes
    const handleQueryChange = (val: string) => {
      setQuery(val);
      setActiveIdx(0);
    };

    useFlowFocusTrap(dialogRef, open, onClose);

    const filtered = useMemo(() => {
      if (!query.trim()) return commands.filter((c) => !c.disabled);
      const q = query.toLowerCase();
      return commands.filter((c) => !c.disabled && c.label.toLowerCase().includes(q));
    }, [commands, query]);

    const grouped = useMemo(() => {
      const map = new Map<string, CommandItem[]>();
      for (const cmd of filtered) {
        const g = cmd.group ?? "";
        if (!map.has(g)) map.set(g, []);
        map.get(g)!.push(cmd);
      }
      return map;
    }, [filtered]);

    const select = (cmd: CommandItem) => {
      cmd.onAction?.();
      onSelect?.(cmd);
      onClose();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && filtered[activeIdx]) {
        e.preventDefault();
        select(filtered[activeIdx]);
      }
    };

    // Scroll active item into view
    useEffect(() => {
      const el = listRef.current?.querySelector(`[data-cmd-idx="${activeIdx}"]`);
      el?.scrollIntoView({ block: "nearest" });
    }, [activeIdx]);

    // Stable ref for imperative keydown handler
    const handleKeyDownRef = useRef(handleKeyDown);
    useEffect(() => {
      handleKeyDownRef.current = handleKeyDown;
    });

    // Imperative ARIA attributes on inner <input> (FlowTextInput doesn't expose role/aria-*)
    useEffect(() => {
      const el = inputRef.current;
      if (!el) return;
      el.setAttribute("role", "combobox");
      el.setAttribute("aria-expanded", "true");
      el.setAttribute("aria-controls", listId);
      if (filtered[activeIdx]) {
        el.setAttribute("aria-activedescendant", `cmd-${filtered[activeIdx].id}`);
      } else {
        el.removeAttribute("aria-activedescendant");
      }
    }, [open, listId, filtered, activeIdx]);

    // Imperative keydown listener (stable — handler accessed via ref)
    useEffect(() => {
      const el = inputRef.current;
      if (!el) return;
      const handler = (e: Event) => handleKeyDownRef.current(e as unknown as KeyboardEvent);
      el.addEventListener("keydown", handler);
      return () => el.removeEventListener("keydown", handler);
    }, [open]);

    if (!open) return null;

    return (
      <GrowthObserver event="flow.command-palette.impression">
        <div
          ref={ref}
          {...rest}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: "var(--sys-depth-layer-modal)" as unknown as number,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: "15vh",
            background: "color-mix(in srgb, var(--sys-energy-surface-primary) 60%, transparent)",
            backdropFilter: "var(--sys-depth-backdrop)",
          }}
          onClick={onClose}
          role="presentation"
        >
          <div role="presentation" onClick={(e) => e.stopPropagation()}>
            <div
              ref={dialogRef}
              style={{
                width: "min(540px, 90vw)",
                background: "var(--sys-energy-surface-primary)",
                border: "var(--sys-frame-border-thin) solid var(--sys-energy-border-default)",
                borderRadius: "var(--sys-frame-radius-container)",
                boxShadow: "var(--sys-depth-elevation-high)",
                overflow: "hidden",
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
            >
              {/* Search input */}
              <Inline
                gap="component"
                align="center"
                style={{
                  padding: "var(--sys-frame-padding-control)",
                  borderBottom:
                    "var(--sys-frame-border-thin) solid var(--sys-energy-border-subtle)",
                }}
              >
                <FlowTextInput
                  ref={inputRef}
                  value={query}
                  onChange={(val: string) => handleQueryChange(val)}
                  placeholder={placeholder}
                  leadingIcon="search"
                  style={{ flex: 1 }}
                />
                <kbd
                  style={{
                    padding: "2px 6px",
                    borderRadius: "var(--sys-frame-radius-sm)",
                    background: "var(--sys-energy-surface-secondary)",
                    color: "var(--sys-energy-text-tertiary)",
                    fontSize: "var(--sys-voice-caption-size)",
                    border: "var(--sys-frame-border-thin) solid var(--sys-energy-border-subtle)",
                  }}
                >
                  Esc
                </kbd>
              </Inline>

              {/* Results */}
              <div
                ref={listRef}
                id={listId}
                role="listbox"
                style={{
                  maxHeight: "var(--comp-command-palette-max-height)",
                  overflowY: "auto",
                  padding: "var(--ref-frame-space-1)",
                }}
              >
                {filtered.length === 0 ? (
                  <div role="option" aria-selected={false} aria-disabled="true">
                    <Stack gap={2} align="center" padding={6} style={{ textAlign: "center" }}>
                      <Text variant="paragraph-s" color="tertiary">
                        {emptyMessage}
                      </Text>
                    </Stack>
                  </div>
                ) : (
                  Array.from(grouped.entries()).map(([group, items]) => (
                    <div key={group} role="group" aria-label={group || "Commands"}>
                      {group && (
                        <Text
                          variant="overline"
                          color="tertiary"
                          aria-hidden="true"
                          style={{
                            padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)",
                            display: "block",
                          }}
                        >
                          {group}
                        </Text>
                      )}
                      {items.map((cmd) => {
                        const idx = filtered.indexOf(cmd);
                        const isActive = idx === activeIdx;
                        return (
                          <div
                            key={cmd.id}
                            id={`cmd-${cmd.id}`}
                            role="option"
                            data-cmd-idx={idx}
                            aria-selected={isActive}
                            tabIndex={-1}
                            onClick={() => select(cmd)}
                            onKeyDown={(e: React.KeyboardEvent) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                select(cmd);
                              }
                            }}
                            onMouseEnter={() => setActiveIdx(idx)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "var(--ref-frame-space-2)",
                              padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)",
                              borderRadius: "var(--sys-frame-radius-sm)",
                              cursor: "pointer",
                              background: isActive
                                ? "var(--sys-energy-surface-accent-subtle)"
                                : "transparent",
                              color: "var(--sys-energy-text-primary)",
                              fontSize: "var(--sys-voice-paragraph-s-size)",
                              transition: "background var(--sys-momentum-transition-fast)",
                            }}
                          >
                            {cmd.icon && <FlowIcon name={cmd.icon} size="sm" />}
                            <Text variant="paragraph-s" style={{ flex: 1 }} color="inherit">
                              {cmd.label}
                            </Text>
                            {cmd.shortcut && (
                              <kbd
                                style={{
                                  padding: "1px 5px",
                                  borderRadius: "var(--sys-frame-radius-sm)",
                                  background: "var(--sys-energy-surface-secondary)",
                                  color: "var(--sys-energy-text-tertiary)",
                                  fontSize: "var(--sys-voice-caption-size)",
                                  border:
                                    "var(--sys-frame-border-thin) solid var(--sys-energy-border-subtle)",
                                }}
                              >
                                {cmd.shortcut}
                              </kbd>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </GrowthObserver>
    );
  },
);
FlowCommandPalette.displayName = "FlowCommandPalette";
