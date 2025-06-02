import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
} as Meta<typeof RadioGroup>;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: {
    defaultValue: 'option-1',
    children: (
      <>
        <RadioGroupItem value="option-1" label="Option 1" />
        <RadioGroupItem value="option-2" label="Option 2" />
        <RadioGroupItem value="option-3" label="Option 3" />
      </>
    ),
  },
};

export const WithDescriptions: Story = {
  args: {
    defaultValue: 'option-1',
    label: 'Select an option',
    description: 'Choose the best option that fits your needs.',
    children: (
      <>
        <RadioGroupItem value="option-1" label="Option 1" description="This is the first option" />
        <RadioGroupItem value="option-2" label="Option 2" description="This is the second option" />
        <RadioGroupItem value="option-3" label="Option 3" description="This is the third option" />
      </>
    ),
  },
};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    defaultValue: 'option-1',
    children: (
      <>
        <RadioGroupItem value="option-1" label="Option 1" />
        <RadioGroupItem value="option-2" label="Option 2" />
        <RadioGroupItem value="option-3" label="Option 3" />
      </>
    ),
  },
};

export const WithError: Story = {
  args: {
    label: 'Select an option',
    error: 'Please select an option',
    required: true,
    children: (
      <>
        <RadioGroupItem value="option-1" label="Option 1" />
        <RadioGroupItem value="option-2" label="Option 2" />
        <RadioGroupItem value="option-3" label="Option 3" />
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'option-1',
    children: (
      <>
        <RadioGroupItem value="option-1" label="Option 1" />
        <RadioGroupItem value="option-2" label="Option 2" />
        <RadioGroupItem value="option-3" label="Option 3" />
      </>
    ),
  },
};
