# CLAUDE.md

This is the Rosalana UI package (`@rosalana/ui`) - a Vue 3 plugin providing consistent styling and behavior across all SaaS applications in the Rosalana ecosystem.

## Core Purpose

A centralized UI library ensuring:
- Consistent theming (colors, dark mode) across apps
- Shared composables for auth, preferences, HTTP
- Reusable headless components with Tailwind styling
- Integration with Laravel/Inertia backend

## Architecture Principles

### 1. Context-First Design
Everything flows through `RosalanaUIContext` - a reactive object provided to the entire app:
```typescript
app.use(createRosalanaApp, {
  name: 'AppName',
  colors: { primary: 'blue' },
  adapters: { preferences: async (data) => { /* sync with backend */ } }
})
```

Access context via `useAppContext()` (reactive) or `useAppDefaults()` (immutable reference).

### 2. Adapter Pattern for Backend Sync
Adapters connect UI state to backend persistence. They're bidirectional - changes from either side sync automatically:
```typescript
adapters: {
  preferences: async (data) => await api.post('/preferences', data)
}
```

### 3. CSS Variables for Dynamic Theming
Colors are injected as CSS custom properties at runtime (`--color-primary-500`, etc.). No rebuild needed for theme changes. All colors support light/dark mode variants.

### 4. Inertia Integration
User and preferences data come from Inertia page props, not a separate state store. Composables like `useUser()` and `usePreferences()` read directly from `usePage().props`.

## Design System

Rosalana UI uses a **clean, modern, approachable** design language focused on creativity and warmth. The goal is to feel inviting and memorable without being flashy or corporate.

### Design Principles

1. **Soft & Rounded** - Use generous border-radius (`rounded-xl`, `rounded-2xl`) for a friendly, approachable feel
2. **Diffuse Shadows** - Soft, spread shadows instead of harsh ones. Color-tinted shadows for depth
3. **Clean & Minimal** - No heavy gradients or glassmorphism. Solid colors with subtle depth
4. **Warm & Inviting** - Design should feel like home, spark creativity, not cold corporate UI
5. **Subtle Animations** - Spring-based micro-interactions using `motion-v` for satisfying feedback

### Visual Style Guide

**Shadows:**
```css
/* Soft colored shadow pattern */
shadow-[0_2px_8px_-3px,0_4px_20px_-4px] shadow-primary/40
```

**Border Radius:**
- Default: `rounded-xl` (12px)
- Large: `rounded-2xl` (16px)
- Small: `rounded-lg` (8px)

**Interactions:**
- `active:scale-[0.97]` - Satisfying press feedback
- `hover:brightness-105` - Subtle hover brightening
- Spring animations via `motion-v` for enter/exit states

**Colors:**
- Use semantic color tokens (`primary`, `secondary`, `muted`, `destructive`)
- Color-tinted shadows matching the element's color
- Maintain good contrast for accessibility

### Animation with motion-v

Use `motion-v` (Vue port of motion.dev) for micro-interactions:

```vue
<script setup>
import { AnimatePresence, motion } from "motion-v"
</script>

<template>
  <!-- Enter/exit animations -->
  <AnimatePresence>
    <motion.div
      v-if="visible"
      :initial="{ opacity: 0, scale: 0.95 }"
      :animate="{ opacity: 1, scale: 1 }"
      :exit="{ opacity: 0, scale: 0.95 }"
      :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
    />
  </AnimatePresence>

  <!-- Reactive animations -->
  <motion.span
    :animate="isActive ? { width: 'auto', opacity: 1 } : { width: 0, opacity: 0 }"
    :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
  />
</template>
```

**Tip:** When animating elements that need to collapse (like hover arrows), animate both `width` and `marginLeft` (negative margin to compensate for flex gap).

### Reference Component: UiButton

`UiButton` (`components/Ui/Button/Button.vue`) demonstrates all design principles:
- Soft shadows with color tinting
- Spring animations for loading spinner and hover arrow
- `active:scale-[0.97]` press feedback
- Clean variants without heavy effects

## Project Structure

```
src/
├── plugin/           # Core plugin system
│   ├── create.ts     # Vue plugin installation
│   ├── context.ts    # Context creation & injection
│   ├── adapter.ts    # Reactive backend adapters
│   ├── colors.ts     # CSS variable generation
│   └── types.ts      # TypeScript definitions
├── composables/      # Vue composables
│   ├── useTheme.ts   # Light/dark mode management
│   ├── useUser.ts    # Current authenticated user
│   ├── usePreferences.ts
│   └── useFetch.ts   # Axios-based HTTP client
├── components/
│   ├── Ui/           # Primitive UI components (reka-ui wrappers)
│   └── Blocks/       # Composed UI blocks (use Ui components)
└── tailwind.css      # Tailwind v4 theme config
```

## Components Architecture

### Ui vs Blocks

