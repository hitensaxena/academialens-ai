import type { Meta, StoryObj } from '@storybook/react';
import { SignUpForm } from '@/components/examples/signup-form';

const meta: Meta<typeof SignUpForm> = {
  title: 'Components/Form',
  component: SignUpForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SignUpForm>;

export const Default: Story = {
  args: {},
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
