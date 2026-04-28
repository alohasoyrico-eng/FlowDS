/**
 * FLOW Design System — ComponentSpecAccordion (Layer 4 Pattern)
 * ─────────────────────────────────────────────────────────────
 * Behavioral orchestration pattern for expandable component specifications.
 * Eliminates the ~180 lines of duplicated accordion+layout code across
 * 4 component pages (core, mobile, desktop, adaptive).
 *
 * Owns: expand/collapse state, keyboard navigation, consistent spec layout.
 * Does NOT own: colors, spacing, typography (delegated to L2/L3 primitives).
 */
import { type ReactNode, useState } from "react";

import {
  ActionSurface,
  FlowIcon,
  Grid,
  Inline,
  MotionContainer,
  Stack,
  Surface,
  Text,
} from "@flow/primitives";
import { FlowChip } from "@flow/components";

// ── Shared data interface ──

export interface ComponentSpec {
  name: string;
  purpose: string;
  anatomy?: string[];
  variants?: string[];
  /** For adaptive components with platform-split variants */
  variantsByPlatform?: { shared: string[]; desktop: string[]; mobile: string[] };
  states?: string[];
  statePrecedence?: string;
  tokens?: string[];
  foundations?: string[];
  accessibility?: string[];
  tone?: string;
  growth?: string;
  platformNotes?: string;
  /** For adaptive components with per-platform behavior */
  platformBehavior?: { desktop: string; mobile: string };
  /** Arbitrary extra content rendered at the bottom of the expanded area */
  extra?: ReactNode;
}

// ── Props ──

interface ComponentSpecAccordionProps {
  items: ComponentSpec[];
  /** Badge shown in accordion header — "index" (01, 02…), or a fixed label */
  badge?: "index" | string;
  /** Accent color for accordion border when expanded */
  accentColor?: string;
  /** Layout style for the expanded detail. "full" shows all sections, "compact" merges some grids */
  layout?: "full" | "compact";
}

// ── Component ──

