/**
 * FLOW — DocTemplate (L5 Template)
 * ────────────────────────────────
 * Shell canónico para páginas de documentación de templates.
 * Usa el mismo patrón estructural que component-detail.tsx:
 *   LayoutGrid → LayoutGrid.Item(.component-detail-surface-wrapper)
 *     → Surface(.component-detail-surface, variant="secondary", radius="surface")
 *       → Stack → PageHeader + children
 *
 * LAYER: L5 Template
 * PLATFORM: Shared
 */
import type { ReactNode } from "react";

import { Divider, Stack, Surface, Text } from "@flow/primitives";
import { Callout, CodeBlock, PAGE_GAP, PageHeader, Section, SECTION_GAP } from "../doc-primitives";
import { DemoGroup, DemoSection } from "../demo-helpers";
import { LayoutGrid } from "../layout-grid";
import { FlowButton } from "@flow/components";
import {
  DemoCell,
  FullWidthSection,
  SizesSection,
  statesGridProps,
  StatesSection,
  useDemoSize,
  VariantLevelsSection,
  VariantMatrix,
  VariantSizeMatrixSection,
} from "../../templates/component-doc-template";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DocTemplate Shell
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface DocTemplateProps {
  chapter: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}

/**
 * Shell L5 para páginas de documentación de templates.
 *
 * Aplica el mismo contenedor visual que todas las demás páginas de
 * documentación de FLOW: LayoutGrid → Surface(.component-detail-surface).
 * El Surface aporta el fondo secundario, el radio de esquinas y el padding
 * responsivo definidos en flow.css — sin ningún inline style.
 */
