import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story: React.ComponentType) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithCustomContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Custom Content</Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-[200px] text-center">
        <h4 className="font-semibold mb-1">Did you know?</h4>
        <p className="text-sm text-muted-foreground">
          This tooltip can contain any React node, including custom components and rich content.
        </p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithDelayedOpen: Story = {
  render: () => (
    <Tooltip delayDuration={500}>
      <TooltipTrigger asChild>
        <Button variant="outline">Delayed Tooltip (500ms)</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This tooltip has a 500ms delay before showing</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithDifferentPlacements: Story = {
  render: () => {
    const placements = ['top', 'right', 'bottom', 'left'] as const;

    return (
      <div className="grid grid-cols-2 gap-4 p-12">
        {placements.map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger asChild>
              <Button variant="outline">Tooltip on {side}</Button>
            </TooltipTrigger>
            <TooltipContent side={side}>
              <p>Tooltip on the {side} side</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    );
  },
};

export const WithDisabledElement: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" disabled>
          Disabled Button
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This button is disabled</p>
      </TooltipContent>
    </Tooltip>
  ),
};