export function ComponentSpecAccordion({
  items,
  badge = "index",
  accentColor = "var(--sys-energy-border-default)",
  layout = "full",
}: ComponentSpecAccordionProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <>
      {items.map((c, idx) => {
        const isOpen = expanded === c.name;
        return (
          <Stack key={c.name} gap={0}>
            {/* ── Trigger ── */}
            <ActionSurface
              onPress={() => setExpanded(isOpen ? null : c.name)}
              aria-label={`${isOpen ? "Collapse" : "Expand"} ${c.name}`}
              aria-expanded={isOpen}
              style={{
                background: "var(--sys-energy-surface-primary)",
                border: `1px solid ${accentColor}`,
                borderRadius: isOpen
                  ? "var(--ref-frame-radius-2) var(--ref-frame-radius-2) 0 0"
                  : "var(--ref-frame-radius-2)",
                padding: "var(--ref-frame-space-4) var(--ref-frame-space-5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Inline gap={3}>
                {badge === "index" ? (
                  <Text
                    variant="caption"
                    color="tertiary"
                    style={{ minWidth: "var(--ref-frame-doc-col-num)" }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </Text>
                ) : (
                  <FlowChip variant="filled" status="info">
                    {badge}
                  </FlowChip>
                )}
                <Text variant="heading-m">{c.name}</Text>
              </Inline>
              <FlowIcon
                name="chevron-down"
                size="sm"
                color="var(--sys-energy-text-tertiary)"
                style={{
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform var(--sys-momentum-transition-default)",
                }}
              />
            </ActionSurface>

            {/* ── Expanded detail ── */}
            <MotionContainer visible={isOpen}>
              <Surface
                radius="none"
                padding="container"
                style={{
                  borderLeft: `1px solid ${accentColor}`,
                  borderRight: `1px solid ${accentColor}`,
                  borderBottom: `1px solid ${accentColor}`,
                  borderRadius: "0 0 var(--ref-frame-radius-2) var(--ref-frame-radius-2)",
                  borderTop: "none",
                }}
              >
                <Stack gap="component">
                  {/* Purpose */}
                  <Text>{c.purpose}</Text>

                  {/* Anatomy */}
                  {c.anatomy && c.anatomy.length > 0 && (
                    <Stack gap={2}>
                      <Text variant="overline">Anatomy</Text>
                      <Inline gap={2} wrap>
                        {c.anatomy.map((a, i) => (
                          <FlowChip key={i}>{a}</FlowChip>
                        ))}
                      </Inline>
                    </Stack>
                  )}

                  {/* Variants — flat list */}
                  {c.variants && c.variants.length > 0 && (
                    <Stack gap={2}>
                      <Text variant="overline">Variants</Text>
                      <ul style={{ margin: 0, padding: "0 0 0 var(--ref-frame-space-4)" }}>
                        {c.variants.map((v, i) => (
                          <li key={i}>
                            <Text variant="paragraph-s" as="span">
                              {v}
                            </Text>
                          </li>
                        ))}
                      </ul>
                    </Stack>
                  )}

                  {/* Variants — by platform (adaptive) */}
                  {c.variantsByPlatform && (
                    <Stack gap={2}>
                      <Text variant="overline">Variants</Text>
                      <Grid columns={3} gap={3}>
                        {(["shared", "desktop", "mobile"] as const).map((p) => (
                          <Surface key={p} padding="control">
                            <Stack gap={2}>
                              <Text
                                variant="caption"
                                color={p === "shared" ? "success" : undefined}
                              >
                                {p.charAt(0).toUpperCase() + p.slice(1)}
                              </Text>
                              <ul style={{ margin: 0, padding: "0 0 0 var(--ref-frame-space-4)" }}>
                                {c.variantsByPlatform![p].map((v, i) => (
                                  <li key={i}>
                                    <Text variant="paragraph-s" as="span">
                                      {v}
                                    </Text>
                                  </li>
                                ))}
                              </ul>
                            </Stack>
                          </Surface>
                        ))}
                      </Grid>
                    </Stack>
                  )}

                  {/* States + Precedence / Tokens block */}
                  {layout === "full" && c.states && c.statePrecedence && (
                    <Grid columns={2} gap={3}>
                      <Surface padding="control">
                        <Stack gap={2}>
                          <Text variant="overline">States Supported</Text>
                          <Inline gap={1} wrap>
                            {c.states.map((s) => (
                              <FlowChip key={s}>{s}</FlowChip>
                            ))}
                          </Inline>
                        </Stack>
                      </Surface>
                      <Surface padding="control">
                        <Stack gap={2}>
                          <Text variant="overline">State Precedence</Text>
                          <Text
                            variant="paragraph-s"
                            style={{ lineHeight: "var(--ref-voice-line-height-loose)" }}
                          >
                            {c.statePrecedence}
                          </Text>
                        </Stack>
                      </Surface>
                    </Grid>
                  )}

                  {/* States + Tokens (compact: mobile/adaptive) */}
                  {layout === "compact" && c.states && (
                    <Grid columns={2} gap={3}>
                      <Surface padding="control">
                        <Stack gap={2}>
                          <Text variant="overline">States</Text>
                          <Inline gap={1} wrap>
                            {c.states.map((s) => (
                              <FlowChip key={s}>{s}</FlowChip>
                            ))}
                          </Inline>
                        </Stack>
                      </Surface>
                      {c.tokens && (
                        <Surface padding="control">
                          <Stack gap={2}>
                            <Text variant="overline">Tokens</Text>
                            <Inline gap={1} wrap>
                              {c.tokens.map((t) => (
                                <Text key={t} variant="code">
                                  {t}
                                </Text>
                              ))}
                            </Inline>
                          </Stack>
                        </Surface>
                      )}
                    </Grid>
                  )}

                  {/* States standalone (desktop, when no precedence is paired) */}
                  {layout === "full" && c.states && !c.statePrecedence && (
                    <Stack gap={2}>
                      <Text variant="overline">States</Text>
                      <Inline gap={1} wrap>
                        {c.states.map((s) => (
                          <FlowChip key={s}>{s}</FlowChip>
                        ))}
                      </Inline>
                    </Stack>
                  )}

                  {/* State Precedence standalone (desktop layout) */}
                  {layout === "full" && c.statePrecedence && !c.states?.length && (
                    <Surface padding="control" className="flow-doc-accent">
                      <Stack gap={2}>
                        <Text variant="overline" color="accent">
                          State Precedence
                        </Text>
                        <Text variant="paragraph-s">{c.statePrecedence}</Text>
                      </Stack>
                    </Surface>
                  )}

                  {/* Tokens + Foundations (full layout: core) */}
                  {layout === "full" && c.tokens && c.foundations && (
                    <Grid columns={2} gap={3}>
                      <Surface padding="control">
                        <Stack gap={2}>
                          <Text variant="overline">Tokens Consumed</Text>
                          <Inline gap={1} wrap>
                            {c.tokens.map((t) => (
                              <Text key={t} variant="code">
                                {t}
                              </Text>
                            ))}
                          </Inline>
                        </Stack>
                      </Surface>
                      <Surface padding="control">
                        <Stack gap={2}>
                          <Text variant="overline">Foundations Involved</Text>
                          <Inline gap={1} wrap>
                            {c.foundations.map((f) => (
                              <FlowChip key={f} variant="filled" status="info">
                                {f}
                              </FlowChip>
                            ))}
                          </Inline>
                        </Stack>
                      </Surface>
                    </Grid>
                  )}

                  {/* Tokens + Accessibility (desktop layout — no foundations shown) */}
                  {layout === "full" && c.tokens && !c.foundations && c.accessibility && (
                    <Grid columns={2} gap={3}>
                      <Surface padding="control">
                        <Stack gap={2}>
                          <Text variant="overline">Tokens Consumed</Text>
                          <Inline gap={1} wrap>
                            {c.tokens.map((t) => (
                              <Text key={t} variant="code">
                                {t}
                              </Text>
                            ))}
                          </Inline>
                        </Stack>
                      </Surface>
                      <Surface padding="control">
                        <Stack gap={2}>
                          <Text variant="overline">Accessibility</Text>
                          <ul style={{ margin: 0, padding: "0 0 0 var(--ref-frame-space-4)" }}>
                            {c.accessibility.map((a, i) => (
                              <li key={i}>
                                <Text variant="paragraph-s" as="span">
                                  {a}
                                </Text>
                              </li>
                            ))}
                          </ul>
                        </Stack>
                      </Surface>
                    </Grid>
                  )}

                  {/* Accessibility standalone (when not paired above) */}
                  {c.accessibility &&
                    c.accessibility.length > 0 &&
                    (layout !== "full" || c.foundations) && (
                      <Surface padding="control">
                        <Stack gap={2}>
                          <Text variant="overline">Accessibility</Text>
                          <ul style={{ margin: 0, padding: "0 0 0 var(--ref-frame-space-4)" }}>
                            {c.accessibility.map((a, i) => (
                              <li key={i}>
                                <Text variant="paragraph-s" as="span">
                                  {a}
                                </Text>
                              </li>
                            ))}
                          </ul>
                        </Stack>
                      </Surface>
                    )}

                  {/* Tone + Growth + Platform (3-col for desktop, 2-col for others) */}
                  {c.tone && c.growth && c.platformNotes && (
                    <Grid columns={3} gap={3}>
                      <Surface
                        padding="control"
                        className="flow-doc-accent flow-doc-accent--warning"
                      >
                        <Stack gap={2}>
                          <Text variant="overline">Tone</Text>
                          <Text variant="paragraph-s">{c.tone}</Text>
                        </Stack>
                      </Surface>
                      <Surface
                        padding="control"
                        className="flow-doc-accent flow-doc-accent--success"
                      >
                        <Stack gap={2}>
                          <Text variant="overline">Growth</Text>
                          <Text variant="paragraph-s">{c.growth}</Text>
                        </Stack>
                      </Surface>
                      <Surface padding="control" className="flow-doc-accent">
                        <Stack gap={2}>
                          <Text variant="overline" color="accent">
                            Platform Notes
                          </Text>
                          <Text variant="paragraph-s" color="accent">
                            {c.platformNotes}
                          </Text>
                        </Stack>
                      </Surface>
                    </Grid>
                  )}

                  {/* Tone + Growth only (no platform notes → 2-col) */}
                  {c.tone && c.growth && !c.platformNotes && (
                    <Grid columns={2} gap={3}>
                      <Surface
                        padding="control"
                        className="flow-doc-accent flow-doc-accent--warning"
                      >
                        <Stack gap={2}>
                          <Text variant="overline">Tone</Text>
                          <Text variant="paragraph-s">{c.tone}</Text>
                        </Stack>
                      </Surface>
                      <Surface padding="control" className="flow-doc-accent">
                        <Stack gap={2}>
                          <Text variant="overline">Growth</Text>
                          <Text variant="paragraph-s">{c.growth}</Text>
                        </Stack>
                      </Surface>
                    </Grid>
                  )}

                  {/* Platform Notes standalone (when not combined with tone/growth) */}
                  {c.platformNotes && !c.tone && (
                    <Surface padding="control" className="flow-doc-accent">
                      <Stack gap={2}>
                        <Text variant="overline" color="accent">
                          Platform Notes
                        </Text>
                        <Text variant="paragraph-s" color="accent">
                          {c.platformNotes}
                        </Text>
                      </Stack>
                    </Surface>
                  )}

                  {/* Platform Behavior split (adaptive) */}
                  {c.platformBehavior && (
                    <Stack gap={2}>
                      <Text variant="overline">Platform Behavior</Text>
                      <Grid columns={2} gap={3}>
                        <Surface padding="control">
                          <Stack gap={2}>
                            <Text variant="overline">Desktop Behavior</Text>
                            <Text variant="paragraph-s">{c.platformBehavior.desktop}</Text>
                          </Stack>
                        </Surface>
                        <Surface padding="control" className="flow-doc-accent">
                          <Stack gap={2}>
                            <Text variant="overline">Mobile Behavior</Text>
                            <Text variant="paragraph-s">{c.platformBehavior.mobile}</Text>
                          </Stack>
                        </Surface>
                      </Grid>
                    </Stack>
                  )}

                  {/* Extra content */}
                  {c.extra}
                </Stack>
              </Surface>
            </MotionContainer>
          </Stack>
        );
      })}
    </>
  );
}
