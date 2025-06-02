import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';

export default {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    isLoading: {
      control: 'boolean',
    },
    isSuccess: {
      control: 'boolean',
    },
  },
} as Meta<typeof Switch>;

type Story = StoryObj<typeof Switch>;

const SwitchWithState = (args: any) => {
  const [checked, setChecked] = useState(args.checked || false);
  return <Switch {...args} checked={checked} onCheckedChange={setChecked} />;
};

export const Default: Story = {
  render: (args) => <SwitchWithState {...args} />,
  args: {
    label: 'Airplane Mode',
  },
};

export const WithDescription: Story = {
  render: (args) => <SwitchWithState {...args} />,
  args: {
    label: 'Enable notifications',
    description: 'Receive notifications when someone mentions you',
  },
};

export const Required: Story = {
  render: (args) => <SwitchWithState {...args} />,
  args: {
    label: 'I agree to the terms and conditions',
    required: true,
  },
};

export const WithError: Story = {
  render: (args) => <SwitchWithState {...args} />,
  args: {
    label: 'I agree to the terms and conditions',
    required: true,
    error: 'You must accept the terms and conditions',
  },
};

export const LoadingState: Story = {
  render: (args) => <SwitchWithState {...args} />,
  args: {
    label: 'Processing...',
    isLoading: true,
  },
};

export const SuccessState: Story = {
  render: (args) => <SwitchWithState {...args} checked={true} />,
  args: {
    label: 'Connected',
    isSuccess: true,
  },
};

export const Disabled: Story = {
  render: (args) => <SwitchWithState {...args} />,
  args: {
    label: 'Dark Mode',
    disabled: true,
  },
};

export const NoLabel: Story = {
  render: (args) => <SwitchWithState {...args} />,
  args: {
    'aria-label': 'Toggle setting',
  },
};