**Ui/** - Primitive components wrapping reka-ui headless primitives:
- Direct 1:1 mapping with reka-ui components
- Styled with Tailwind + tailwind-variants
- Highly composable, maximum flexibility via props/slots
- Examples: `UiButton`, `UiDialog`, `UiSelect`, `UiTabs`

**Blocks/** - Pre-composed UI patterns:
- Combine multiple Ui components into ready-to-use blocks
- Opinionated layout and structure
- Less flexible but faster to use
- Examples: `BlocksLoginForm`, `BlocksDataTable`, `BlocksUserMenu`

### Component Hierarchy

```
Blocks (high-level, opinionated)
   ↓ uses
Ui (primitives, flexible)
   ↓ wraps
reka-ui (headless, accessible)
```

### Available Ui Components

| Category | Components |
|----------|------------|
| **Form** | Input, Textarea, Label, Checkbox, RadioGroup, Switch, Select, Slider, PinInput |
| **Feedback** | Alert, Badge, Progress, Skeleton |
| **Overlay** | Dialog, Popover, Tooltip, Sheet, DropdownMenu, HoverCard, AlertDialog, ContextMenu |
| **Navigation** | Tabs, Accordion, Breadcrumb, Pagination, NavigationMenu, Menubar |
| **Layout** | Card, AspectRatio, Collapsible, ScrollArea, Separator, Resizable |
| **Data** | Avatar, Table, Command (combobox/command palette), Calendar |
| **Utility** | Button, Icon, Toggle, ToggleGroup |

## Key Files

- **Entry point:** `src/index.ts` - exports everything
- **Plugin init:** `src/plugin/create.ts` - the `createRosalanaApp` function
- **Color system:** `src/plugin/colors.ts` - CSS variable generation
- **Theme composable:** `src/composables/useTheme.ts` - dark mode with localStorage

## Component Conventions

- **Namespace:** Components prefixed with `Ui` or `Blocks` (e.g., `UiButton`, `BlocksLoginForm`)
- **Structure:** `components/Ui/{Name}/{Name}.vue` or `components/Blocks/{Name}/{Name}.vue`
- **Base:** Use `reka-ui` primitives for headless/accessible foundation
- **Styling:** `tailwind-variants` (tv) for variant management
- **Icons:** Iconify via `@iconify/vue` - supports `mdi:home` or `mdi-home` format

### Ui Component Pattern

Each Ui component follows this structure:

```vue
<script setup lang="ts">
import type { ComponentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Component, useForwardProps } from "reka-ui"
import { tv, type VariantProps } from "tailwind-variants"

const componentStyles = tv({
  base: "...",
  variants: { ... },
  defaultVariants: { ... }
})

type ComponentVariants = VariantProps<typeof componentStyles>

interface Props extends ComponentProps {
  variant?: ComponentVariants["variant"]
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const forwarded = useForwardProps(props)
</script>

<template>
  <Component
    data-slot="component-name"
    v-bind="forwarded"
    :class="[componentStyles({ variant }), props.class]"
  >
    <slot />
  </Component>
</template>
```

Key patterns:
- `data-slot` attribute for external styling hooks
- `useForwardProps` / `useForwardPropsEmits` for prop forwarding
- Accept `class` prop for custom styling
- Use `tv()` for variants with sensible defaults

## Color Configuration

```typescript
colors: {
  // Simple - uses Tailwind palette
  primary: 'blue',

  // With shade and dark mode
  primary: {
    color: 'blue',
    default: '500 dark:600'  // blue-500 light, blue-600 dark
  },

  // Full semantic config
  primary: {
    color: 'blue',
    default: '500 dark:600',
    foreground: 'white',
    border: '200 dark:800'
  }
}
```

Semantic colors: `primary`, `secondary`, `muted`, `destructive`, `info`, `success`, `warning`, `theme` (background/foreground).

## Tech Stack

- **Vue 3** with Composition API
- **Tailwind CSS v4** with `@theme` syntax
- **reka-ui** for headless component primitives
- **tailwind-variants** for component variants
- **motion-v** for spring-based micro-animations
- **Inertia.js** for page props (peer dependency)
- **Axios** for HTTP requests

## Build Output

- ES Module: `dist/index.es.js`
- CommonJS: `dist/index.cjs.js`
- TypeScript declarations included
- CSS: Import `@rosalana/ui/tailwind.css` in consuming apps

## Common Tasks

```bash
npm run build    # Build library
npm run dev      # Development mode
```

When adding components, follow existing patterns in `components/Ui/Button/` as reference.

## Adding New Components

### Adding Ui Component

1. Create folder: `components/Ui/{Name}/`
2. Create component file(s): `{Name}.vue`, `{SubComponent}.vue`
3. Export in `components/index.ts`:
   ```typescript
   export { default as Ui{Name} } from "./Ui/{Name}/{Name}.vue";
   ```

### Adding Block Component

1. Create folder: `components/Blocks/{Name}/`
2. Import and compose Ui components
3. Export in `components/index.ts`
4. The export name has to describe the block clearly:
   ```typescript
   export { default as Ui{Name} } from "./Blocks/{Name}/{Name}.vue";
   ```

## Usage Example

```vue
<script setup>
import {
  UiDialog,
  UiDialogContent,
  UiDialogHeader,
  UiDialogTitle,
  UiButton,
  UiInput,
  UiLabel
} from '@rosalana/ui'
</script>

<template>
  <UiDialog>
    <UiDialogTrigger as-child>
      <UiButton>Open</UiButton>
    </UiDialogTrigger>
    <UiDialogContent>
      <UiDialogHeader>
        <UiDialogTitle>Edit Profile</UiDialogTitle>
      </UiDialogHeader>
      <div class="grid gap-4">
        <UiLabel for="name">Name</UiLabel>
        <UiInput id="name" v-model="name" />
      </div>
    </UiDialogContent>
  </UiDialog>
</template>
```
