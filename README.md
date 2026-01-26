# Rosalana UI

Rosalana UI is the **centralized UI component library** for all applications in the Rosalana ecosystem. Its primary goal is to provide a **unified framework** of styled, accessible components and composables that ensure consistency across multiple **Vue 3 + Inertia.js projects**.

> For backend integration and cross-application communication, see the [rosalana/core](https://github.com/rosalana/core) package.

> `@rosalana/ui` is meant to be used in **Vue 3 applications with [Inertia.js](https://inertiajs.com/)**

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Features](#features)
  - [Plugin System](#plugin-system)
  - [Context-First Architecture](#context-first-architecture)
  - [Adapter Pattern](#adapter-pattern)
  - [Dynamic Color System](#dynamic-color-system)
  - [Component Architecture](#component-architecture)
  - [Design System](#design-system)
  - [Animations with motion-v](#animations-with-motion-v)
  - [Available Composables](#available-composables)
- [Component Reference](#component-reference)
  - [Ui Components (Primitives)](#ui-components-primitives)
  - [Block Components](#block-components)
- [Tech Stack](#tech-stack)
- [Development](#development)
- [License](#license)

## Installation

You can install `@rosalana/ui` via npm by running the following command:

```bash
npm install @rosalana/ui
```

After installing the package, you need to import the Tailwind CSS configuration in your application's CSS file:

```css
@import "@rosalana/ui/tailwind.css";
```

> Make sure your project is configured with **Tailwind CSS v4** and **Vue 3**.

## Configuration

After installation, register the Rosalana UI plugin in your Vue 3 application's entry point (usually `app.ts` or `main.ts`):

```typescript
import { createApp } from "vue";
import { createRosalanaApp } from "@rosalana/ui";
import App from "./App.vue";

const app = createApp(App);

app.use(createRosalanaApp, {
  name: "AppName",
  env: "production",
  colors: {
    primary: { color: "blue", default: "500 dark:600" },
    secondary: { color: "neutral", default: "200 dark:800" },
  },
  adapters: {
    preferences: async (data) => {
      // Sync preferences to backend
      await fetch("/api/preferences", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
  },
});

app.mount("#app");
```

### Configuration Options

The `createRosalanaApp` function accepts a configuration object with the following properties:

| Option     | Type           | Description                                                        |
| ---------- | -------------- | ------------------------------------------------------------------ |
| `name`     | `string`       | Application name (displayed in context)                            |
| `env`      | `Environment`  | Environment: `development`, `production`, `staging`, `maintenance` |
| `colors`   | `ColorsConfig` | Color palette configuration for theming                            |
| `adapters` | `object`       | Backend sync adapters (e.g., preferences, user data)               |
| `before`   | `function`     | Hook that runs before context initialization                       |
| `after`    | `function`     | Hook that runs after plugin setup                                  |

### Color Configuration

The color system supports multiple configuration formats:

```typescript
colors: {
  // Simple - uses Tailwind palette
  primary: 'blue',

  // With default shade and dark mode variant
  primary: {
    color: 'blue',
    default: '500 dark:600'  // blue-500 in light mode, blue-600 in dark
  },

  // For theme property you can also specify
  theme: {
    color: 'blue',
    default: '500 dark:600',
    background: '50 dark:900';
    foreground: '900 dark:50';
    border: '200 dark:800'
    input: '200 dark:800';
    ring: '500 dark:600';
  }
}
```

**Available semantic colors:**

- `primary` - Primary brand color
- `secondary` - Secondary accent color
- `muted` - Muted/neutral elements
- `destructive` - Destructive actions (delete, remove)
- `info` - Informational messages
- `success` - Success states
- `warning` - Warning messages
- `theme` - Background and foreground colors
- `white` - Set up white (string)
- `black` - Set up black (string)

> [!TIP]
> For muted text, use `text-theme` instead of `text-muted` or `text-muted-foreground`. It automatically adapts to light/dark mode and represents the middle gray shade.

## Features

### Plugin System

Rosalana UI is built as a **Vue 3 plugin** that installs a global reactive context. The plugin handles:

- **Context initialization** - Creates a reactive object accessible throughout the app
- **Color injection** - Generates CSS custom properties at runtime
- **Adapter registration** - Connects UI state to backend persistence
- **Theme management** - Handles light/dark mode with localStorage sync

The plugin architecture ensures that all Rosalana applications share the same foundation while allowing individual customization.

### Context-First Architecture

Everything in Rosalana UI flows through the `RosalanaUIContext` — a reactive object provided to the entire application. This context contains:

- **Preferences** - User settings synced with backend
- **User data** - Current authenticated user (from Inertia page props)
- **Permissions** - Authorization data
- **Adapters** - Backend sync functions
- **App metadata** - Name, environment, version

#### Accessing Context

Use composables to access different parts of the context:

```typescript
import { useAppContext, useAppDefaults } from "@rosalana/ui";

// Reactive context (updates when data changes)
const context = useAppContext();

// Immutable initial configuration (doesn't change)
const defaults = useAppDefaults();
```

The context is **reactive** — when preferences or user data change in the backend (via Inertia page props), all components using `useAppContext()` automatically update.

### Adapter Pattern

Adapters create **bidirectional reactive connections** between UI state and backend persistence. They automatically sync changes from either direction:

```typescript
adapters: {
  preferences: async (data) => {
    const response = await fetch("/api/preferences", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.json();
  };
}
```

**How it works:**

1. When UI state changes (e.g., theme toggle), the adapter function is called
2. Backend updates the data and returns the new state
3. Context merges the response and notifies all watchers
4. All components using that data automatically re-render

This eliminates the need for manual state synchronization and reduces boilerplate code significantly.

#### Using Adapters in Components

```typescript
import { usePreferences } from "@rosalana/ui";

const preferences = usePreferences();

// Read a preference
const theme = preferences.get("theme");

// Update a preference (triggers backend sync)
preferences.update({ theme: "dark" });
```

You can disable backend sync on a per-update basis:

```typescript
preferences.update({ theme: "dark" }, { sync: false });
```

### Dynamic Color System

Rosalana UI uses **CSS custom properties** for dynamic theming — no rebuild needed for theme changes. Colors are injected at runtime as CSS variables:

```css
--color-primary-500
--color-primary-foreground
--color-primary-border
```

All colors support light/dark mode variants via the `.dark` class selector.

#### Color Processing

The color system:

- Accepts Tailwind color names (e.g., `blue`, `red`, `neutral`)
- Generates all shade levels (50-950) automatically
- Calculates foreground contrast colors for accessibility
- Supports hex, rgb/rgba, and oklch color formats
- Handles dark mode variants with separate color values

#### Using Colors in Components

```vue
<template>
  <div class="bg-primary text-primary-foreground">Primary colored element</div>

  <div class="bg-destructive-100 text-destructive-900">
    Destructive action background
  </div>
</template>
```

### Component Architecture

Rosalana UI provides two layers of components:

#### Ui Components (Primitives)

Located in `src/components/Ui/`, these are low-level, highly composable components that wrap **reka-ui headless primitives**:

- Direct 1:1 mapping with reka-ui components
- Styled with Tailwind CSS and tailwind-variants
- Maximum flexibility via props and slots
- Accessible by default (ARIA compliant)
- Examples: `UiButton`, `UiDialog`, `UiSelect`, `UiTabs`

**Ui Component Pattern:**

```vue
<script setup lang="ts">
import type { ComponentProps } from "reka-ui";
import { Button, useForwardProps } from "reka-ui";
import { tv, type VariantProps } from "tailwind-variants";

const buttonStyles = tv({
  base: "rounded-xl px-4 py-2 font-medium transition-all",
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground hover:brightness-105",
      secondary: "bg-secondary text-secondary-foreground",
    },
    size: {
      sm: "text-sm px-3 py-1.5",
      md: "text-base px-4 py-2",
      lg: "text-lg px-5 py-3",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

type ButtonVariants = VariantProps<typeof buttonStyles>;

interface Props extends ComponentProps {
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  class?: string;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <Button
    data-slot="button"
    v-bind="forwarded"
    :class="[buttonStyles({ variant, size }), props.class]"
  >
    <slot />
  </Button>
</template>
```

#### Block Components (Composed Patterns)

Located in `src/components/blocks/`, these are higher-level, pre-composed UI patterns that combine multiple Ui components:

- Opinionated layout and structure
- Less flexible but faster to implement
- Built using Ui components for consistency
- Examples: `DataTable`, `Actions` (dropdown menu)

**Component Hierarchy:**

```
Blocks (high-level, opinionated)
   ↓ uses
Ui (primitives, flexible)
   ↓ wraps
reka-ui (headless, accessible)
```

### Design System

Rosalana UI follows a **clean, modern, approachable** design language focused on creativity and warmth. The goal is to feel inviting and memorable without being flashy or corporate.

#### Design Principles

1. **Soft & Rounded** - Generous border-radius (`rounded-xl`, `rounded-2xl`) for a friendly, approachable feel
2. **Diffuse Shadows** - Soft, spread shadows instead of harsh ones. Color-tinted shadows for depth
3. **Clean & Minimal** - No heavy gradients or glassmorphism. Solid colors with subtle depth
4. **Warm & Inviting** - Design should feel like home, spark creativity, not cold corporate UI
5. **Subtle Animations** - Spring-based micro-interactions using `motion-v` for satisfying feedback

#### Visual Style Guide

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

#### Reference Component

`UiButton` (`components/Ui/Button/Button.vue`) demonstrates all design principles:

- Soft shadows with color tinting
- Spring animations for loading spinner and hover arrow
- `active:scale-[0.97]` press feedback
- Clean variants without heavy effects

### Animations with motion-v

Rosalana UI uses **motion-v** (Vue port of motion.dev) for all micro-interactions and animations. Prefer spring-based transitions for a natural feel:

```vue
<script setup>
import { AnimatePresence, motion } from "motion-v";
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
    :animate="
      isActive ? { width: 'auto', opacity: 1 } : { width: 0, opacity: 0 }
    "
    :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
  />
</template>
```

> [!TIP]
> When animating elements that need to collapse (like hover arrows), animate both `width` and `marginLeft` (negative margin to compensate for flex gap).

### Available Composables

Rosalana UI provides several composables for common tasks:

| Composable             | Description                                           |
| ---------------------- | ----------------------------------------------------- |
| `useTheme()`           | Dark mode management with localStorage sync           |
| `usePreferences<T>()`  | User preference adapter with backend sync             |
| `useUser<T>()`         | Current authenticated user from Inertia props         |
| `useAppContext()`      | Reactive runtime app context                          |
| `useAppDefaults()`     | Immutable initial configuration                       |
| `useFetch()`           | Axios-based HTTP client with Inertia integration      |
| `useTable<T>()`        | Advanced table state (sorting, filtering, pagination) |
| `useDetectLightness()` | Image brightness detection for contrast               |
| `useComputedPage<T>()` | Helper for accessing Inertia page props               |

#### useTheme

Manage light/dark mode with automatic localStorage persistence:

```typescript
import { useTheme } from "@rosalana/ui";

const theme = useTheme();

theme.get(); // Returns current theme: "light" | "dark" | "system"
theme.isDark(); // Returns true if dark mode is active
theme.update("dark"); // Change theme
theme.initializeTheme(); // Set up reactive theme watching
```

#### usePreferences

Access and update user preferences with backend sync:

```typescript
import { usePreferences } from "@rosalana/ui";

const preferences = usePreferences<{ theme: string; sidebar: boolean }>();

const theme = preferences.get("theme", "light"); // Get with default
preferences.update({ sidebar: false }); // Update (triggers adapter)
```

#### useUser

Access the current authenticated user from Inertia page props:

```typescript
import { useUser } from "@rosalana/ui";

const user = useUser<{ role: string; avatar: string }>();

if (user.value) {
  console.log(user.value.name, user.value.email, user.value.role);
}
```

#### useFetch

Axios-based HTTP client with CSRF and credential handling:

```typescript
import { useFetch } from "@rosalana/ui";

const { get, post, put, del } = useFetch();

// Make requests
const response = await get("/api/users");
const created = await post("/api/users", { name: "John" });
const updated = await put("/api/users/1", { name: "Jane" });
const deleted = await del("/api/users/1");
```

#### useTable

Advanced table state management for data tables:

```typescript
import { useTable } from "@rosalana/ui";

const table = useTable({
  data: users,
  columns: [
    { key: "name", header: "Name", sortable: true },
    { key: "email", header: "Email", sortable: true },
  ],
  state: {
    sort: { key: "name", direction: "asc" },
    pageSize: 10,
  },
  events: {
    onSort: (key) => console.log("Sorting by", key),
    onPage: (page) => console.log("Page changed to", page),
  },
});

// Access table state
table.sortedData; // Sorted and filtered data
table.paginatedData; // Current page data
table.state.sort; // Current sort state
```

## Component Reference

### Ui Components (Primitives)

All Ui components are prefixed with `Ui` and wrap reka-ui headless primitives with Tailwind styling.

#### Form Components

| Component      | Description                        |
| -------------- | ---------------------------------- |
| `UiInput`      | Text input field with variants     |
| `UiTextarea`   | Multi-line text input              |
| `UiLabel`      | Form label with accessibility      |
| `UiCheckbox`   | Checkbox input with custom styling |
| `UiRadioGroup` | Radio button group                 |
| `UiSwitch`     | Toggle switch                      |
| `UiSelect`     | Dropdown select with search        |
| `UiSlider`     | Range slider input                 |
| `UiPinInput`   | PIN/OTP code input                 |

#### Feedback Components

| Component    | Description                  |
| ------------ | ---------------------------- |
| `UiAlert`    | Alert/notification box       |
| `UiBadge`    | Label badge for status/tags  |
| `UiProgress` | Progress bar indicator       |
| `UiSkeleton` | Loading skeleton placeholder |

#### Overlay Components

| Component        | Description                     |
| ---------------- | ------------------------------- |
| `UiDialog`       | Modal dialog with backdrop      |
| `UiPopover`      | Floating popover menu           |
| `UiTooltip`      | Hover tooltip                   |
| `UiSheet`        | Slide-out panel (drawer)        |
| `UiDropdownMenu` | Dropdown menu with nested items |
| `UiHoverCard`    | Hover card with rich content    |
| `UiAlertDialog`  | Confirmation dialog             |
| `UiContextMenu`  | Right-click context menu        |

#### Navigation Components

| Component          | Description                 |
| ------------------ | --------------------------- |
| `UiTabs`           | Tab navigation system       |
| `UiAccordion`      | Collapsible accordion       |
| `UiBreadcrumb`     | Breadcrumb navigation       |
| `UiPagination`     | Pagination controls         |
| `UiNavigationMenu` | Multi-level navigation menu |
| `UiMenubar`        | Horizontal menu bar         |

#### Layout Components

| Component       | Description                       |
| --------------- | --------------------------------- |
| `UiCard`        | Card container with header/footer |
| `UiAspectRatio` | Maintain aspect ratio container   |
| `UiCollapsible` | Collapsible content section       |
| `UiScrollArea`  | Custom styled scroll container    |
| `UiSeparator`   | Horizontal/vertical divider       |
| `UiResizable`   | Resizable panel container         |

#### Data Components

| Component    | Description               |
| ------------ | ------------------------- |
| `UiAvatar`   | User avatar with fallback |
| `UiTable`    | Data table with styling   |
| `UiCommand`  | Command palette/combobox  |
| `UiCalendar` | Date picker calendar      |

#### Utility Components

| Component       | Description                            |
| --------------- | -------------------------------------- |
| `UiButton`      | Button with variants and loading state |
| `UiIcon`        | Iconify icon wrapper                   |
| `UiToggle`      | Toggle button                          |
| `UiToggleGroup` | Toggle button group                    |

### Block Components

Block components are pre-composed patterns combining multiple Ui components.

#### DataTable

Full-featured data table with sorting, filtering, pagination, and search.

```vue
<script setup>
import { DataTable } from "@rosalana/ui";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

const columns = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email", sortable: true },
];
</script>

<template>
  <DataTable :data="users" :columns="columns" />
</template>
```

**Features:**

- Column sorting (ascending/descending)
- Column visibility toggle
- Row selection (single/multiple)
- Search/filtering
- Pagination with customizable page sizes
- Generic typing: `DataTable<T>`

**Sub-components:**

- `DataTableSearch` - Search input
- `DataTableColumnToggle` - Column visibility toggle
- `DataTablePagination` - Pagination controls

#### Actions

Dropdown menu for action items with nested submenu support.

```vue
<script setup>
import { Actions } from "@rosalana/ui";

const actions = [
  {
    label: "Edit",
    icon: "mdi:pencil",
    onClick: () => console.log("Edit"),
  },
  {
    label: "Delete",
    icon: "mdi:delete",
    onClick: () => console.log("Delete"),
    destructive: true,
  },
];
</script>

<template>
  <Actions :items="actions" />
</template>
```

**Features:**

- Nested submenu structure
- Custom trigger slot
- Configurable alignment and positioning
- Modal behavior options

## Tech Stack

Rosalana UI is built with modern frontend technologies:

| Technology            | Version | Purpose                                  |
| --------------------- | ------- | ---------------------------------------- |
| **Vue 3**             | 3.5+    | Composition API and reactivity           |
| **Tailwind CSS**      | 4.1+    | Utility-first styling with v4 features   |
| **reka-ui**           | 2.7+    | Headless accessible UI primitives        |
| **tailwind-variants** | 3.1+    | Component variant management             |
| **motion-v**          | 1.10+   | Spring-based animations                  |
| **Axios**             | 1.11+   | HTTP requests                            |
| **@iconify/vue**      | 5.0+    | Icon library (supports all Iconify sets) |
| **@vueuse/core**      | 14.1+   | Vue composition utilities                |

**Peer Dependencies (required in consuming apps):**

- `@inertiajs/vue3` ^2.1.0
- `vue` ^3.5.0

**Build Tools:**

- Vite 5.2+ (module bundler)
- TypeScript 5.4+ (type safety)
- vue-tsc (TypeScript for Vue)

## Development

To run this package locally for development and testing:

### Install Dependencies

```bash
npm install
```

### Link Package Globally

```bash
npm link
```

Then in your consuming project:

```bash
npm link @rosalana/ui
```

### Build and Watch

For JavaScript files:

```bash
npm run dev:vite
```

For TypeScript declaration files:

```bash
npm run dev:tsc
```

Or run both in parallel:

```bash
npm run dev
```

### Alternative Installation Methods

When `npm link` is not available, you can add the package directly to your `package.json`:

```json
{
  "dependencies": {
    "@rosalana/ui": "file:../path-to-rosalana-ui"
  }
}
```

Or use `npm pack` to create a tarball:

```bash
npm pack
```

This creates a file like `rosalana-ui-0.0.1.tgz`. Install it in your project:

```bash
npm install ../path-to-rosalana-ui/rosalana-ui-0.0.1.tgz
```

This simulates a real package installation and is useful for testing before publishing.

### Available Scripts

| Script              | Description                                   |
| ------------------- | --------------------------------------------- |
| `npm run build`     | Build library for production                  |
| `npm run dev`       | Build and watch for changes                   |
| `npm run dev:vite`  | Watch for JavaScript changes only             |
| `npm run dev:tsc`   | Watch for TypeScript declaration changes only |
| `npm run typecheck` | Type-check without emitting files             |
| `npm run clean`     | Remove build artifacts                        |

## License

Rosalana UI is open-source under the [MIT license](/LICENCE), allowing you to freely use, modify, and distribute it with minimal restrictions.

You may not be able to use our systems but you can use our code to build your own.

For details on how to contribute or how the Rosalana ecosystem is maintained, please refer to each repository's individual guidelines.

**Questions or feedback?**

Feel free to open an issue or contribute with a pull request. Happy coding with Rosalana!
