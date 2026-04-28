/**
 * ToneExplorer — Interactive tone & microcopy explorer
 * ────────────────────────────────────────────────────────────
 * Visualizes FLOW's tone system:
 * - Message anatomy breakdown
 * - Tone by context (error, success, empty, loading, warning)
 * - Do / Don't microcopy comparisons
 * - Tone principles
 *
 * Embedded within the Tone foundation detail page.
 */
import { useState } from "react";

import { Divider, Inline, Stack, Surface, Text } from "@flow/primitives";

// ── Types ──
type ToneContext = "error" | "success" | "empty" | "loading" | "warning";

interface Message {
  label: string;
  title: string;
  body: string;
  action?: string;
  secondaryAction?: string;
}

interface DoDontPair {
  dont: string;
  doText: string;
}

interface Principle {
  icon: string;
  name: string;
  description: string;
}

// ── Data ──
const TONE_MESSAGES: Record<ToneContext, Message[]> = {
  error: [
    {
      label: "Validation",
      title: "Invalid email format",
      body: "Enter an email like name@company.com",
      action: "Fix email",
    },
    {
      label: "Permission",
      title: "Access denied",
      body: "You don't have permission to view this resource.",
      action: "Request access",
    },
    {
      label: "System",
      title: "Something went wrong",
      body: "We couldn't complete your request. Our team has been notified.",
      action: "Try again",
    },
  ],
  success: [
    { label: "Save", title: "Changes saved", body: "Your profile has been updated successfully." },
    {
      label: "Delete",
      title: "Item removed",
      body: "The selected item has been permanently deleted.",
    },
    {
      label: "Submit",
      title: "Application submitted",
      body: "We'll review your application within 2 business days.",
    },
  ],
  empty: [
    {
      label: "First use",
      title: "No projects yet",
      body: "Create your first project to get started.",
      action: "Create project",
    },
    {
      label: "Search",
      title: "No results found",
      body: "Try different search terms or remove some filters.",
      action: "Clear filters",
    },
    {
      label: "Error",
      title: "Couldn't load data",
      body: "Something went wrong while loading. Check your connection.",
      action: "Retry",
    },
  ],
  loading: [
    { label: "Initial", title: "Loading your dashboard...", body: "" },
    { label: "Action", title: "Saving changes...", body: "" },
    { label: "Long", title: "This might take a moment.", body: "We're processing your data." },
  ],
  warning: [
    {
      label: "Destructive",
      title: "Delete 12 items?",
      body: "This action cannot be undone. All selected items will be permanently removed.",
      action: "Delete",
      secondaryAction: "Cancel",
    },
    {
      label: "Limit",
      title: "Storage almost full",
      body: "You've used 95% of your storage. Consider removing unused files.",
      action: "Manage storage",
    },
    {
      label: "Session",
      title: "Session expiring",
      body: "Your session will expire in 5 minutes due to inactivity.",
      action: "Stay signed in",
    },
  ],
};

const DO_DONT_PAIRS: DoDontPair[] = [
  {
    dont: "Error 422: Unprocessable Entity",
    doText: "This email is already in use. Try signing in.",
  },
  { dont: "You entered an invalid amount", doText: "Amount must be between $1 and $10,000" },
  {
    dont: "Session token expired. Re-authenticate.",
    doText: "You've been signed out. Please sign in again.",
  },
  { dont: "Are you sure?", doText: "Delete this project? This can't be undone." },
  { dont: "Success!", doText: "Changes saved" },
  { dont: "Loading...", doText: "Loading your projects..." },
];

