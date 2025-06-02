import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '../components/ui/progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 33,
  },
};

export const Indeterminate: Story = {
  args: {
    value: null,
  },
};

export const CustomColors: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm font-medium">Uploading files...</span>
          <span className="text-sm text-muted-foreground">45%</span>
        </div>
        <Progress value={45} className="h-2" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm font-medium">Processing...</span>
          <span className="text-sm text-muted-foreground">75%</span>
        </div>
        <Progress value={75} className="h-2 bg-red-100 [&>div]:bg-red-600" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm font-medium">Completed</span>
          <span className="text-sm text-muted-foreground">100%</span>
        </div>
        <Progress value={100} className="h-2 bg-green-100 [&>div]:bg-green-600" />
      </div>
    </div>
  ),
};

export const WithSteps: Story = {
  render: () => {
    const steps = [
      { label: 'Account', value: 25 },
      { label: 'Profile', value: 50 },
      { label: 'Preferences', value: 75 },
      { label: 'Complete', value: 100 },
    ];

    return (
      <div className="w-full max-w-md space-y-6">
        <div className="relative">
          <Progress value={50} className="h-2" />
          <div className="absolute inset-0 flex items-center justify-between px-1">
            {steps.map((step, index) => (
              <div
                key={step.label}
                className={`h-3 w-3 rounded-full ${step.value <= 50 ? 'bg-primary' : 'bg-muted'}`}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          {steps.map((step) => (
            <span key={step.label}>{step.label}</span>
          ))}
        </div>
      </div>
    );
  },
};
