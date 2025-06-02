import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Combobox } from '@/components/ui/combobox';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    multiple: { control: 'boolean' },
    searchable: { control: 'boolean' },
    closeOnSelect: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

const FRAMEWORKS = [
  { value: 'next', label: 'Next.js' },
  { value: 'svelte', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
  { value: 'gatsby', label: 'Gatsby' },
  { value: 'hydrogen', label: 'Hydrogen' },
];

export const Default: Story = {
  args: {
    options: FRAMEWORKS,
    placeholder: 'Select a framework',
    label: 'Framework',
    description: 'Select your favorite framework',
  },
};

export const MultipleSelection: Story = {
  args: {
    options: FRAMEWORKS,
    placeholder: 'Select frameworks',
    label: 'Frameworks',
    description: 'Select multiple frameworks',
    multiple: true,
  },
};

export const Searchable: Story = {
  args: {
    options: FRAMEWORKS,
    placeholder: 'Search frameworks...',
    label: 'Search Frameworks',
    searchable: true,
  },
};

export const WithError: Story = {
  args: {
    options: FRAMEWORKS,
    placeholder: 'Select a framework',
    label: 'Framework',
    error: 'This field is required',
  },
};

export const Disabled: Story = {
  args: {
    options: FRAMEWORKS,
    placeholder: 'Select a framework',
    label: 'Framework',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    options: [],
    placeholder: 'Loading frameworks...',
    label: 'Framework',
    loading: true,
  },
};

// Form example with validation
const FormSchema = z.object({
  framework: z.string({
    required_error: 'Please select a framework',
  }),
  frameworks: z
    .array(z.string())
    .min(1, 'Please select at least one framework')
    .max(3, 'You can select up to 3 frameworks'),
});

type FormValues = z.infer<typeof FormSchema>;

export const WithReactHookForm: Story = {
  render: () => {
    const form = useForm<FormValues>({
      resolver: zodResolver(FormSchema),
    });

    function onSubmit(data: FormValues) {
      alert(JSON.stringify(data, null, 2));
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[400px] space-y-6">
          <FormField
            control={form.control}
            name="framework"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Single Selection</FormLabel>
                <FormControl>
                  <Combobox options={FRAMEWORKS} placeholder="Select a framework" {...field} />
                </FormControl>
                <FormDescription>Select your favorite framework</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="frameworks"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Multiple Selection</FormLabel>
                <FormControl>
                  <Combobox
                    options={FRAMEWORKS}
                    placeholder="Select frameworks"
                    multiple
                    {...field}
                  />
                </FormControl>
                <FormDescription>Select up to 3 frameworks</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    );
  },
};

// Custom rendering example
export const CustomRendering: Story = {
  args: {
    options: FRAMEWORKS,
    placeholder: 'Select a framework',
    label: 'Custom Render',
    renderOption: (option, selected) => (
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-primary" />
        <span className={selected ? 'font-bold' : ''}>{option.label}</span>
        {selected && <span className="ml-auto text-xs opacity-60">✓</span>}
      </div>
    ),
    renderValue: (selected, options) => {
      if (Array.isArray(selected)) {
        return `${selected.length} frameworks selected`;
      }
      const selectedOption = options.find((opt) => opt.value === selected);
      return selectedOption ? `⭐ ${selectedOption.label}` : 'Select...';
    },
  },
};
