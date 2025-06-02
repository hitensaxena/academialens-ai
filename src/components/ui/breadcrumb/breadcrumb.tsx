import * as React from 'react';
import * as BreadcrumbPrimitive from '@radix-ui/react-breadcrumbs';
import { ChevronRight } from 'lucide-react';

import { cn } from '../../lib/utils';

const Breadcrumb = React.forwardRef<
  React.ElementRef<typeof BreadcrumbPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof BreadcrumbPrimitive.Root>
>(({ ...props }, ref) => (
  <BreadcrumbPrimitive.Root
    ref={ref}
    className={cn('flex items-center space-x-1 text-sm text-muted-foreground', props.className)}
    {...props}
  />
));
Breadcrumb.displayName = 'Breadcrumb';

const BreadcrumbList = React.forwardRef<
  React.ElementRef<typeof BreadcrumbPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof BreadcrumbPrimitive.List>
>(({ className, ...props }, ref) => (
  <BreadcrumbPrimitive.List
    ref={ref}
    className={cn('flex flex-wrap items-center gap-1.5 break-words text-sm sm:gap-2.5', className)}
    {...props}
  />
));
BreadcrumbList.displayName = 'BreadcrumbList';

const BreadcrumbItem = React.forwardRef<
  React.ElementRef<typeof BreadcrumbPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof BreadcrumbPrimitive.Item>
>(({ className, ...props }, ref) => (
  <BreadcrumbPrimitive.Item
    ref={ref}
    className={cn('inline-flex items-center gap-1.5', className)}
    {...props}
  />
));
BreadcrumbItem.displayName = 'BreadcrumbItem';

const BreadcrumbLink = React.forwardRef<
  React.ElementRef<typeof BreadcrumbPrimitive.Link>,
  React.ComponentPropsWithoutRef<typeof BreadcrumbPrimitive.Link>
>(({ className, ...props }, ref) => (
  <BreadcrumbPrimitive.Link
    ref={ref}
    className={cn('transition-colors hover:text-foreground', className)}
    {...props}
  />
));
BreadcrumbLink.displayName = 'BreadcrumbLink';

const BreadcrumbPage = React.forwardRef<
  React.ElementRef<typeof BreadcrumbPrimitive.Page>,
  React.ComponentPropsWithoutRef<typeof BreadcrumbPrimitive.Page>
>(({ className, ...props }, ref) => (
  <BreadcrumbPrimitive.Page
    ref={ref}
    className={cn('font-normal text-foreground', className)}
    {...props}
  />
));
BreadcrumbPage.displayName = 'BreadcrumbPage';

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<'li'>) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn('text-muted-foreground', className)}
    {...props}
  >
    {children || <ChevronRight className="h-4 w-4" />}
  </li>
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <span className="text-muted-foreground">...</span>
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
