Week_1
Task: https://github.com/rolling-scopes-school/tasks/blob/master/angular/tasks/angular-team-task/SPRINT1_CHECKPOINT.md
Topic: Project Setup & Component Basics
Date: 12/05/2026-19/05/2026

**What was done:**
week_1:
- Implemented Light/Dark Theme System
- Added global CSS‑variable–based theming
- Introduced data-theme attribute switching
- Created full light and dark palettes (colors, typography, spacing, shadows)
- Ensured theme propagation across all components
- Integrated theme toggle into the header menu
- Created main grid layout
- Added Typography Component → later refactored into a Typography Directive
- Implemented reusable <app-typography> component
- Added multiple text variants (heading, body, description, etc.)
- Connected typography to global CSS variables
- Ensured responsive scaling for mobile and desktop
- Added Sidebar Component
- Created standalone sidebar with navigation list
- Implemented responsive layout and Material icons
- Integrated sidebar into the main grid layout
- Styled using theme variables for full light/dark support
- Integrated Angular Material
- Installed and configured Angular Material 17+
- Enabled Material Design tokens and theming
- Applied Material components in the sidebar
- Unified Material tokens with custom theme variables

Week 2
- Fixed layout according to the Figma design (colors, typography, spacing)
- Removed Typography Component and replaced it with a Typography Directive
- Removed @Input() and migrated to signals
- Renamed interfaces following Angular Style Guide conventions
- Started backend development
-- Created backend repository
-- Initialized NestJS project
-- Added Docker configuration
-- Added Prisma + User schema
-- Implemented Auth module
-- Added Swagger documentation


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

**Learned:**
week_1:
- How to configure a global CSS‑variable theming system (light/dark mode)
- How to propagate theme variables across the entire Angular application
- How to integrate Angular Material 17+ with custom design tokens
- How to combine Material theming with custom CSS variables
- How to design a standalone sidebar component with responsive behavior
- How to organize global styles (root variables, theme layers, spacing, typography)

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

week_3:
- Analyze a public API to determine which components can be added to the project, which routes are relevant, and which pages need to be implemented
- inplament Auth Module
- implament pages routings

**Time spent:**
week_1:
18 h
week_2:
32 h

