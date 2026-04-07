/** FLOW — FlowAvatarGroup (L3 Component) */
import React, { type CSSProperties, forwardRef, type ReactNode } from "react";

import { FlowAvatar } from "./FlowAvatar";
import { useFlowDefaultSize } from "../../hooks/use-flow-default-size";
import { GrowthObserver } from "../../primitives";

type AvatarSize = "sm" | "md" | "lg" | "xl";

/** Props for FlowAvatarGroup — displays a stacked group of avatars with an overflow "+N" indicator. */
export interface AvatarGroupProps {
  children: ReactNode;
  /** Max avatars to show before "+N" indicator */
  max?: number;
  size?: AvatarSize;
  className?: string;
  style?: CSSProperties;
}

export const FlowAvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  function FlowAvatarGroup({
    children,
    max,
    size = "md",
    className = "",
    style,
    ...rest
  }, ref) {
  const resolvedSize = useFlowDefaultSize(size);
  const childArray = React.Children.toArray(children);
  const visible = max && max < childArray.length ? childArray.slice(0, max) : childArray;
  const overflow = max && max < childArray.length ? childArray.length - max : 0;

  return (
    <GrowthObserver event="flow.avatar-group.impression" properties={{ max: max ?? 0 }} inline>
    <div ref={ref} {...rest} className={`flow-avatar-group ${className}`} style={style}>
      {overflow > 0 && <FlowAvatar key="overflow" size={resolvedSize} initials={`+${overflow}`} />}
      {[...visible].reverse().map((child, i) => (
        <div key={i} style={{ display: "contents" }}>
          {child}
        </div>
      ))}
    </div>
    </GrowthObserver>
  );
}
);