const PRINCIPLES: Principle[] = [
  {
    icon: "→",
    name: "Actionable > Informational",
    description:
      "Every message should tell users what they can do next, not just what happened. Lead with the action, not the explanation.",
  },
  {
    icon: "⊘",
    name: "Blame system, not user",
    description:
      'Frame errors as system limitations, not user mistakes. Say "We couldn\'t save" instead of "You failed to save."',
  },
  {
    icon: "◐",
    name: "Progressive disclosure",
    description:
      "Start with the shortest useful message. Offer details on demand. Title first, body if needed, help text as a last resort.",
  },
  {
    icon: "◷",
    name: "Consistent tense",
    description:
      'Past tense for confirmations ("saved"), present for in-progress actions ("saving"), conditional future for warnings ("will expire").',
  },
  {
    icon: "✕",
    name: "No jargon",
    description:
      "Never expose error codes, technical terms, or internal names. Translate every system concept into plain language the user already knows.",
  },
];

const CONTEXT_LABELS: Record<ToneContext, string> = {
  error: "Error",
  success: "Success",
  empty: "Empty State",
  loading: "Loading",
  warning: "Warning",
};

const CONTEXT_COLORS: Record<ToneContext, { bg: string; border: string }> = {
  error: { bg: "var(--ref-energy-coral-100)", border: "var(--ref-energy-coral-700)" },
  success: { bg: "var(--ref-energy-jade-100)", border: "var(--ref-energy-jade-700)" },
  empty: { bg: "var(--sys-energy-surface-secondary)", border: "var(--sys-energy-border-default)" },
  loading: {
    bg: "var(--sys-energy-surface-secondary)",
    border: "var(--sys-energy-border-default)",
  },
  warning: { bg: "var(--ref-energy-coral-100)", border: "var(--ref-energy-coral-700)" },
};

// ── Tab button ──
function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "var(--ref-frame-space-2) var(--ref-frame-space-4)",
        borderRadius: "var(--ref-frame-radius-2)",
        border: active
          ? "1px solid var(--sys-energy-border-focus)"
          : "1px solid var(--sys-energy-border-default)",
        background: active
          ? "var(--sys-energy-surface-accent)"
          : "var(--sys-energy-surface-primary)",
        color: active ? "var(--sys-energy-text-accent)" : "var(--sys-energy-text-secondary)",
        cursor: "pointer",
        fontFamily: "var(--ref-voice-family-sans)",
        fontSize: "var(--ref-voice-size-5)",
        fontWeight: "var(--ref-voice-weight-medium)",
        transition: "var(--ref-momentum-duration-fast) var(--ref-momentum-easing-standard)",
      }}
    >
      {label}
    </button>
  );
}

// ── Anatomy annotation ──
function AnatomyRow({
  label,
  description,
  example,
  color,
}: {
  label: string;
  description: string;
  example: string;
  color: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--ref-frame-space-4)" }}>
      <div
        style={{
          minWidth: "var(--ref-frame-space-2)",
          width: "var(--ref-frame-space-2)",
          height: "var(--ref-frame-space-2)",
          borderRadius: "var(--ref-frame-radius-full)",
          background: color,
          marginTop: "var(--ref-frame-space-1)",
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1 }}>
        <Text variant="label-l" style={{ color }}>
          {label}
        </Text>
        <Text
          variant="paragraph-s"
          style={{
            color: "var(--sys-energy-text-secondary)",
            marginTop: "var(--ref-frame-space-micro)",
          }}
        >
          {description}
        </Text>
        <div
          style={{
            marginTop: "var(--ref-frame-space-2)",
            padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)",
            borderRadius: "var(--ref-frame-radius-1)",
            background: "var(--sys-energy-surface-secondary)",
            fontFamily: "var(--ref-voice-family-mono)",
            fontSize: "var(--ref-voice-size-4)",
            color: "var(--sys-energy-text-primary)",
          }}
        >
          {example}
        </div>
      </div>
    </div>
  );
}

