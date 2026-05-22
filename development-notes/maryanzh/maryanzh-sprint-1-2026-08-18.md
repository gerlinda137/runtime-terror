Week_1
Task: https://github.com/rolling-scopes-school/tasks/blob/master/angular/tasks/angular-team-task/SPRINT1_CHECKPOINT.md
Topic: Project Setup & Component Basics
Date: 12/05/2026-19/05/2026

**What was done:**
week_1:
1. Implemented Light/Dark Theme System
- Added global CSS variable–based theming
- Introduced data-theme attribute switching
- Created full light and dark palettes (colors, typography, spacing, shadows)
- Ensured theme propagation across all components
- Integrated theme toggle into the header menu

2. Add main grid layout

3. Added Typography Component
- Implemented reusable <app-typography> component
- Added support for multiple text variants (heading, body, description, etc.)
- Connected typography to global CSS variables
- Ensured responsive scaling for mobile and desktop

4. Added Sidebar Component
- Created a standalone sidebar with navigation items list
- Implemented responsive layout and Material icons
- Integrated with the main application grid structure
- Styled using theme variables for full light/dark support

5. Integrated Angular Material
- Installed and configured Angular Material 17+
- Enabled Material Design tokens and theming system
- Applied Material components in sidebar
- Unified Material tokens with custom theme variables

week_2
1. Fix layout according to the Figma project (apply UI colors and typography styles)
2. Remove the Typography component and add a typography directive
3. Remove @Input and migrate to signals
4. Rename interfaces following Angular style guide best practices
5. Start backend development

**Problems:**
week_1:
- themes variable, root

week_2:
- Resolved layout conflicts related to misplaced @if structural directive
- Cleaned up lint errors: removed unused Input, migrated constructor DI to inject()
- Refactored project structure: reorganized constants according to feature‑based architecture
- Migrated from Typography component to a standalone typography directive
- Analyzed public Angular repositories to refine project structure


**Solutions:**
week_1:
- add variable in styles.scss
week_2:
- Replaced the Typography component with a typography directive
- Migrated from @Input() bindings to signal‑based inputs
- Updated theme variables and unified naming
- Renamed interfaces according to Angular style guide conventions
- Refactored layout based on the Figma design


week_1:
- signal()
week_2:
- How to replace a component with a standalone directive (typography refactor)
- How to migrate from @Input() to signal‑based inputs (signal(), input(), computed())
- How to apply Angular style guide rules when renaming interfaces
- How to organize constants, shared UI, and feature folders in a modern Angular structure
- How to resolve template rendering issues related to structural directives (@for, @if)
- How to use inject() instead of constructor DI in standalone components

**Plans:**
week_1:
- refactor typography
- migrate to signals
- fix layout 
week_2:
- Start backend implamentation
- Study Angular directives and the pattern for creating reusable UI behavior
- Analyze a public API to determine which components can be added to the project, which routes are relevant, and which pages need to be implemented
- Explore whether the backend should be integrated directly into the project or developed in a separate repository

**Time spent:**
week_1:
18 h
week_2:
16 h

