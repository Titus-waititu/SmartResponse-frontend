# Theme Implementation Guide

## Overview

The SmartResponse frontend now includes a comprehensive **light and dark theme system** with smooth transitions and proper theming across all components.

## Features

✅ **Light & Dark Modes** - Fully implemented with toggle functionality
✅ **Persistent Theme** - Theme preference saved to localStorage
✅ **Smooth Transitions** - Animated theme changes
✅ **Comprehensive Coverage** - All pages and components themed
✅ **Modern Design** - Updated UI with gradient accents and card components

## Theme Architecture

### 1. Theme Store (`lib/stores/theme.store.ts`)

Uses Zustand for global state management:

```typescript
import { useThemeStore } from "@/lib/stores/theme.store";

// In your component
const { theme, toggleTheme, setTheme } = useThemeStore();
```

Methods:
- `theme`: Current theme ("light" | "dark")
- `toggleTheme()`: Switch between light and dark
- `setTheme(theme)`: Set specific theme

### 2. Theme Provider (`components/theme-provider.tsx`)

Wraps the app to apply theme on mount and handle hydration:

```tsx
<ThemeProvider>
  {children}
</ThemeProvider>
```

### 3. CSS Variables (`app/globals.css`)

All colors defined as CSS custom properties with light/dark variants:

#### Light Theme Variables
- `--background`: #ffffff
- `--foreground`: #171717
- `--primary`: #dc2626 (red for emergency)
- `--success`: #10b981
- `--warning`: #f59e0b
- `--danger`: #ef4444

#### Dark Theme Variables
- `--background`: #0f172a
- `--foreground`: #f1f5f9
- `--primary`: #ef4444
- Theme-aware colors with proper contrast

## UI Components

### Button Component

```tsx
import { Button } from "@/components/ui";

<Button variant="primary" size="md" isLoading={false}>
  Click me
</Button>
```

**Variants**: `primary`, `secondary`, `outline`, `ghost`, `danger`
**Sizes**: `sm`, `md`, `lg`

### Card Component

```tsx
import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui";

<Card>
  <CardHeader>Header</CardHeader>
  <CardBody>Content</CardBody>
  <CardFooter>Footer</CardFooter>
</Card>
```

### Input Component

```tsx
import { Input } from "@/components/ui";

<Input 
  label="Email" 
  error="Error message"
  icon={<Mail size={20} />}
/>
```

### Badge Component

```tsx
import { Badge } from "@/components/ui";

<Badge variant="success">Active</Badge>
```

**Variants**: `default`, `success`, `warning`, `danger`, `info`

## Theme Toggle Implementation

### In Layout (Dashboard)

```tsx
import { useThemeStore } from "@/lib/stores/theme.store";
import { Moon, Sun } from "lucide-react";

const { theme, toggleTheme } = useThemeStore();

<button onClick={toggleTheme}>
  {theme === "light" ? <Moon /> : <Sun />}
</button>
```

### In Auth Pages

Theme toggle is positioned fixed in top-right corner:

```tsx
<button
  onClick={toggleTheme}
  className="fixed top-6 right-6 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg"
>
  {theme === "light" ? <Moon /> : <Sun />}
</button>
```

## Updated Pages

### ✅ Authentication Pages
- **Sign In** ([/app/auth/signin/page.tsx](app/auth/signin/page.tsx))
  - Modern gradient background
  - Theme toggle button
  - Themed input fields
  - Google OAuth button

- **Sign Up** ([/app/auth/signup/page.tsx](app/auth/signup/page.tsx))
  - All form fields themed
  - Scrollable on smaller screens
  - Compact spacing for better UX

### ✅ Dashboard
- **Main Dashboard** ([/app/dashboard/page.tsx](app/dashboard/page.tsx))
  - Stat cards with hover effects
  - Quick action cards with gradients
  - Themed accident list
  - Loading states
  - Empty states

- **Dashboard Layout** ([/components/layouts/dashboard-layout.tsx](components/layouts/dashboard-layout.tsx))
  - Collapsible sidebar
  - Active route highlighting
  - Theme toggle in sidebar
  - User profile section
  - Notification bell

## Using Tailwind Dark Mode

### Class-based Approach

```tsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
  Content adapts to theme
</div>
```

### Gradient Backgrounds

```tsx
<div className="bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
  Smooth gradient transitions
</div>
```

### Transition Effects

```tsx
<div className="transition-colors duration-300">
  Smooth color transitions
</div>
```

## Color Palette

### Primary (Emergency)
- Light: Red-600 (#dc2626)
- Dark: Red-500 (#ef4444)

### Background
- Light: White (#ffffff)
- Dark: Gray-900 (#0f172a)

### Surface
- Light: Gray-50 (#f9fafb)
- Dark: Gray-800 (#1e293b)

### Text
- Light: Gray-900 (#111827)
- Dark: Gray-100 (#f1f5f9)

### Borders
- Light: Gray-200 (#e5e7eb)
- Dark: Gray-700 (#334155)

## Best Practices

### 1. Always Use Dark Variants

```tsx
// ✅ Good
<div className="bg-white dark:bg-gray-800">

// ❌ Bad
<div className="bg-white">
```

### 2. Use CSS Variables for Custom Colors

```tsx
// ✅ Good
<div style={{ background: "var(--background)" }}>

// For complex gradients
className="bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-500 dark:to-orange-500"
```

### 3. Test Both Themes

Always test your UI in both light and dark modes to ensure proper contrast and readability.

### 4. Use Theme-Aware Icons

```tsx
<AlertCircle className="text-red-600 dark:text-red-500" />
```

## Browser Support

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## Performance

- Theme preference cached in localStorage
- No flash of unstyled content (FOUC)
- Smooth transitions with CSS
- Minimal JavaScript overhead

## Future Enhancements

Potential additions:
- System theme detection
- Auto theme switching based on time
- Custom theme colors
- Theme presets
- Per-user theme preferences stored in backend

## Troubleshooting

### Theme Not Persisting
Check if localStorage is enabled in browser

### Colors Not Updating
Clear browser cache and reload

### Flash of Wrong Theme
Ensure ThemeProvider is in root layout

## Dependencies

```json
{
  "zustand": "^5.0.11",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.5.0"
}
```

## Summary

The SmartResponse app now has a complete theme system with:
- 🎨 Beautiful light and dark modes
- 🔄 Smooth transitions
- 💾 Persistent preferences
- 🎯 Consistent design system
- 📱 Responsive on all devices
- ♿ Accessible color contrasts

All components are theme-aware and provide excellent UX in both modes!