export function DocTemplate({ chapter, title, intro, children }: DocTemplateProps) {
  return (
    <LayoutGrid>
      <LayoutGrid.Item span={12} className="component-detail-surface-wrapper">
        <Surface variant="secondary" radius="surface" className="component-detail-surface">
          <Stack gap={PAGE_GAP}>
            <PageHeader chapter={chapter} title={title}>
              {intro}
            </PageHeader>
            {children}
          </Stack>
        </Surface>
      </LayoutGrid.Item>
    </LayoutGrid>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Example / Showcase
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const BUTTON_SIZES = ["sm", "md", "lg", "xl"] as const;
const VARIANT_LEVELS = ["primary", "secondary", "tertiary", "outlined", "ghost"] as const;

export function DocTemplateExample() {
  const demoSize = useDemoSize();

  return (
    <DocTemplate
      chapter="Layer 5 — Templates"
      title="Component Doc Template"
      intro="Helpers canónicos para documentar componentes de FLOW. Construidos y validados con FlowButton como referencia. Copia cualquier bloque para arrancar una nueva página de documentación."
    >
      {/* ── 1. useDemoSize ─────────────────────────────────────────── */}
      <Section title="useDemoSize()">
        <Stack gap={SECTION_GAP}>
          <Text variant="paragraph-m">
            Devuelve el tamaño de componente que corresponde a la densidad del viewport actual (
            <code>sm | md | lg | xl</code>). Úsalo en secciones de estados y variantes — nunca en la
            sección Sizes (que siempre muestra todos los tamaños explícitamente).
          </Text>
          <Callout>
            <Text variant="paragraph-s" color="accent">
              <strong>Tamaño actual:</strong> <code>{demoSize}</code> — cambia el viewport para ver
              cómo responde.
            </Text>
          </Callout>
          <CodeBlock language="tsx">{`const demoSize = useDemoSize();
// → "sm" | "md" | "lg" | "xl" según viewport

// ✅ Correcto — usa demoSize en states y variant levels
<FlowButton size={demoSize}>Button</FlowButton>

// ❌ Incorrecto — en Sizes siempre muestra todos explícitamente
<FlowButton size={demoSize}>Button</FlowButton>`}</CodeBlock>
        </Stack>
      </Section>

      <Divider />

      {/* ── 2. DemoCell ────────────────────────────────────────────── */}
      <Section title="DemoCell">
        <Stack gap={SECTION_GAP}>
          <Text variant="paragraph-m">
            Envuelve un componente con un label opcional debajo. Prop <code>align</code> controla la
            alineación: <code>&quot;center&quot;</code> (default) o <code>&quot;start&quot;</code>.
          </Text>

          <DemoSection title="DemoCell — ejemplos" noSurface={false}>
            <DemoGroup>
              <div className="flow-demo-cell-row">
                <DemoCell label="center (default)">
                  <FlowButton size={demoSize}>Button</FlowButton>
                </DemoCell>
                <DemoCell label="align=start" align="start">
                  <FlowButton size={demoSize} variant="outlined">
                    Button
                  </FlowButton>
                </DemoCell>
                <DemoCell>
                  <FlowButton size={demoSize} variant="ghost">
                    Sin label
                  </FlowButton>
                </DemoCell>
              </div>
            </DemoGroup>
          </DemoSection>

          <CodeBlock language="tsx">{`<DemoCell label="center (default)">
  <FlowButton size={demoSize}>Button</FlowButton>
</DemoCell>

<DemoCell label="align=start" align="start">
  <FlowButton size={demoSize} variant="outlined">Button</FlowButton>
</DemoCell>

<DemoCell>
  {/* Sin label */}
  <FlowButton size={demoSize} variant="ghost">Sin label</FlowButton>
</DemoCell>`}</CodeBlock>
        </Stack>
      </Section>

      <Divider />

      {/* ── 3. statesGridProps ─────────────────────────────────────── */}
      <Section title="statesGridProps(demoSize)">
        <Stack gap={SECTION_GAP}>
          <Text variant="paragraph-m">
            Devuelve <code>{`{ className: "flow-states-grid", "data-size": demoSize }`}</code>. Las
            clases CSS en <code>flow.css</code> aplican el <code>min-width</code> correcto según el
            tamaño, evitando overflow del texto &quot;Disabled&quot;. Sin inline styles.
          </Text>
          <Callout>
            <Text variant="paragraph-s" color="accent">
              <strong>Regla:</strong> Siempre usa <code>statesGridProps()</code> para el grid de
              estados. Nunca hardcodees <code>minWidth</code> o <code>gridTemplateColumns</code>.
            </Text>
          </Callout>

          <DemoSection title="statesGridProps — en uso" noSurface={false}>
            <DemoGroup>
              <div {...statesGridProps(demoSize)}>
                <DemoCell label="Default">
                  <FlowButton size={demoSize}>Button</FlowButton>
                </DemoCell>
                <DemoCell label="Hover">
                  <FlowButton size={demoSize} data-demo-state="hover">
                    Button
                  </FlowButton>
                </DemoCell>
                <DemoCell label="Focus">
                  <FlowButton size={demoSize} data-demo-state="focus-visible">
                    Button
                  </FlowButton>
                </DemoCell>
                <DemoCell label="Disabled">
                  <FlowButton size={demoSize} disabled>
                    Button
                  </FlowButton>
                </DemoCell>
              </div>
            </DemoGroup>
          </DemoSection>

          <CodeBlock language="tsx">{`const demoSize = useDemoSize();

<div {...statesGridProps(demoSize)}>
  <DemoCell label="Default">
    <FlowButton size={demoSize}>Button</FlowButton>
  </DemoCell>
  <DemoCell label="Hover">
    <FlowButton size={demoSize} data-demo-state="hover">Button</FlowButton>
  </DemoCell>
  <DemoCell label="Disabled">
    <FlowButton size={demoSize} disabled>Button</FlowButton>
  </DemoCell>
</div>`}</CodeBlock>
        </Stack>
      </Section>

      <Divider />

      {/* ── 4. SizesSection ────────────────────────────────────────── */}
      <Section title="SizesSection">
        <Stack gap={SECTION_GAP}>
          <Text variant="paragraph-m">
            Siempre muestra <strong>todos</strong> los tamaños explícitamente — nunca usa{" "}
            <code>useDemoSize()</code>. Layout: <code>span{"{3}"}</code> × 4 para cuatro tamaños.
            Cada tamaño en un <code>DemoCell</code> con label.
          </Text>

          <SizesSection
            sizes={BUTTON_SIZES}
            render={(size) => (
              <FlowButton size={size as "sm" | "md" | "lg" | "xl"}>Button</FlowButton>
            )}
          />

          <CodeBlock language="tsx">{`<SizesSection
  sizes={["sm", "md", "lg", "xl"]}
  render={(size) => (
    <FlowButton size={size}>Button</FlowButton>
  )}
/>`}</CodeBlock>
        </Stack>
      </Section>

      <Divider />

      {/* ── 5. StatesSection ───────────────────────────────────────── */}
      <Section title="StatesSection">
        <Stack gap={SECTION_GAP}>
          <Text variant="paragraph-m">
            Muestra el componente al tamaño responsive (<code>useDemoSize()</code>). Usa{" "}
            <code>statesGridProps</code> internamente. Los estados estándar son: default, hover,
            focus-visible, pressed, disabled, loading.
          </Text>

          <StatesSection
            states={[
              { label: "Default", render: (s) => <FlowButton size={s}>Button</FlowButton> },
              {
                label: "Hover",
                render: (s) => (
                  <FlowButton size={s} data-demo-state="hover">
                    Button
                  </FlowButton>
                ),
              },
              {
                label: "Focus",
                render: (s) => (
                  <FlowButton size={s} data-demo-state="focus-visible">
                    Button
                  </FlowButton>
                ),
              },
              {
                label: "Pressed",
                render: (s) => (
                  <FlowButton size={s} data-demo-state="pressed">
                    Button
                  </FlowButton>
                ),
              },
              {
                label: "Disabled",
                render: (s) => (
                  <FlowButton size={s} disabled>
                    Button
                  </FlowButton>
                ),
              },
              {
                label: "Loading",
                render: (s) => (
                  <FlowButton size={s} loading>
                    Button
                  </FlowButton>
                ),
              },
            ]}
          />

          <CodeBlock language="tsx">{`<StatesSection
  states={[
    { label: "Default",  render: (s) => <FlowButton size={s}>Button</FlowButton> },
    { label: "Hover",    render: (s) => <FlowButton size={s} data-demo-state="hover">Button</FlowButton> },
    { label: "Focus",    render: (s) => <FlowButton size={s} data-demo-state="focus-visible">Button</FlowButton> },
    { label: "Pressed",  render: (s) => <FlowButton size={s} data-demo-state="pressed">Button</FlowButton> },
    { label: "Disabled", render: (s) => <FlowButton size={s} disabled>Button</FlowButton> },
    { label: "Loading",  render: (s) => <FlowButton size={s} loading>Button</FlowButton> },
  ]}
/>`}</CodeBlock>
        </Stack>
      </Section>

      <Divider />

      {/* ── 6. VariantLevelsSection ─────────────────────────────── */}
      <Section title="VariantLevelsSection">
        <Stack gap={SECTION_GAP}>
          <Text variant="paragraph-m">
            Muestra los 7 niveles de variante al tamaño responsive. Layout: <code>span</code> × 7.
            Nunca muestra todos los tamaños — solo el tamaño del viewport actual.
          </Text>

          <VariantLevelsSection
            variantLevels={VARIANT_LEVELS}
            render={(variant, size) => (
              <FlowButton
                variant={variant as "primary" | "secondary" | "tertiary" | "outlined" | "ghost"}
                size={size as "sm" | "md" | "lg" | "xl"}
              >
                Button
              </FlowButton>
            )}
          />

          <CodeBlock language="tsx">{`<VariantLevelsSection
  variantLevels={["primary", "secondary", "tertiary", "outlined", "ghost"]}
  render={(variant, size) => (
    <FlowButton variant={variant} size={size}>Button</FlowButton>
  )}
/>`}</CodeBlock>
        </Stack>
      </Section>

      <Divider />

      {/* ── 7. VariantSizeMatrixSection ───────────────────────────── */}
      <Section title="VariantSizeMatrixSection">
        <Stack gap={SECTION_GAP}>
          <Text variant="paragraph-m">
            Matriz completa de variante × tamaño. Siempre muestra todas las combinaciones.
            Responsive: en mobile oculta columnas intermedias para evitar overflow horizontal.
          </Text>

          <VariantSizeMatrixSection
            sizes={BUTTON_SIZES}
            variantLevels={VARIANT_LEVELS}
            render={(variant, size) => (
              <FlowButton
                variant={variant as "primary" | "secondary" | "tertiary" | "outlined" | "ghost"}
                size={size as "sm" | "md" | "lg" | "xl"}
              >
                {size.toUpperCase()}
              </FlowButton>
            )}
          />

          <CodeBlock language="tsx">{`<VariantSizeMatrixSection
  sizes={["sm", "md", "lg", "xl"]}
  variantLevels={["primary", "secondary", "tertiary", "outlined", "ghost"]}
  render={(variant, size) => (
    <FlowButton variant={variant} size={size}>
      {size.toUpperCase()}
    </FlowButton>
  )}
/>`}</CodeBlock>
        </Stack>
      </Section>

      <Divider />

      {/* ── 8. VariantMatrix (primitivo) ──────────────────────────── */}
      <Section title="VariantMatrix (helper bajo nivel)">
        <Stack gap={SECTION_GAP}>
          <Text variant="paragraph-m">
            El grid CSS que usa <code>VariantSizeMatrixSection</code> internamente. Úsalo
            directamente cuando necesites una matriz custom sin el wrapper de{" "}
            <code>DemoSection</code>.
          </Text>

          <DemoSection title="VariantMatrix — directo" noSurface={false}>
            <DemoGroup>
              <VariantMatrix sizes={BUTTON_SIZES} variantLevels={VARIANT_LEVELS}>
                {(variant, size) => (
                  <FlowButton
                    variant={variant as "primary" | "secondary" | "tertiary" | "outlined" | "ghost"}
                    size={size as "sm" | "md" | "lg" | "xl"}
                  >
                    {size}
                  </FlowButton>
                )}
              </VariantMatrix>
            </DemoGroup>
          </DemoSection>

          <CodeBlock language="tsx">{`<VariantMatrix
  sizes={["sm", "md", "lg", "xl"]}
  variantLevels={["primary", "secondary", "tertiary", "outlined", "ghost"]}
>
  {(variant, size) => (
    <FlowButton variant={variant} size={size}>{size}</FlowButton>
  )}
</VariantMatrix>`}</CodeBlock>
        </Stack>
      </Section>

      <Divider />

      {/* ── 9. FullWidthSection ────────────────────────────────────── */}
      <Section title="FullWidthSection">
        <Stack gap={SECTION_GAP}>
          <Text variant="paragraph-m">
            Sección de tres subsecciones: sin <code>fullWidth</code>, con <code>fullWidth</code> en
            todos los variantes, y contenedores responsive (12 / 8 / 6 / 4 columnas). Usa overlines
            como separadores narrativos.
          </Text>

          <FullWidthSection
            variantLevels={VARIANT_LEVELS}
            renderNormal={(variant) => (
              <FlowButton
                variant={variant as "primary" | "secondary" | "tertiary" | "outlined" | "ghost"}
              >
                Button
              </FlowButton>
            )}
            renderFullWidth={(variant) => (
              <FlowButton
                fullWidth
                variant={variant as "primary" | "secondary" | "tertiary" | "outlined" | "ghost"}
              >
                Button
              </FlowButton>
            )}
            renderResponsive={(variant, span) => (
              <FlowButton
                fullWidth
                variant={variant as "primary" | "secondary" | "tertiary" | "outlined" | "ghost"}
              >
                span {span}
              </FlowButton>
            )}
          />

          <CodeBlock language="tsx">{`<FullWidthSection
  variantLevels={["primary", "secondary", "tertiary", "outlined", "ghost"]}
  renderNormal={(variant) => (
    <FlowButton variant={variant}>Button</FlowButton>
  )}
  renderFullWidth={(variant) => (
    <FlowButton fullWidth variant={variant}>Button</FlowButton>
  )}
  renderResponsive={(variant, span) => (
    <FlowButton fullWidth variant={variant}>span {span}</FlowButton>
  )}
/>`}</CodeBlock>
        </Stack>
      </Section>

      <Divider />

      {/* ── Reglas de uso ──────────────────────────────────────────── */}
      <Section title="Reglas de uso">
        <Stack gap={SECTION_GAP}>
          <Callout>
            <Stack gap={2}>
              <Text variant="paragraph-s" color="accent">
                <strong>✅ useDemoSize()</strong> — solo en States y VariantLevels. Nunca en Sizes.
              </Text>
              <Text variant="paragraph-s" color="accent">
                <strong>✅ statesGridProps()</strong> — siempre para el grid de estados. Nunca{" "}
                <code>statesGridStyle()</code> (deprecated).
              </Text>
              <Text variant="paragraph-s" color="accent">
                <strong>✅ SizesSection</strong> — siempre muestra todos los tamaños. Nunca filtra
                por viewport.
              </Text>
              <Text variant="paragraph-s" color="accent">
                <strong>✅ VariantSizeMatrixSection</strong> — siempre todas las combinaciones.
                Responsive hiding lo maneja <code>VariantMatrix</code> internamente.
              </Text>
              <Text variant="paragraph-s" color="accent">
                <strong>❌ Inline styles</strong> — prohibidos. Todo debe ir a través de clases CSS
                con tokens <code>--sys-*</code> y <code>--ref-*</code>.
              </Text>
            </Stack>
          </Callout>
        </Stack>
      </Section>
    </DocTemplate>
  );
}
