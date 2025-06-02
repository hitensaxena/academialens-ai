import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '../components/ui/popover';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm" htmlFor="width">
                Width
              </label>
              <input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8 rounded border px-2 text-sm"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm" htmlFor="maxWidth">
                Max. width
              </label>
              <input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8 rounded border px-2 text-sm"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithHeaderAndFooter: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">With Header & Footer</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <PopoverHeader>
          <PopoverTitle>Are you sure you want to continue?</PopoverTitle>
          <PopoverDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </PopoverDescription>
        </PopoverHeader>
        <PopoverFooter className="mt-4">
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button variant="destructive" size="sm" className="ml-2">
            Delete
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  ),
};

export const WithDifferentPlacements: Story = {
  render: () => {
    const placements = ['top', 'right', 'bottom', 'left'] as const;

    return (
      <div className="grid grid-cols-2 gap-4 p-12">
        {placements.map((side) => (
          <Popover key={side}>
            <PopoverTrigger asChild>
              <Button variant="outline">Popover on {side}</Button>
            </PopoverTrigger>
            <PopoverContent side={side} className="w-48">
              <div className="text-sm">This is a popover on the {side} side</div>
            </PopoverContent>
          </Popover>
        ))}
      </div>
    );
  },
};

export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Create Project</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Create Project</h4>
            <p className="text-sm text-muted-foreground">Create a new project to get started.</p>
          </div>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="project-name"
              >
                Project Name
              </label>
              <input
                id="project-name"
                placeholder="My Awesome Project"
                className="h-9 w-full rounded border px-3 py-1 text-sm"
              />
            </div>
            <div className="grid gap-1">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="description"
              >
                Description (optional)
              </label>
              <textarea
                id="description"
                placeholder="A brief description of your project"
                className="h-20 w-full rounded border px-3 py-2 text-sm"
              />
            </div>
            <div className="mt-2 flex justify-end space-x-2">
              <Button variant="outline" size="sm">
                Cancel
              </Button>
              <Button size="sm">Create</Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
