/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FLOW CSS Modules — Architecture Overview
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   This directory contains the modular CSS architecture for the FLOW
   design system. The monolithic flow.css has been split into focused
   modules for better maintainability and development experience.

   📁 Structure:
   ├── flow.css          # Main entry point (imports all modules)
   ├── flow.css.backup   # Original monolithic file (backup)
   └── modules/
       ├── tokens.css        # Core token variables (ref, sys, comp)
       ├── responsive.css    # Density × viewport overrides & compounds
       ├── input-surface.css # Shared input-family CSS primitive
       ├── utilities.css     # Documentation site utilities & tone classes
       ├── primitives.css    # L2 structural classes (Surface, Stack, etc.)
       └── components.css    # L3 component styles (Avatar, Slider, etc.)

   🔧 Development:
   - Edit individual modules for focused changes
   - Main flow.css automatically imports all modules
   - No changes needed in application code

   📊 Benefits:
   - Reduced cognitive load when editing specific features
   - Better git diffs for targeted changes
   - Easier maintenance and code review
   - Clear separation of concerns by architectural layer

   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
