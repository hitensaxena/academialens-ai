# Feedback Components

Feedback components provide visual feedback to users about the status of an action or the current state of the application.

## Table of Contents

- [Skeleton](#skeleton)
- [Progress](#progress)
- [Tooltip](#tooltip)
- [Popover](#popover)
- [Component Patterns](#component-patterns)
- [Accessibility Guidelines](#accessibility-guidelines)

## Skeleton

A placeholder preview for content before it loads, reducing perceived loading time.

### When to Use
- When loading data that takes a noticeable amount of time
- To indicate that content is being loaded
- To prevent layout shifts when content loads

### Usage

```tsx
import { Skeleton } from '@/components/ui/skeleton';

function LoadingCard() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
```

## Progress

Displays an indicator showing the completion progress of a task, typically a long-running operation.

### When to Use
- For operations that take a long time to complete
- To show the current step in a multi-step process
- To indicate loading progress when the duration is known

### Usage

```tsx
import { Progress } from '@/components/ui/progress';

function UploadProgress({ progress }: { progress: number }) {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span>Uploading...</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}
```

## Tooltip

A brief, informative message that appears when a user interacts with an element.

### When to Use
- To provide additional context or information
- To explain the purpose of an icon button
- To show truncated content on hover

### Usage

```tsx
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>This is a tooltip</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
```

## Popover

A floating panel that appears when a user clicks or focuses on an element, typically used to display additional content or actions.

### When to Use
- For displaying complex forms or additional controls
- When you need to show more information than a tooltip can contain
- For contextual actions or menus

### Usage

```tsx
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  PopoverFooter,
} from '@/components/ui/popover';

function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <PopoverHeader>
          <PopoverTitle>Are you sure?</PopoverTitle>
          <PopoverDescription>
            This action cannot be undone.
          </PopoverDescription>
        </PopoverHeader>
        <PopoverFooter>
          <Button variant="outline" size="sm">Cancel</Button>
          <Button size="sm" className="ml-2">Confirm</Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
```

## Component Patterns

### Composition
All components follow the composition pattern, allowing for flexible and reusable UI elements. For example, the `Popover` component is composed of several subcomponents that can be used together or separately.

### Styling
- Use Tailwind CSS for styling
- Follow the design system's color palette and spacing scale
- Use the `cn` utility for conditional class names

### Props
- Use TypeScript interfaces for prop types
- Provide sensible defaults
- Document all props with JSDoc comments

## Accessibility Guidelines

### General
- Ensure all interactive elements are keyboard accessible
- Use semantic HTML elements where appropriate
- Provide appropriate ARIA attributes

### Focus Management
- Manage focus when opening/closing modals and dialogs
- Use `focus-trap-react` for modal dialogs when needed
- Ensure focus is returned to the triggering element when a dialog is closed

### Screen Readers
- Provide descriptive text for all interactive elements
- Use `aria-live` for dynamic content updates
- Test with screen readers to ensure proper announcements

### Motion
- Respect the user's motion preferences with `@media (prefers-reduced-motion: reduce)`
- Provide alternative states for users who prefer reduced motion
- Keep animations subtle and purposeful

## Best Practices

1. **Performance**
   - Use `React.memo` for components that don't need to re-render often
   - Lazy load components that aren't immediately visible
   - Optimize images and other assets

2. **Testing**
   - Write unit tests for all components
   - Test with different screen readers and browsers
   - Test keyboard navigation

3. **Documentation**
   - Document all props and their types
   - Provide usage examples
   - Include accessibility considerations
