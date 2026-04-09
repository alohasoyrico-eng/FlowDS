// ignore_for_file: avoid_print
import 'package:flutter/material.dart';
import 'package:flow_ds/flow_ds.dart';

void main() => runApp(const FlowExampleApp());

/// Minimal example showing FlowThemeProvider + core components.
class FlowExampleApp extends StatelessWidget {
  const FlowExampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flow DS Example',
      theme: FlowTheme.light(),
      darkTheme: FlowTheme.dark(),
      home: const ExampleHome(),
    );
  }
}

class ExampleHome extends StatelessWidget {
  const ExampleHome({super.key});

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    return Scaffold(
      backgroundColor: sys.surfaceBase,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: FlowStack(
            gap: FlowGap.section,
            children: [
              // Title
              const FlowText(
                'Flow Design System',
                role: FlowTextRole.headingL,
              ),
              const FlowText(
                'A multiplatform component library with semantic tokens.',
                role: FlowTextRole.paragraphM,
                color: FlowTextColor.secondary,
              ),

              // Button examples
              FlowStack(
                gap: FlowGap.component,
                children: [
                  FlowButton(
                    label: 'Primary action',
                    onPressed: () => print('Primary pressed'),
                  ),
                  FlowButton(
                    label: 'Secondary action',
                    variant: FlowButtonVariant.secondary,
                    onPressed: () => print('Secondary pressed'),
                  ),
                ],
              ),

              // Card example
              FlowCard(
                child: FlowStack(
                  gap: FlowGap.element,
                  children: const [
                    FlowText('Card title', role: FlowTextRole.headingS),
                    FlowText(
                      'Cards compose Surface + Text primitives with comp tokens.',
                      role: FlowTextRole.paragraphS,
                      color: FlowTextColor.secondary,
                    ),
                  ],
                ),
              ),

              // Text input example
              FlowTextInput(
                label: 'Email address',
                hint: 'you@example.com',
                onChanged: (value) => print('Input: $value'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
