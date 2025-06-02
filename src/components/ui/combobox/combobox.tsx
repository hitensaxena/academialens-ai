'use client';

import * as React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Command as CommandPrimitive } from 'cmdk';
import { Check, ChevronsUpDown, Loader2, X } from 'lucide-react';

import { cn } from '@/lib/utils';

// Types
export interface Option {
  value: string;
  label: string;
  disabled?: boolean;
  [key: string]: unknown;
}

interface ComboboxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** The options to display in the combobox */
  options: Option[];
  /** The currently selected value(s) */
  value?: string | string[];
  /** Callback when the selected value changes */
  onValueChange?: (value: string | string[]) => void;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Label for the combobox */
  label?: string;
  /** Hide the label visually */
  hideLabel?: boolean;
  /** Description text below the combobox */
  description?: string;
  /** Error message to display */
  error?: string;
  /** Disable the combobox */
  disabled?: boolean;
  /** Show loading state */
  loading?: boolean;
  /** Allow multiple selection */
  multiple?: boolean;
  /** Allow searching through options */
  searchable?: boolean;
  /** Text to display when no options are found */
  notFoundText?: string;
  /** Class name for the root element */
  className?: string;
  /** Class name for the trigger button */
  triggerClassName?: string;
  /** Class name for the dropdown content */
  contentClassName?: string;
  /** Class name for the dropdown list */
  listClassName?: string;
  /** Class name for each item in the list */
  itemClassName?: string;
  /** Close the dropdown after selection */
  closeOnSelect?: boolean;
  /** Custom render function for options */
  renderOption?: (option: Option, selected: boolean) => React.ReactNode;
  /** Custom render function for the selected value */
  renderValue?: (selected: string | string[], options: Option[]) => React.ReactNode;
  /** Custom filter function for search */
  filterFn?: (option: Option, search: string) => boolean;
  /** ID for the description element */
  'aria-describedby'?: string;
  /** Class name for the container element */
  containerClassName?: string;
  /** ID for the combobox */
  id?: string;
}

/**
 * A combobox component that combines a text input with a dropdown list of options.
 * Supports single and multiple selection, search, and custom rendering.
 */
