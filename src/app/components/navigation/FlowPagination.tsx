/** FLOW — FlowPagination (L3 Component) */
import { type CSSProperties, forwardRef } from "react";

import { FlowIcon, GrowthObserver, Text } from "../../primitives";
import { useFlowLocale } from "../../hooks/use-flow-locale";

/** Props for FlowPagination — page navigation control with numbered buttons, arrows, and ellipsis collapsing. */
export interface PaginationProps {
  /** Current page (1-based) */
  page: number;
  /** Total number of pages */
  totalPages: number;
  /** Change handler */
  onChange?: (page: number) => void;
  /** Max visible page buttons (including ellipsis). Default: 7 */
  siblingCount?: number;
  /** Show first/last page navigation buttons */
  showEdges?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state — prevents page changes, shows indicator */
  loading?: boolean;
  /** Accessible label */
  "aria-label"?: string;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

function generatePageRange(
  page: number,
  totalPages: number,
  siblingCount: number,
): (number | "ellipsis-start" | "ellipsis-end")[] {
  const siblings = siblingCount;
  const totalNumbers = siblings * 2 + 3; // siblings + current + first + last
  const totalBlocks = totalNumbers + 2; // + 2 ellipsis slots

  if (totalPages <= totalBlocks) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIdx = Math.max(page - siblings, 2);
  const rightSiblingIdx = Math.min(page + siblings, totalPages - 1);

  const showLeftEllipsis = leftSiblingIdx > 2;
  const showRightEllipsis = rightSiblingIdx < totalPages - 1;

  const result: (number | "ellipsis-start" | "ellipsis-end")[] = [1];

  if (showLeftEllipsis) {
    result.push("ellipsis-start");
  } else {
    for (let i = 2; i < leftSiblingIdx; i++) result.push(i);
  }

  for (let i = leftSiblingIdx; i <= rightSiblingIdx; i++) {
    result.push(i);
  }

  if (showRightEllipsis) {
    result.push("ellipsis-end");
  } else {
    for (let i = rightSiblingIdx + 1; i < totalPages; i++) result.push(i);
  }

  result.push(totalPages);
  return result;
}

export const FlowPagination = forwardRef<HTMLElement, PaginationProps>(
  function FlowPagination({
    page,
    totalPages,
    onChange,
    siblingCount = 1,
    showEdges = false,
    disabled = false,
    loading = false,
    "aria-label": ariaLabel = "Pagination",
    className = "",
    style,
    ...rest
  }, ref) {
  const t = useFlowLocale();
  const handleChange = onChange ?? (() => {});
  const pages = generatePageRange(page, totalPages, siblingCount);

  return (
    <GrowthObserver event="flow.pagination.impression" properties={{ totalPages }} inline>
    <nav
      ref={ref}
      {...rest}
      aria-label={ariaLabel}
      className={className}
      data-state={disabled ? "disabled" : loading ? "loading" : undefined}
      aria-busy={loading || undefined}
      style={style}
    >
      <div className="flow-pagination">
        {/* First page */}
        {showEdges && (
          <button
            type="button"
            className="flow-pagination-nav flow-focusable"
            aria-label="First page"
            disabled={disabled || loading || page <= 1}
            onClick={() => handleChange(1)}
          >
            <FlowIcon name="chevrons-left" size="sm" />
          </button>
        )}

        {/* Previous page */}
        <button
          type="button"
          className="flow-pagination-nav flow-focusable"
          aria-label={t("pagination.previous")}
          disabled={disabled || loading || page <= 1}
          onClick={() => handleChange(page - 1)}
        >
          <FlowIcon name="chevron-left" size="sm" />
        </button>

        {/* Page buttons */}
        {pages.map((p, _idx) => {
          if (typeof p === "string") {
            return (
              <Text key={p} as="span" role="label-m" className="flow-pagination-ellipsis" aria-hidden="true">
                ...
              </Text>
            );
          }
          return (
            <button
              key={p}
              type="button"
              className="flow-pagination-btn flow-focusable"
              data-active={p === page || undefined}
              aria-current={p === page ? "page" : undefined}
              aria-label={t("pagination.page", { page: p })}
              disabled={disabled || loading}
              onClick={() => p !== page && handleChange(p)}
            >
              {p}
            </button>
          );
        })}

        {/* Next page */}
        <button
          type="button"
          className="flow-pagination-nav flow-focusable"
          aria-label={t("pagination.next")}
          disabled={disabled || loading || page >= totalPages}
          onClick={() => handleChange(page + 1)}
        >
          <FlowIcon name="chevron-right" size="sm" />
        </button>

        {/* Last page */}
        {showEdges && (
          <button
            type="button"
            className="flow-pagination-nav flow-focusable"
            aria-label="Last page"
            disabled={disabled || loading || page >= totalPages}
            onClick={() => handleChange(totalPages)}
          >
            <FlowIcon name="chevrons-right" size="sm" />
          </button>
        )}
        {loading && (
          <span className="flow-pagination-loading" aria-hidden="true">
            <FlowIcon name="loader" size="sm" />
          </span>
        )}
      </div>
    </nav>
    </GrowthObserver>
  );
  }
);
