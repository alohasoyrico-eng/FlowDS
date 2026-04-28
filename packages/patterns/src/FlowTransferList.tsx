/** FLOW — FlowTransferList (L4 Pattern) */
import { type CSSProperties, forwardRef, useState } from "react";

import { GrowthObserver, Inline, Stack, Text, useFlowDefaultSize } from "@flow/primitives";
import { FlowButton, FlowCheckbox, FlowIconButton, FlowTextInput } from "@flow/components";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TRANSFER LIST — Dual-list with move items between lists
//    WAI-ARIA: two listboxes with transfer buttons
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface TransferItem {
  /** Unique item identifier */
  id: string;
  /** Item display label */
  label: string;
  /** Whether the item cannot be moved */
  disabled?: boolean;
}

/** Props for FlowTransferList — dual-list pattern for moving items between source and target lists. */
export interface TransferListProps {
  /** Heading for the source (available) list */
  sourceTitle?: string;
  /** Heading for the target (selected) list */
  targetTitle?: string;
  /** All transfer items */
  items: TransferItem[];
  /** Default IDs in the target list (uncontrolled) */
  defaultTargetIds?: string[];
  /** Callback fired when target items change */
  onChange?: (targetIds: string[]) => void;
  /** Whether to show search inputs on both lists */
  searchable?: boolean;
  /** List size variant */
  size?: "sm" | "md" | "lg";
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowTransferList = forwardRef<HTMLDivElement, TransferListProps>(
  function FlowTransferList(
    {
      sourceTitle = "Available",
      targetTitle = "Selected",
      items,
      defaultTargetIds = [],
      onChange,
      searchable = false,
      size = "md",
      className = "",
      style,
      ...rest
    },
    ref,
  ) {
    const resolvedSize = useFlowDefaultSize(size);
    const [targetIds, setTargetIds] = useState<Set<string>>(new Set(defaultTargetIds));
    const [sourceSelected, setSourceSelected] = useState<Set<string>>(new Set());
    const [targetSelected, setTargetSelected] = useState<Set<string>>(new Set());
    const [sourceSearch, setSourceSearch] = useState("");
    const [targetSearch, setTargetSearch] = useState("");

    const sourceItems = items.filter((it) => !targetIds.has(it.id));
    const targetItems = items.filter((it) => targetIds.has(it.id));

    const filteredSource = sourceSearch
      ? sourceItems.filter((it) => it.label.toLowerCase().includes(sourceSearch.toLowerCase()))
      : sourceItems;
    const filteredTarget = targetSearch
      ? targetItems.filter((it) => it.label.toLowerCase().includes(targetSearch.toLowerCase()))
      : targetItems;

    const moveRight = () => {
      const next = new Set(targetIds);
      sourceSelected.forEach((id) => next.add(id));
      setTargetIds(next);
      setSourceSelected(new Set());
      onChange?.(Array.from(next));
    };

    const moveLeft = () => {
      const next = new Set(targetIds);
      targetSelected.forEach((id) => next.delete(id));
      setTargetIds(next);
      setTargetSelected(new Set());
      onChange?.(Array.from(next));
    };

    const moveAllRight = () => {
      const next = new Set(items.filter((i) => !i.disabled).map((i) => i.id));
      setTargetIds(next);
      setSourceSelected(new Set());
      onChange?.(Array.from(next));
    };

    const moveAllLeft = () => {
      setTargetIds(new Set());
      setTargetSelected(new Set());
      onChange?.([]);
    };

    const toggleInSet = (set: Set<string>, id: string, setter: (s: Set<string>) => void) => {
      const next = new Set(set);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      setter(next);
    };

    const sizeKey = resolvedSize === "sm" ? "sm" : resolvedSize === "lg" ? "lg" : "md";
    const listHVar = `var(--comp-transfer-list-height-${sizeKey})`;
    const itemHVar = `var(--comp-transfer-list-item-height-${sizeKey})`;

    const renderList = (
      title: string,
      listItems: TransferItem[],
      selected: Set<string>,
      setSelected: (s: Set<string>) => void,
      search: string,
      setSearch: (s: string) => void,
      ariaLabel: string,
    ) => (
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          border: "var(--sys-frame-border-thin) solid var(--sys-energy-border-default)",
          borderRadius: "var(--sys-frame-radius-container)",
          overflow: "hidden",
        }}
      >
        <Inline
          justify="between"
          align="center"
          style={{
            padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)",
            background: "var(--sys-energy-surface-secondary)",
            borderBottom: "var(--sys-frame-border-thin) solid var(--sys-energy-border-subtle)",
          }}
        >
          <Text variant="label-s">{title}</Text>
          <Text variant="caption" color="secondary">
            {selected.size}/{listItems.length}
          </Text>
        </Inline>
        {searchable && (
          <div
            style={{
              padding: "var(--ref-frame-space-1) var(--ref-frame-space-2)",
              borderBottom: "var(--sys-frame-border-thin) solid var(--sys-energy-border-subtle)",
            }}
          >
            <FlowTextInput
              value={search}
              onChange={(val) => setSearch(val)}
              placeholder="Search..."
              size="sm"
            />
          </div>
        )}
        <div
          role="listbox"
          aria-label={ariaLabel}
          aria-multiselectable="true"
          style={{ height: listHVar, overflowY: "auto" }}
        >
          {listItems.map((item) => {
            const isSel = selected.has(item.id);
            return (
              <div
                key={item.id}
                role="option"
                aria-selected={isSel}
                aria-disabled={item.disabled || undefined}
                tabIndex={-1}
                onClick={() => {
                  if (!item.disabled) toggleInSet(selected, item.id, setSelected);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (!item.disabled) toggleInSet(selected, item.id, setSelected);
                  }
                }}
                style={{
                  height: itemHVar,
                  display: "flex",
                  alignItems: "center",
                  paddingInline: "var(--ref-frame-space-3)",
                  gap: "var(--ref-frame-space-2)",
                  cursor: item.disabled ? "default" : "pointer",
                  background: isSel ? "var(--sys-energy-surface-accent-subtle)" : "transparent",
                  color: item.disabled
                    ? "var(--sys-energy-text-disabled)"
                    : "var(--sys-energy-text-primary)",
                  fontSize: "var(--sys-voice-paragraph-s-size)",
                  transition: "background var(--sys-momentum-transition-fast)",
                }}
                onMouseEnter={(e) => {
                  if (!isSel && !item.disabled)
                    (e.currentTarget as HTMLElement).style.background =
                      "var(--sys-energy-state-hover)";
                }}
                onMouseLeave={(e) => {
                  if (!isSel) (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                <span
                  aria-hidden="true"
                  onClick={(e) => e.stopPropagation()}
                  style={{ flexShrink: 0 }}
                >
                  <FlowCheckbox checked={isSel} size="sm" disabled tabIndex={-1} />
                </span>
                <Text
                  variant="paragraph-s"
                  color="inherit"
                  style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                >
                  {item.label}
                </Text>
              </div>
            );
          })}
        </div>
        {listItems.length === 0 && (
          <Text
            variant="caption"
            color="tertiary"
            style={{ padding: "var(--sys-frame-padding-control)", textAlign: "center" }}
          >
            No items
          </Text>
        )}
      </div>
    );

    return (
      <GrowthObserver event="flow.transfer-list.impression">
        <div
          ref={ref}
          {...rest}
          className={className}
          data-size={resolvedSize}
          style={{
            display: "flex",
            gap: "var(--ref-frame-space-2)",
            alignItems: "center",
            ...style,
          }}
        >
          {renderList(
            sourceTitle,
            filteredSource,
            sourceSelected,
            setSourceSelected,
            sourceSearch,
            setSourceSearch,
            "Available items",
          )}
          <Stack gap={1} style={{ flexShrink: 0 }}>
            <FlowButton
              variant="outlined"
              size="sm"
              onClick={moveAllRight}
              disabled={sourceItems.length === 0}
              aria-label="Move all right"
            >
              &raquo;
            </FlowButton>
            <FlowIconButton
              icon="chevron-right"
              size="sm"
              variant="outlined"
              onClick={moveRight}
              disabled={sourceSelected.size === 0}
              aria-label="Move selected right"
              tooltip="Move selected right"
            />
            <FlowIconButton
              icon="chevron-left"
              size="sm"
              variant="outlined"
              onClick={moveLeft}
              disabled={targetSelected.size === 0}
              aria-label="Move selected left"
              tooltip="Move selected left"
            />
            <FlowButton
              variant="outlined"
              size="sm"
              onClick={moveAllLeft}
              disabled={targetItems.length === 0}
              aria-label="Move all left"
            >
              &laquo;
            </FlowButton>
          </Stack>
          {renderList(
            targetTitle,
            filteredTarget,
            targetSelected,
            setTargetSelected,
            targetSearch,
            setTargetSearch,
            "Selected items",
          )}
        </div>
      </GrowthObserver>
    );
  },
);
FlowTransferList.displayName = "FlowTransferList";
