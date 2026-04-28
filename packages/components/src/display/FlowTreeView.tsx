/** FLOW — FlowTreeView (L3 Component) */
import "../../css/display/TreeView.css";
import React, {
  type CSSProperties,
  forwardRef,
  type KeyboardEvent,
  type ReactNode,
  useRef,
  useState,
} from "react";

import { FlowSkeleton } from "../feedback/FlowSkeleton";
import { FlowIcon, GrowthObserver, Text, useFlowDefaultSize } from "@flow/primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TREE VIEW — Hierarchical collapsible tree
//    WAI-ARIA: role="tree" / "treeitem" / "group", arrow-key nav
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface TreeNode {
  id: string;
  label: string;
  icon?: string;
  children?: TreeNode[];
  disabled?: boolean;
}

/** Props for FlowTreeView — hierarchical collapsible tree with arrow-key navigation and ARIA tree roles. */
export interface TreeViewProps {
  nodes: TreeNode[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  defaultExpandedIds?: string[];
  expandAll?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  multiSelect?: boolean;
  /** Disabled state — all items non-interactive */
  disabled?: boolean;
  /** Loading state — shows skeleton shimmer */
  loading?: boolean;
  className?: string;
  style?: CSSProperties;
  "aria-label"?: string;
}

export const FlowTreeView = forwardRef<HTMLUListElement, TreeViewProps>(function FlowTreeView(
  {
    nodes,
    selectedId,
    onSelect,
    defaultExpandedIds,
    expandAll = false,
    size = "md",
    disabled = false,
    loading = false,
    className = "",
    style,
    "aria-label": ariaLabel,
    ...rest
  },
  ref,
) {
  const resolvedSize = useFlowDefaultSize(size);
  function collectAllIds(ns: TreeNode[]): Set<string> {
    const ids = new Set<string>();
    const walk = (list: TreeNode[]) => {
      for (const n of list) {
        if (n.children?.length) {
          ids.add(n.id);
          walk(n.children);
        }
      }
    };
    walk(ns);
    return ids;
  }

  const [expanded, setExpanded] = useState<Set<string>>(() => {
    if (expandAll) return collectAllIds(nodes);
    return new Set(defaultExpandedIds ?? []);
  });
  const treeRef = useRef<HTMLUListElement>(null);

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const sizeKey = resolvedSize === "sm" ? "sm" : resolvedSize === "lg" ? "lg" : "md";
  const indentVar = `var(--comp-tree-indent-${sizeKey})`;

  const handleTreeKeyDown = (e: KeyboardEvent) => {
    const items = treeRef.current?.querySelectorAll<HTMLElement>(
      "[role='treeitem']:not([aria-disabled='true'])",
    );
    if (!items?.length) return;
    const idx = Array.from(items).indexOf(document.activeElement as HTMLElement);
    if (idx < 0) return;
    const current = items[idx];
    const id = current.dataset.nodeId!;
    const hasChildren = current.getAttribute("aria-expanded") !== null;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[Math.min(idx + 1, items.length - 1)]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[Math.max(idx - 1, 0)]?.focus();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (hasChildren && !expanded.has(id)) toggle(id);
      else if (hasChildren) items[idx + 1]?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (hasChildren && expanded.has(id)) toggle(id);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect?.(id);
    } else if (e.key === "Home") {
      e.preventDefault();
      items[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      items[items.length - 1]?.focus();
    }
  };

  const renderNode = (node: TreeNode, depth: number): ReactNode => {
    const hasKids = !!node.children?.length;
    const isExpanded = expanded.has(node.id);
    const isSelected = selectedId === node.id;
    const isDisabled = disabled || !!node.disabled;

    return (
      <li
        key={node.id}
        role="treeitem"
        className="flow-tree-item"
        data-node-id={node.id}
        aria-expanded={hasKids ? isExpanded : undefined}
        aria-selected={isSelected || undefined}
        aria-disabled={isDisabled || undefined}
        tabIndex={isSelected ? 0 : -1}
        onClick={(e) => {
          e.stopPropagation();
          if (!isDisabled) {
            if (hasKids) toggle(node.id);
            onSelect?.(node.id);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
            if (!isDisabled) {
              if (hasKids) toggle(node.id);
              onSelect?.(node.id);
            }
          }
        }}
        style={{ paddingLeft: `calc(${depth} * ${indentVar})` }}
      >
        <div className="flow-tree-item-row">
          <span className="flow-tree-item-chevron">
            {hasKids && <FlowIcon name={isExpanded ? "chevron-down" : "chevron-right"} size="xs" />}
          </span>
          {node.icon && <FlowIcon name={node.icon} size="sm" />}
          <Text variant="paragraph-s" truncate color="inherit">
            {node.label}
          </Text>
        </div>
        {hasKids && isExpanded && (
          <ul role="group" className="flow-tree-item-group">
            {node.children!.map((c) => renderNode(c, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  if (loading) {
    return (
      <ul
        {...rest}
        ref={(node) => {
          (treeRef as React.MutableRefObject<HTMLUListElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLUListElement | null>).current = node;
        }}
        role="tree"
        aria-label={ariaLabel ?? "Tree"}
        className={className}
        style={style}
        data-size={resolvedSize}
        data-state="loading"
        aria-busy={true}
      >
        {[1, 2, 3].map((i) => (
          <li key={i} className="flow-tree-skeleton">
            <FlowSkeleton variant="text" />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <GrowthObserver event="flow.tree-view.impression" properties={{ size: resolvedSize }} inline>
      <ul
        {...rest}
        ref={(node) => {
          (treeRef as React.MutableRefObject<HTMLUListElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLUListElement | null>).current = node;
        }}
        role="tree"
        aria-label={ariaLabel ?? "Tree"}
        className={className}
        style={style}
        data-size={resolvedSize}
        data-state={disabled ? "disabled" : undefined}
        aria-disabled={disabled || undefined}
        onKeyDown={handleTreeKeyDown}
      >
        {nodes.map((n) => renderNode(n, 0))}
      </ul>
    </GrowthObserver>
  );
});
