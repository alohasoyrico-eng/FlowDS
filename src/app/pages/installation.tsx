import { FlowTabs, Grid, Inline, Stack, Surface, Text } from "@flow/design-system";
import { FlowIcon } from "@flow/primitives";
import { Callout, CodeBlock, PAGE_GAP, PageHeader, Section } from "../components/doc-primitives";
import { LayoutGrid } from "../components/layout-grid";

export function InstallationPage() {
  return (
    <LayoutGrid>
      <LayoutGrid.Item span={12} className="component-detail-surface-wrapper">
        <Surface variant="secondary" radius="surface" className="component-detail-surface">
          <Stack gap={PAGE_GAP}>
            <PageHeader chapter="Get Started" title="Installation">
              Set up Flow in your project. Flow ships as a multi-platform design system with React
              and Flutter implementations sharing the same token architecture.
            </PageHeader>

            {/* ── Requirements ── */}
            <Section title="Requirements">
              <Grid minItemWidth="280px" gap={4}>
                <Surface padding="surface">
                  <Stack gap={3}>
                    <Inline gap={2} align="center">
                      <FlowIcon name="code" size="sm" color="accent" />
                      <Text variant="label-l">React (Web)</Text>
                    </Inline>
                    <Stack gap={1}>
                      <Text variant="paragraph-s">Node.js &ge; 18</Text>
                      <Text variant="paragraph-s">npm &ge; 9</Text>
                      <Text variant="paragraph-s">React 18 or 19</Text>
                      <Text variant="paragraph-s">TypeScript 5.x (recommended)</Text>
                    </Stack>
                  </Stack>
                </Surface>
                <Surface padding="surface">
                  <Stack gap={3}>
                    <Inline gap={2} align="center">
                      <FlowIcon name="smartphone" size="sm" color="accent" />
                      <Text variant="label-l">Flutter (Mobile)</Text>
                    </Inline>
                    <Stack gap={1}>
                      <Text variant="paragraph-s">Flutter &ge; 3.0</Text>
                      <Text variant="paragraph-s">Dart &ge; 3.0</Text>
                    </Stack>
                  </Stack>
                </Surface>
              </Grid>
            </Section>

            {/* ── Setup ── */}
            <Section title="Setup">
              <FlowTabs
                defaultActiveKey="react"
                tabs={[
                  {
                    key: "react",
                    label: "React",
                    icon: "code",
                    content: (
                      <Stack gap={4}>
                        <Section title="1. Install the package" headingRole="heading-xl">
                          <CodeBlock title="npm">{`npm install @flow/design-system`}</CodeBlock>
                        </Section>

                        <Section title="2. Import styles" headingRole="heading-xl">
                          <CodeBlock title="App entry (e.g. main.tsx)">{`import "@flow/design-system/styles";`}</CodeBlock>
                          <Text variant="paragraph-s" color="secondary">
                            This single import loads the full token cascade (ref &rarr; sys &rarr;
                            comp) plus all component styles.
                          </Text>
                        </Section>

                        <Section title="3. Wrap your app" headingRole="heading-xl">
                          <CodeBlock title="App.tsx">{`import { FlowThemeProvider } from "@flow/design-system";

export default function App() {
  return (
    <FlowThemeProvider>
      <div data-theme="light">
        {/* Your app content */}
      </div>
    </FlowThemeProvider>
  );
}`}</CodeBlock>
                          <Callout title="Theme attribute">
                            <Text variant="paragraph-s">
                              Add <code>data-theme=&quot;light&quot;</code> or{" "}
                              <code>data-theme=&quot;dark&quot;</code> to your root element. All
                              tokens resolve through CSS custom properties &mdash; no JS needed at
                              render time.
                            </Text>
                          </Callout>
                        </Section>

                        <Section title="4. Use a component" headingRole="heading-xl">
                          <CodeBlock title="Example">{`import { FlowButton, FlowTextInput, Stack } from "@flow/design-system";

function LoginForm() {
  return (
    <Stack gap="component">
      <FlowTextInput label="Email" type="email" />
      <FlowTextInput label="Password" type="password" />
      <FlowButton variant="primary" fullWidth>
        Sign In
      </FlowButton>
    </Stack>
  );
}`}</CodeBlock>
                        </Section>
                      </Stack>
                    ),
                  },
                  {
                    key: "flutter",
                    label: "Flutter",
                    icon: "smartphone",
                    content: (
                      <Stack gap={4}>
                        <Section title="1. Add the dependency" headingRole="heading-xl">
                          <CodeBlock title="pubspec.yaml">{`dependencies:
  flow_ds:
    path: flutter/flow_ds  # or git reference`}</CodeBlock>
                        </Section>

                        <Section title="2. Import and use" headingRole="heading-xl">
                          <CodeBlock title="main.dart">{`import 'package:flow_ds/flow_ds.dart';

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return FlowApp(
      theme: FlowTheme.light(),
      home: const LoginScreen(),
    );
  }
}`}</CodeBlock>
                        </Section>

                        <Section title="3. Use a component" headingRole="heading-xl">
                          <CodeBlock title="login_screen.dart">{`import 'package:flow_ds/flow_ds.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return FlowStack(
      gap: FlowSpacing.component,
      children: [
        FlowTextInput(label: 'Email'),
        FlowTextInput(label: 'Password', obscureText: true),
        FlowButton(
          onPressed: () => print('Sign in'),
          child: Text('Sign In'),
        ),
      ],
    );
  }
}`}</CodeBlock>
                        </Section>
                      </Stack>
                    ),
                  },
                ]}
              />
            </Section>

            {/* ── Density ── */}
            <Section
              title="Density"
              description="Flow components are density-aware. Wrap any subtree with FlowDensityProvider to scale all components within it."
            >
              <CodeBlock title="Density example">{`import { FlowDensityProvider, FlowButton, Stack } from "@flow/design-system";

// Compact density — tighter spacing and smaller controls
<FlowDensityProvider density="compact">
  <Stack gap="component">
    <FlowButton>Compact Button</FlowButton>
  </Stack>
</FlowDensityProvider>

// Comfortable density — more spacious layout
<FlowDensityProvider density="comfortable">
  <Stack gap="component">
    <FlowButton>Comfortable Button</FlowButton>
  </Stack>
</FlowDensityProvider>`}</CodeBlock>
              <Callout>
                <Text variant="paragraph-s">
                  Semantic spacing tokens like <code>gap=&quot;component&quot;</code> resolve to
                  20px at default density, 16px at compact, and 24px at comfortable &mdash;
                  automatically.
                </Text>
              </Callout>
            </Section>

            {/* ── Tree-shaking ── */}
            <Section
              title="Tree-shaking & Sub-packages"
              description="Flow supports both a single entry point and granular sub-package imports."
            >
              <Grid minItemWidth="280px" gap={4}>
                <Surface padding="surface">
                  <Stack gap={2}>
                    <Text variant="label-l">Full package</Text>
                    <CodeBlock>{`import { FlowButton, FlowCard } from "@flow/design-system";`}</CodeBlock>
                    <Text variant="paragraph-s" color="secondary">
                      Tree-shaken by default. Unused components are excluded from your bundle.
                    </Text>
                  </Stack>
                </Surface>
                <Surface padding="surface">
                  <Stack gap={2}>
                    <Text variant="label-l">Sub-packages</Text>
                    <CodeBlock>{`import { FlowButton } from "@flow/components";
import { Stack, Surface } from "@flow/primitives";
import { FlowSearch } from "@flow/patterns";`}</CodeBlock>
                    <Text variant="paragraph-s" color="secondary">
                      Import from individual packages for maximum control over dependencies.
                    </Text>
                  </Stack>
                </Surface>
              </Grid>
            </Section>

            {/* ── TypeScript ── */}
            <Section title="TypeScript">
              <Callout intent="success" title="Zero config">
                <Text variant="paragraph-s">
                  Type declarations are included with every Flow package. No{" "}
                  <code>@types/*</code> installation needed. All component props, token types, and
                  utility types are exported from the package entry point.
                </Text>
              </Callout>
            </Section>

            {/* ── Token usage ── */}
            <Section
              title="Using Tokens"
              description="Flow uses a strict three-tier token chain: ref → sys → comp. Never use ref tokens directly in components."
            >
              <Grid minItemWidth="280px" gap={4}>
                <Surface padding="surface" className="flow-callout" data-intent="danger">
                  <Stack gap={2}>
                    <Text variant="label-l" color="danger">
                      Don&apos;t
                    </Text>
                    <CodeBlock>{`/* Hardcoded values */
<Stack gap={3} style={{ maxWidth: "600px" }}>
<div style={{ color: "#1a73e8" }}>
<span style={{ fontSize: "14px" }}>`}</CodeBlock>
                  </Stack>
                </Surface>
                <Surface padding="surface" className="flow-callout" data-intent="success">
                  <Stack gap={2}>
                    <Text variant="label-l" color="success">
                      Do
                    </Text>
                    <CodeBlock>{`/* Semantic tokens */
<Stack gap="component">
<Text color="accent">
<Text variant="paragraph-s">`}</CodeBlock>
                  </Stack>
                </Surface>
              </Grid>
            </Section>
          </Stack>
        </Surface>
      </LayoutGrid.Item>
    </LayoutGrid>
  );
}
