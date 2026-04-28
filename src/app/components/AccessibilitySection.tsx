/** FLOW — AccessibilitySection: Shared renderer for component/pattern a11y docs */
import type { AccessibilitySpec } from "../pages/registry/types";
import { Stack, Surface, Text } from "@flow/design-system";

// ── WCAG 2.1 success criteria lookup ──

const WCAG_MAP: Record<string, { title: string; slug: string }> = {
  "1.1.1": { title: "Non-text Content", slug: "non-text-content" },
  "1.3.1": { title: "Info and Relationships", slug: "info-and-relationships" },
  "1.4.1": { title: "Use of Color", slug: "use-of-color" },
  "1.4.3": { title: "Contrast (Minimum)", slug: "contrast-minimum" },
  "2.1.1": { title: "Keyboard", slug: "keyboard" },
  "2.1.2": { title: "No Keyboard Trap", slug: "no-keyboard-trap" },
  "2.4.3": { title: "Focus Order", slug: "focus-order" },
  "2.4.6": { title: "Headings and Labels", slug: "headings-and-labels" },
  "2.4.7": { title: "Focus Visible", slug: "focus-visible" },
  "3.2.1": { title: "On Focus", slug: "on-focus" },
  "3.2.2": { title: "On Input", slug: "on-input" },
  "3.3.1": { title: "Error Identification", slug: "error-identification" },
  "3.3.2": { title: "Labels or Instructions", slug: "labels-or-instructions" },
  "4.1.2": { title: "Name, Role, Value", slug: "name-role-value" },
  "4.1.3": { title: "Status Messages", slug: "status-messages" },
};

const WCAG_BASE = "https://www.w3.org/WAI/WCAG21/Understanding/";

export interface AccessibilitySectionProps {
  spec: AccessibilitySpec;
}

export function AccessibilitySection({ spec }: AccessibilitySectionProps) {
  const hasHandled = spec.handled && spec.handled.length > 0;
  const hasRequired = spec.required && spec.required.length > 0;
  const hasKeyboard = spec.keyboard && spec.keyboard.length > 0;
  const hasWcag = spec.wcag && spec.wcag.length > 0;

  return (
    <div className="flow-a11y-grid">
      {/* ── Handled by FLOW ── */}
      {hasHandled && (
        <Surface variant="primary" radius="surface" className="flow-a11y-card">
          <div className="flow-a11y-card-inner">
            <Stack gap="component">
              <Text variant="label-m">Handled by FLOW</Text>
              <Stack gap="component" as="ul" className="flow-a11y-list">
                {spec.handled.map((item, i) => (
                  <li key={i}>
                    <span className="flow-a11y-icon" data-intent="handled" aria-hidden="true">
                      ✓
                    </span>
                    <Text variant="paragraph-m" color="secondary" className="flow-text-pretty">
                      {item}
                    </Text>
                  </li>
                ))}
              </Stack>
            </Stack>
          </div>
        </Surface>
      )}

      {/* ── Required from Consumer ── */}
      {hasRequired && (
        <Surface variant="primary" radius="surface" className="flow-a11y-card">
          <div className="flow-a11y-card-inner">
            <Stack gap="component">
              <Text variant="label-m">Required from Consumer</Text>
              <Stack gap="component" as="ul" className="flow-a11y-list">
                {spec.required!.map((item, i) => (
                  <li key={i}>
                    <span className="flow-a11y-icon" data-intent="required" aria-hidden="true">
                      !
                    </span>
                    <Text variant="paragraph-m" color="secondary" className="flow-text-pretty">
                      {item}
                    </Text>
                  </li>
                ))}
              </Stack>
            </Stack>
          </div>
        </Surface>
      )}

      {/* ── Keyboard Navigation ── */}
      {hasKeyboard && (
        <Surface variant="primary" radius="surface" className="flow-a11y-card">
          <div className="flow-a11y-card-inner">
            <Stack gap="component">
              <Text variant="label-m">Keyboard Navigation</Text>
              <table className="flow-a11y-kbd-table">
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {spec.keyboard!.map((item, i) => (
                    <tr key={i}>
                      <td>
                        <kbd className="flow-kbd">{item.key}</kbd>
                      </td>
                      <td>
                        <Text as="span" variant="paragraph-m" color="secondary">
                          {item.action}
                        </Text>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Stack>
          </div>
        </Surface>
      )}

      {/* ── WCAG References ── */}
      {hasWcag && (
        <div className="flow-a11y-wcag-list">
          <Text as="span" variant="caption" color="tertiary">
            WCAG 2.1:
          </Text>
          {spec.wcag!.map((id) => {
            const entry = WCAG_MAP[id];
            if (!entry) return null;
            return (
              <a
                key={id}
                className="flow-a11y-wcag-link"
                href={`${WCAG_BASE}${entry.slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {id} {entry.title}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
