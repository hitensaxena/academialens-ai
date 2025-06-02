import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardMedia,
  CardAction,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'destructive', 'outline', 'ghost'],
    },
    elevation: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'none'],
    },
    hoverable: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card className="w-[350px]" {...args}>
      <CardHeader>
        <CardTitle>Default Card</CardTitle>
        <CardDescription>A simple card with title and description</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          This is a basic card component that can be used to display content in a clean and
          organized way.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Continue</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithMedia: Story = {
  render: (args) => (
    <Card className="w-[400px] overflow-hidden" {...args}>
      <CardMedia
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7d1a2f?w=800&auto=format&fit=crop&q=60"
        alt="Card media"
        className="h-48"
      />
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>Featured Post</CardTitle>
            <CardDescription>By John Doe • 2 days ago</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          This is a card with a header, media content, and footer. It's great for displaying blog
          posts, articles, or product listings.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Badge variant="secondary">Design</Badge>
          <Badge variant="secondary">UI</Badge>
        </div>
        <Button variant="ghost" size="sm">
          Read more →
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Horizontal: Story = {
  render: (args) => (
    <Card className="flex w-[600px] overflow-hidden" {...args}>
      <div className="w-1/3">
        <CardMedia
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60"
          alt="Product"
          className="h-full object-cover"
        />
      </div>
      <div className="w-2/3 flex flex-col">
        <CardHeader>
          <CardTitle>Horizontal Card</CardTitle>
          <CardDescription>Perfect for product displays</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-sm mb-4">
            This horizontal layout is great for showcasing products, team members, or any content
            where you want to combine an image with descriptive text.
          </p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Price</span>
              <span className="font-medium">$99.99</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">In Stock</span>
              <span className="text-sm">24 items</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <Button variant="outline">Add to cart</Button>
          <Button>Buy now</Button>
        </CardFooter>
      </div>
    </Card>
  ),
};

export const WithAction: Story = {
  render: (args) => (
    <Card className="w-[300px] text-center" {...args}>
      <CardContent className="pt-6">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <CardTitle>Security First</CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Your data is encrypted and secure with our advanced security measures.
        </p>
      </CardContent>
      <CardFooter className="justify-center">
        <CardAction>Learn more</CardAction>
      </CardFooter>
    </Card>
  ),
};

export const WithVariants: Story = {
  render: (args) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card variant="default" className="h-full">
        <CardHeader>
          <CardTitle>Default</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Standard card with subtle styling.</p>
        </CardContent>
      </Card>

      <Card variant="primary" className="h-full">
        <CardHeader>
          <CardTitle>Primary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Highlight important information.</p>
        </CardContent>
      </Card>

      <Card variant="secondary" className="h-full">
        <CardHeader>
          <CardTitle>Secondary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">For less prominent content.</p>
        </CardContent>
      </Card>

      <Card variant="destructive" className="h-full">
        <CardHeader>
          <CardTitle>Destructive</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">For error or warning messages.</p>
        </CardContent>
      </Card>

      <Card variant="outline" className="h-full">
        <CardHeader>
          <CardTitle>Outline</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Subtle border for a clean look.</p>
        </CardContent>
      </Card>

      <Card variant="ghost" className="h-full">
        <CardHeader>
          <CardTitle>Ghost</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Minimal style for subtle content.</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    hoverable: true,
    className: 'cursor-pointer transition-all duration-200',
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Hover over me</CardTitle>
        <CardDescription>This card has hover effects</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Try hovering over this card to see the interactive effect. The card will elevate and show
          a subtle shadow.
        </p>
      </CardContent>
    </Card>
  ),
};