// ── Message card ──
function MessageCard({ message, context }: { message: Message; context: ToneContext }) {
  const colors = CONTEXT_COLORS[context];
  return (
    <div
      style={{
        padding: "var(--ref-frame-space-4)",
        borderRadius: "var(--ref-frame-radius-2)",
        border: `1px solid ${colors.border}`,
        background: colors.bg,
      }}
    >
      <Text
        variant="label-s"
        style={{
          color: "var(--sys-energy-text-tertiary)",
          marginBottom: "var(--ref-frame-space-2)",
        }}
      >
        {message.label}
      </Text>
      <Text variant="label-l" style={{ color: "var(--sys-energy-text-primary)" }}>
        {message.title}
      </Text>
      {message.body && (
        <Text
          variant="paragraph-s"
          style={{
            color: "var(--sys-energy-text-secondary)",
            marginTop: "var(--ref-frame-space-1)",
          }}
        >
          {message.body}
        </Text>
      )}
      {(message.action || message.secondaryAction) && (
        <Inline gap={2} style={{ marginTop: "var(--ref-frame-space-3)" }}>
          {message.action && (
            <div
              style={{
                padding: "var(--ref-frame-space-1) var(--ref-frame-space-3)",
                borderRadius: "var(--ref-frame-radius-1)",
                background: "var(--sys-energy-action-primary)",
                color: "var(--sys-energy-text-inverse)",
                fontSize: "var(--ref-voice-size-4)",
                fontFamily: "var(--ref-voice-family-sans)",
                fontWeight: "var(--ref-voice-weight-medium)",
              }}
            >
              {message.action}
            </div>
          )}
          {message.secondaryAction && (
            <div
              style={{
                padding: "var(--ref-frame-space-1) var(--ref-frame-space-3)",
                borderRadius: "var(--ref-frame-radius-1)",
                border: "1px solid var(--sys-energy-border-default)",
                background: "var(--sys-energy-surface-primary)",
                color: "var(--sys-energy-text-secondary)",
                fontSize: "var(--ref-voice-size-4)",
                fontFamily: "var(--ref-voice-family-sans)",
                fontWeight: "var(--ref-voice-weight-medium)",
              }}
            >
              {message.secondaryAction}
            </div>
          )}
        </Inline>
      )}
    </div>
  );
}

