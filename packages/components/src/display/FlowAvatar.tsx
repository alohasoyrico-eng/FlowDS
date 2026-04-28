/** FLOW — FlowAvatar (L3 Component) */
import "../../css/display/Avatar.css";
import { type CSSProperties, forwardRef, useState } from "react";
import { FlowIcon, GrowthObserver, stateAttrs, Text, useFlowDefaultSize } from "@flow/primitives";

type AvatarSize = "sm" | "md" | "lg" | "xl";
type AvatarShape = "circle" | "square";
type AvatarStatus = "online" | "offline" | "busy" | "away";

/** Props for FlowAvatar — user or entity avatar displaying an image, initials, or icon with optional status indicator. */
export interface AvatarProps {
  /** Image URL — if provided, renders as <img> */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Initials to display when no image (e.g., "JD") */
  initials?: string;
  /** Full name — auto-computes initials from first letter of each word (convenience prop) */
  name?: string;
  /** Icon name — fallback when no src or initials */
  icon?: string;
  /** Size variant */
  size?: AvatarSize;
  /** Shape variant */
  shape?: AvatarShape;
  /** Online/busy/away status indicator dot */
  status?: AvatarStatus;
  /** Loading state — shows skeleton placeholder */
  loading?: boolean;
  /** Error state — forces fallback display */
  error?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

const avatarIconSizeMap: Record<AvatarSize, "sm" | "md" | "lg" | "xl"> = {
  sm: "sm",
  md: "md",
  lg: "md",
  xl: "lg",
};

export const FlowAvatar = forwardRef<HTMLSpanElement, AvatarProps>(function FlowAvatar(
  {
    src,
    alt = "",
    initials,
    name,
    icon = "user",
    size = "md",
    shape = "circle",
    status,
    loading,
    error,
    className = "",
    style,
    ...rest
  },
  ref,
) {
  const resolvedSize = useFlowDefaultSize(size);
  const [imgError, setImgError] = useState(false);
  // Auto-compute initials from name if initials not provided
  const resolvedInitials =
    initials ??
    (name
      ? name
          .split(" ")
          .map((w) => w[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : undefined);

  const showImage = !!src && !imgError && !error && !loading;
  const showInitials = !showImage && !loading && !error && !!resolvedInitials;

  return (
    <GrowthObserver
      event="flow.avatar.impression"
      properties={{ size: resolvedSize, shape }}
      inline
    >
      <span
        ref={ref}
        {...rest}
        className={`flow-avatar ${className}`}
        data-size={resolvedSize}
        data-shape={shape !== "circle" ? shape : undefined}
        {...stateAttrs({ loading: !!loading, error: !!error })}
        style={style}
        role="img"
        aria-label={alt || resolvedInitials || name || "Avatar"}
      >
        {showImage && (
          <img
            className="flow-avatar-image"
            src={src}
            alt={alt}
            onError={() => setImgError(true)}
          />
        )}
        {showInitials && (
          <Text as="span" variant="caption" color="inherit" className="flow-avatar-initials">
            {resolvedInitials}
          </Text>
        )}
        {!showImage && !showInitials && (
          <span className="flow-avatar-icon">
            <FlowIcon name={icon} size={avatarIconSizeMap[resolvedSize]} />
          </span>
        )}
        {status && <span className="flow-avatar-status" data-status={status} />}
      </span>
    </GrowthObserver>
  );
});