const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>((props) => {
  const {
    options = [],
    value,
    onValueChange,
    placeholder = 'Select an option',
    label,
    hideLabel = false,
    description,
    error,
    disabled = false,
    loading = false,
    multiple = false,
    searchable = true,
    notFoundText = 'No options found',
    className,
    triggerClassName,
    contentClassName,
    listClassName,
    itemClassName,
    closeOnSelect = true,
    renderOption,
    renderValue,
    filterFn,
  } = props;

  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  // ref is used internally by Radix UI components
  const [selected, setSelected] = React.useState<string | string[]>(
    multiple ? (Array.isArray(value) ? value : value ? [value] : []) : value || ''
  );

  // Update internal state when value prop changes
  React.useEffect(() => {
    setSelected(multiple ? (Array.isArray(value) ? value : value ? [value] : []) : value || '');
  }, [value, multiple]);

  // Filter options based on search
  const filteredOptions = React.useMemo(() => {
    if (!search.trim()) return options;

    const searchLower = search.toLowerCase();
    return options.filter((option) =>
      filterFn
        ? filterFn(option, search)
        : option.label?.toString().toLowerCase().includes(searchLower) ||
          option.value?.toString().toLowerCase().includes(searchLower)
    );
  }, [options, search, filterFn]);

  // Handle selection change
  const handleSelect = (selectedValue: string) => {
    if (multiple) {
      const currentSelected = Array.isArray(selected) ? [...selected] : [];
      const newSelected = currentSelected.includes(selectedValue)
        ? currentSelected.filter((v) => v !== selectedValue)
        : [...currentSelected, selectedValue];

      setSelected(newSelected);
      onValueChange?.(newSelected);
    } else {
      setSelected(selectedValue);
      onValueChange?.(selectedValue);
      if (closeOnSelect) {
        setOpen(false);
      }
    }

    // Reset search after selection
    if (!multiple) {
      setSearch('');
    }
  };

  // Handle clear selection
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (multiple) {
      setSelected([]);
      onValueChange?.([]);
    } else {
      setSelected('');
      onValueChange?.('');
    }
    setSearch('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Check if an option is selected
  const isSelected = (optionValue: string) => {
    if (multiple) {
      return Array.isArray(selected) ? selected.includes(optionValue) : false;
    }
    return selected === optionValue;
  };

  // Get selected options
  const getSelectedOptions = () => {
    if (multiple && Array.isArray(selected)) {
      return options.filter((option) => selected.includes(option.value));
    } else if (!multiple && typeof selected === 'string') {
      return options.find((option) => option.value === selected) || null;
    }
    return multiple ? [] : null;
  };

  // Render selected value(s)
  const renderSelected = () => {
    if (multiple) {
      const selectedOptions = getSelectedOptions() as Option[];
      if (!selectedOptions || selectedOptions.length === 0) {
        return <span className="text-muted-foreground">{placeholder}</span>;
      }
      if (renderValue) {
        return renderValue(
          selectedOptions.map((opt) => opt.value),
          selectedOptions
        );
      }
      return (
        <div className="flex flex-wrap gap-1">
          {selectedOptions.map((option) => (
            <span
              key={option.value}
              className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
            >
              {option.label}
            </span>
          ))}
        </div>
      );
    }

    const selectedOption = getSelectedOptions() as Option | null;
    if (!selectedOption) {
      return <span className="text-muted-foreground">{placeholder}</span>;
    }
    if (renderValue) {
      return renderValue(selectedOption.value, [selectedOption]);
    }
    return <span>{selectedOption.label}</span>;
  };

  const comboboxId = React.useId();
  const descriptionId = `${comboboxId}-description`;
  const errorId = `${comboboxId}-error`;
  const hasError = !!error;
  const isDisabled = disabled || loading;

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label
          htmlFor={comboboxId}
          className={cn(
            'mb-1 block text-sm font-medium leading-none',
            hideLabel && 'sr-only',
            hasError ? 'text-destructive' : 'text-foreground',
            isDisabled && 'text-muted-foreground/50'
          )}
        >
          {label}
        </label>
      )}
      {description && (
        <p
          id={descriptionId}
          className={cn(
            'mb-2 text-sm',
            hasError ? 'text-destructive' : 'text-muted-foreground',
            isDisabled && 'text-muted-foreground/50'
          )}
        >
          {description}
        </p>
      )}
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <div
            className={cn(
              'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
              'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              hasError && 'border-destructive focus-within:ring-destructive',
              triggerClassName
            )}
            onClick={() => !isDisabled && inputRef.current?.focus()}
          >
            <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
              {renderSelected()}
            </div>
            <div className="flex items-center space-x-1">
              {!isDisabled && (multiple || !selected) && (
                <button
                  type="button"
                  className="rounded-full p-0.5 text-muted-foreground hover:bg-accent hover:text-foreground"
                  onClick={handleClear}
                  aria-label="Clear selection"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </div>
          </div>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className={cn(
              'relative z-50 w-[var(--radix-popover-trigger-width)] min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md',
              'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
              'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
              contentClassName
            )}
            sideOffset={4}
            align="start"
            onOpenAutoFocus={(e) => {
              e.preventDefault();
              inputRef.current?.focus();
            }}
          >
            <CommandPrimitive
              className="overflow-hidden rounded-md"
              filter={() => 1} // Disable default filtering
            >
              {searchable && (
                <div className="flex items-center border-b px-3">
                  <CommandPrimitive.Input
                    ref={inputRef}
                    value={search}
                    onValueChange={setSearch}
                    placeholder="Search..."
                    className={cn(
                      'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none',
                      'placeholder:text-muted-foreground',
                      'disabled:cursor-not-allowed disabled:opacity-50'
                    )}
                  />
                  {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                </div>
              )}
              <CommandPrimitive.List
                className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden p-1', listClassName)}
              >
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => {
                    const selected = isSelected(option.value);
                    return (
                      <CommandPrimitive.Item
                        key={option.value}
                        value={option.value}
                        onSelect={() => handleSelect(option.value)}
                        className={cn(
                          'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
                          'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                          'focus:bg-accent focus:text-accent-foreground',
                          selected && 'bg-accent text-accent-foreground',
                          option.disabled && 'opacity-50',
                          itemClassName
                        )}
                        disabled={option.disabled}
                      >
                        {renderOption ? (
                          renderOption(option, selected)
                        ) : (
                          <>
                            <span className="flex-1">{option.label}</span>
                            {selected && <Check className="ml-2 h-4 w-4" />}
                          </>
                        )}
                      </CommandPrimitive.Item>
                    );
                  })
                ) : (
                  <div className="py-6 text-center text-sm text-muted-foreground">
                    {notFoundText}
                  </div>
                )}
              </CommandPrimitive.List>
            </CommandPrimitive>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      {hasError && (
        <p id={errorId} className="mt-1 text-sm font-medium text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

Combobox.displayName = 'Combobox';

export { Combobox };
