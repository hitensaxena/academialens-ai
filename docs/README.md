# AcademiaLens UI Components

A collection of reusable, accessible, and customizable UI components built with React, TypeScript, and Tailwind CSS.

## Documentation

- [Getting Started](#getting-started)
- [Component Library](#component-library)
- [Design System](#design-system)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Installation

```bash
# Using npm
npm install @academialens/ui

# Using yarn
yarn add @academialens/ui

# Using pnpm
pnpm add @academialens/ui
```

### Usage

```tsx
import { Button } from '@academialens/ui/button';

export function MyComponent() {
  return <Button>Click me</Button>;
}
```

## Component Library

### Navigation

- [Breadcrumb](/docs/components/navigation-components.md#breadcrumb) - Show the current page's location within a navigational hierarchy
- [Pagination](/docs/components/navigation-components.md#pagination) - Navigate between pages of content

### Feedback

- [Skeleton](/docs/components/feedback-components.md#skeleton) - Provide a placeholder while content is loading
- [Progress](/docs/components/feedback-components.md#progress) - Show the progress of a task or operation
- [Tooltip](/docs/components/feedback-components.md#tooltip) - Display additional information on hover or focus
- [Popover](/docs/components/feedback-components.md#popover) - Display rich content in a floating panel

## Design System

### Colors

```ts
const colors = {
  primary: {
    DEFAULT: '#0070f3',
    foreground: '#ffffff',
  },
  // ...
};
```

### Typography

```css
:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  --font-mono: 'Roboto Mono', monospace;
}
```

### Spacing

```ts
const spacing = {
  '0': '0px',
  '0.5': '0.125rem',
  '1': '0.25rem',
  // ...
};
```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [AcademiaLens](https://github.com/academialens)