// ── Main component ──
export function ToneExplorer() {
  const [activeContext, setActiveContext] = useState<ToneContext>("error");

  return (
    <Stack gap={12}>
      {/* Section 1: Message Anatomy */}
      <Stack gap={6}>
        <Text variant="display-l">Message Anatomy</Text>
        <Text variant="paragraph-l" style={{ color: "var(--sys-energy-text-secondary)" }}>
          Every message in FLOW follows a consistent structure. Each part has a specific job.
        </Text>
        <Surface
          variant="secondary"
          style={{
            padding: "var(--ref-frame-space-6)",
            borderRadius: "var(--ref-frame-radius-3)",
            border: "1px solid var(--sys-energy-border-default)",
          }}
        >
          <Stack gap={5}>
            <AnatomyRow
              label="Title"
              description="Short, actionable. 2–5 words."
              example="Transfer failed"
              color="var(--sys-energy-action-primary)"
            />
            <AnatomyRow
              label="Body"
              description="Explains what happened. 1–2 sentences. Non-technical."
              example="We couldn't send money to this account. The bank rejected the transfer."
              color="var(--sys-energy-text-accent)"
            />
            <AnatomyRow
              label="Action"
              description="Primary recovery action. Verb phrase."
              example="Try again"
              color="var(--sys-energy-status-success)"
            />
            <AnatomyRow
              label="Help text"
              description="Optional context for persistent issues."
              example="Contact support if this persists"
              color="var(--sys-energy-text-tertiary)"
            />
          </Stack>
        </Surface>
      </Stack>

      <Divider />

      {/* Section 2: Tone by Context */}
      <Stack gap={6}>
        <Text variant="display-l">Tone by Context</Text>
        <Text variant="paragraph-l" style={{ color: "var(--sys-energy-text-secondary)" }}>
          Select a context to see example messages and how tone adapts.
        </Text>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--ref-frame-space-2)" }}>
          {(Object.keys(CONTEXT_LABELS) as ToneContext[]).map((ctx) => (
            <TabButton
              key={ctx}
              label={CONTEXT_LABELS[ctx]}
              active={activeContext === ctx}
              onClick={() => setActiveContext(ctx)}
            />
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "var(--ref-frame-space-4)",
          }}
        >
          {TONE_MESSAGES[activeContext].map((msg, i) => (
            <MessageCard key={`${activeContext}-${i}`} message={msg} context={activeContext} />
          ))}
        </div>
      </Stack>

      <Divider />

      {/* Section 3: Do / Don't */}
      <Stack gap={6}>
        <Text variant="display-l">Do / Don&apos;t</Text>
        <Text variant="paragraph-l" style={{ color: "var(--sys-energy-text-secondary)" }}>
          Side-by-side comparisons of common microcopy patterns.
        </Text>
        <Stack gap={3}>
          {DO_DONT_PAIRS.map((pair, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--ref-frame-space-3)",
              }}
            >
              <div
                style={{
                  padding: "var(--ref-frame-space-4)",
                  borderRadius: "var(--ref-frame-radius-2)",
                  background: "var(--ref-energy-coral-100)",
                  border: "1px solid var(--ref-energy-coral-700)",
                }}
              >
                <Text
                  variant="label-s"
                  style={{
                    color: "var(--ref-energy-coral-700)",
                    marginBottom: "var(--ref-frame-space-2)",
                  }}
                >
                  Don&apos;t ✗
                </Text>
                <Text variant="paragraph-m" style={{ color: "var(--ref-energy-coral-700)" }}>
                  {pair.dont}
                </Text>
              </div>
              <div
                style={{
                  padding: "var(--ref-frame-space-4)",
                  borderRadius: "var(--ref-frame-radius-2)",
                  background: "var(--ref-energy-jade-100)",
                  border: "1px solid var(--ref-energy-jade-700)",
                }}
              >
                <Text
                  variant="label-s"
                  style={{
                    color: "var(--ref-energy-jade-700)",
                    marginBottom: "var(--ref-frame-space-2)",
                  }}
                >
                  Do ✓
                </Text>
                <Text variant="paragraph-m" style={{ color: "var(--ref-energy-jade-700)" }}>
                  {pair.doText}
                </Text>
              </div>
            </div>
          ))}
        </Stack>
      </Stack>

      <Divider />

      {/* Section 4: Tone Principles */}
      <Stack gap={6}>
        <Text variant="display-l">Tone Principles</Text>
        <Text variant="paragraph-l" style={{ color: "var(--sys-energy-text-secondary)" }}>
          Five rules that guide every piece of microcopy in FLOW.
        </Text>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "var(--ref-frame-space-4)",
          }}
        >
          {PRINCIPLES.map((p, i) => (
            <Surface
              key={i}
              variant="secondary"
              style={{
                padding: "var(--ref-frame-space-5)",
                borderRadius: "var(--ref-frame-radius-3)",
                border: "1px solid var(--sys-energy-border-default)",
              }}
            >
              <Stack gap={3}>
                <div
                  style={{
                    width: "var(--ref-frame-space-10)",
                    height: "var(--ref-frame-space-10)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "var(--ref-frame-radius-2)",
                    background: "var(--sys-energy-surface-accent)",
                    color: "var(--sys-energy-text-accent)",
                    fontSize: "var(--ref-voice-size-7)",
                    fontWeight: "var(--ref-voice-weight-bold)",
                  }}
                >
                  {p.icon}
                </div>
                <Text variant="label-l">{p.name}</Text>
                <Text variant="paragraph-s" style={{ color: "var(--sys-energy-text-secondary)" }}>
                  {p.description}
                </Text>
              </Stack>
            </Surface>
          ))}
        </div>
      </Stack>
    </Stack>
  );
}
