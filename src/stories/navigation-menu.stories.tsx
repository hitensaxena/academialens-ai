import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../components/ui/navigation-menu';
import { cn } from '../lib/utils';

// Simple component for the navigation menu items
const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & {
    title: string;
    description: string;
  }
>(({ className, title, description, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{description}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

const meta: Meta<typeof NavigationMenu> = {
  title: 'Components/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof NavigationMenu>;

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">AcademiaLens UI</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem
                href="/docs"
                title="Introduction"
                description="Re-usable components built using Radix UI and Tailwind CSS."
              >
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem
                href="/docs/installation"
                title="Installation"
                description="How to install dependencies and structure your app."
              >
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem
                href="/docs/primitives/typography"
                title="Typography"
                description="Styles for headings, paragraphs, lists...etc"
              >
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem
                title="Alert Dialog"
                href="/docs/primitives/alert-dialog"
                description="A modal dialog that interrupts the user with important content and expects a response."
              >
                A modal dialog that interrupts the user with important content and expects a
                response.
              </ListItem>
              <ListItem
                title="Hover Card"
                href="/docs/primitives/hover-card"
                description="For sighted users to preview content available behind a link."
              >
                For sighted users to preview content available behind a link.
              </ListItem>
              <ListItem
                title="Progress"
                href="/docs/primitives/progress"
                description="Displays an indicator showing the completion progress of a task."
              >
                Displays an indicator showing the completion progress of a task.
              </ListItem>
              <ListItem
                title="Scroll-area"
                href="/docs/primitives/scroll-area"
                description="Visually or semantically separates content."
              >
                Visually or semantically separates content.
              </ListItem>
              <ListItem
                title="Tabs"
                href="/docs/primitives/tabs"
                description="A set of layered sections of content—known as tab panels—that are displayed one at a time."
              >
                A set of layered sections of content—known as tab panels—that are displayed one at a
                time.
              </ListItem>
              <ListItem
                title="Tooltip"
                href="/docs/primitives/tooltip"
                description="A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it."
              >
                A popup that displays information related to an element when the element receives
                keyboard focus or the mouse hovers over it.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="https://github.com/radix-ui"
            className={navigationMenuTriggerStyle()}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const WithActiveItem: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            className={cn(navigationMenuTriggerStyle(), 'bg-accent text-accent-foreground')}
          >
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Blog
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <span className="mr-2">🔍</span>
            Discover
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-1 p-2">
              <ListItem
                href="#"
                title="Trending"
                className="hover:bg-accent/50"
                description="See what's popular right now"
              >
                See what's popular
              </ListItem>
              <ListItem
                href="#"
                title="Categories"
                className="hover:bg-accent/50"
                description="Browse by category"
              >
                Browse by category
              </ListItem>
              <ListItem
                href="#"
                title="New Releases"
                className="hover:bg-accent/50"
                description="Latest additions to our collection"
              >
                Latest additions
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            <span className="mr-2">📚</span>
            Library
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            <span className="mr-2">🎧</span>
            Playlists
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const Responsive: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <div className="w-full max-w-4xl">
      <NavigationMenu>
        <NavigationMenuList className="flex-col md:flex-row">
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent className="w-full md:w-auto">
              <ul className="w-full p-2 md:w-[300px]">
                <ListItem href="#" title="All Products" description="Browse all available products">
                  All Products
                </ListItem>
                <ListItem href="#" title="New Arrivals" description="Check out our latest products">
                  New Arrivals
                </ListItem>
                <ListItem href="#" title="Best Sellers" description="Our most popular items">
                  Best Sellers
                </ListItem>
                <ListItem href="#" title="On Sale" description="Special offers and discounts">
                  On Sale
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
              Features
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
              Pricing
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#"
              className={cn(
                navigationMenuTriggerStyle(),
                'bg-primary text-primary-foreground hover:bg-primary/90'
              )}
            >
              Get Started
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
};
