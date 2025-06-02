import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useToast, type ToastActionElement } from '../components/ui/use-toast';
import { Toaster } from '../components/ui/toaster';
import { Button } from './button';
import { CheckCircle2, AlertCircle, XCircle, Info } from 'lucide-react';

// Helper function to create a toast action button
const createToastAction = (props: {
  altText: string;
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}): ToastActionElement => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  };

  const sizes = {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3 rounded-md',
    lg: 'h-11 px-8 rounded-md',
    icon: 'h-10 w-10',
  };

  const variant = props.variant || 'default';
  const size = props.size || 'default';

  const buttonProps = {
    onClick: props.onClick,
    'aria-label': props.altText,
    className: `${baseStyles} ${variants[variant]} ${sizes[size]} ${props.className || ''}`.trim(),
    children: props.children,
  };

  return React.createElement('button', buttonProps) as unknown as ToastActionElement;
};

// Wrapper component to demonstrate toast functionality
const ToastDemo = () => {
  const { toast } = useToast();

  const showToast = (variant = 'default') => {
    const commonProps = {
      title: variant.charAt(0).toUpperCase() + variant.slice(1) + ' Toast',
      description: 'This is a toast notification with ' + variant + ' variant.',
    };

    switch (variant) {
      case 'destructive':
        toast({
          ...commonProps,
          variant: 'destructive',
        });
        break;
      default:
        toast(commonProps);
    }
  };

  const showToastWithAction = () => {
    toast({
      title: 'Action Required',
      description: 'This toast has an action button.',
      action: createToastAction({
        altText: 'Undo',
        children: 'Undo',
        onClick: () => alert('Action clicked!'),
        variant: 'outline',
        size: 'sm',
      }),
    });
  };

  const showCustomToast = () => {
    toast({
      title: 'Custom Content',
      description: (
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span>Your changes have been saved successfully!</span>
        </div>
      ),
    });
  };

  const showToastWithIcon = () => {
    toast({
      title: 'With Icons',
      description: 'This toast includes custom icons.',
      icon: <Info className="h-5 w-5 text-blue-500" />,
    });
  };

  const showPromiseToast = () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve('Success!');
        } else {
          reject(new Error('Something went wrong'));
        }
      }, 2000);
    });

    toast.promise(promise, {
      loading: 'Loading...',
      success: (data) => `Successfully completed: ${data}`,
      error: (err) => `Error: ${err.message}`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => showToast('default')}>
          Show Default Toast
        </Button>
        <Button variant="outline" onClick={() => showToast('destructive')}>
          Show Destructive Toast
        </Button>
        <Button variant="outline" onClick={showToastWithAction}>
          Show Toast with Action
        </Button>
        <Button variant="outline" onClick={showCustomToast}>
          Show Custom Toast
        </Button>
        <Button variant="outline" onClick={showToastWithIcon}>
          Show Toast with Icon
        </Button>
        <Button variant="outline" onClick={showPromiseToast}>
          Show Promise Toast
        </Button>
      </div>
      <Toaster />
    </div>
  );
};

const meta: Meta<typeof ToastDemo> = {
  title: 'Components/Toast',
  component: ToastDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ToastDemo>;

export const Default: Story = {
  render: () => <ToastDemo />,
};

// Additional examples for documentation
export const BasicUsage: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium">Basic Usage</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => {
                toast({
                  title: 'Success',
                  description: 'Your changes have been saved.',
                });
              }}
            >
              Show Success Toast
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                toast({
                  variant: 'destructive',
                  title: 'Error',
                  description: 'There was an error saving your changes.',
                });
              }}
            >
              Show Error Toast
            </Button>
          </div>
        </div>

        <Toaster />
      </div>
    );
  },
};

export const WithCustomContent: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium">With Custom Content</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => {
                toast({
                  title: 'Order Placed',
                  description: (
                    <div className="space-y-1">
                      <p>Your order #1234 has been placed successfully.</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle2 className="mr-1 h-3 w-3 text-green-500" />
                        <span>Estimated delivery: June 15, 2025</span>
                      </div>
                    </div>
                  ),
                });
              }}
            >
              Show Order Confirmation
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                toast({
                  title: 'New Message',
                  description: (
                    <div className="flex items-start space-x-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium">JD</span>
                      </div>
                      <div>
                        <p className="font-medium">John Doe</p>
                        <p className="text-sm text-muted-foreground">
                          Hey there! How are you doing?
                        </p>
                      </div>
                    </div>
                  ),
                });
              }}
            >
              Show Message Preview
            </Button>
          </div>
        </div>

        <Toaster />
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium">With Icons</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => {
                toast({
                  title: 'Success',
                  description: 'Your changes have been saved.',
                  icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
                });
              }}
            >
              Success with Icon
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                toast({
                  title: 'Error',
                  description: 'There was an error processing your request.',
                  variant: 'destructive',
                  icon: <XCircle className="h-5 w-5" />,
                });
              }}
            >
              Error with Icon
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                toast({
                  title: 'Info',
                  description: 'This is an informational message.',
                  icon: <Info className="h-5 w-5 text-blue-500" />,
                });
              }}
            >
              Info with Icon
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                toast({
                  title: 'Warning',
                  description: 'This action cannot be undone.',
                  icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
                });
              }}
            >
              Warning with Icon
            </Button>
          </div>
        </div>

        <Toaster />
      </div>
    );
  },
};

export const WithActions: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium">With Actions</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => {
                toast({
                  title: 'Item moved to trash',
                  description: 'The item has been moved to the trash.',
                  action: createToastAction({
                    altText: 'Undo delete',
                    children: 'Undo',
                    onClick: () => alert('Undo delete'),
                    variant: 'outline',
                    size: 'sm',
                    className: 'text-foreground',
                  }),
                });
              }}
            >
              Show Undo Action
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                toast({
                  title: 'New update available',
                  description: 'A new version is available. Update now?',
                  action: (
                    <div className="flex gap-2">
                      {createToastAction({
                        altText: 'Later',
                        children: 'Later',
                        onClick: () => alert('Later'),
                        variant: 'outline',
                        size: 'sm',
                      })}
                      {createToastAction({
                        altText: 'Update',
                        children: 'Update',
                        onClick: () => alert('Updating...'),
                        variant: 'default',
                        size: 'sm',
                      })}
                    </div>
                  ),
                });
              }}
            >
              Show Multiple Actions
            </Button>
          </div>
        </div>

        <Toaster />
      </div>
    );
  },
};

export const PromiseExample: Story = {
  render: () => {
    const { toast } = useToast();

    const handlePromise = () => {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.5) {
            resolve('Success!');
          } else {
            reject(new Error('Something went wrong'));
          }
        }, 2000);
      });

      toast.promise(promise, {
        loading: 'Processing...',
        success: (data) => `Successfully completed: ${data}`,
        error: (err) => `Error: ${err.message}`,
      });
    };

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium">Promise Example</h3>
          <p className="text-sm text-muted-foreground">
            Click the button to simulate an async operation with loading, success, and error states.
          </p>
          <Button variant="outline" onClick={handlePromise}>
            Run Async Operation
          </Button>
        </div>

        <Toaster />
      </div>
    );
  },
};
