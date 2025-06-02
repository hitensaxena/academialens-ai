import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Alert, AlertTitle, AlertDescription } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'success', 'warning', 'info'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    children: (
      <>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components to your app using the cli.</AlertDescription>
      </>
    ),
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Alert>
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>
          This is a default alert. You can customize it as needed.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
      </Alert>

      <Alert variant="success">
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Your changes have been saved successfully!</AlertDescription>
      </Alert>

      <Alert variant="warning">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          Your storage is almost full. Consider upgrading your plan.
        </AlertDescription>
      </Alert>

      <Alert variant="info">
        <Info className="h-4 w-4" />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>Our app has been updated to the latest version.</AlertDescription>
      </Alert>
    </div>
  ),
};

export const WithDismiss: Story = {
  render: () => {
    const [showAlert, setShowAlert] = useState(true);

    if (!showAlert) {
      return <Button onClick={() => setShowAlert(true)}>Show Alert</Button>;
    }

    return (
      <Alert onDismiss={() => setShowAlert(false)}>
        <AlertTitle>Dismissable Alert</AlertTitle>
        <AlertDescription>This alert can be dismissed by clicking the X button.</AlertDescription>
      </Alert>
    );
  },
};

export const WithActions: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Alert>
        <div className="flex items-start justify-between">
          <div>
            <AlertTitle>New feature available!</AlertTitle>
            <AlertDescription className="mt-1">
              Check out our new dashboard features. The new dashboard comes with improved analytics
              and reporting.
            </AlertDescription>
          </div>
          <div className="flex space-x-2 ml-4">
            <Button variant="outline" size="sm">
              Learn more
            </Button>
          </div>
        </div>
      </Alert>

      <Alert variant="destructive">
        <div className="flex items-start justify-between">
          <div>
            <AlertTitle>Account Deletion</AlertTitle>
            <AlertDescription className="mt-1">
              Your account will be permanently deleted. This action cannot be undone.
            </AlertDescription>
          </div>
          <div className="flex space-x-2 ml-4">
            <Button
              variant="outline"
              size="sm"
              className="border-destructive/50 text-destructive hover:bg-destructive/10"
            >
              Cancel
            </Button>
            <Button variant="destructive" size="sm">
              Delete Account
            </Button>
          </div>
        </div>
      </Alert>
    </div>
  ),
};

export const WithList: Story = {
  render: () => (
    <Alert variant="info">
      <Info className="h-4 w-4" />
      <AlertTitle>Update available</AlertTitle>
      <AlertDescription className="mt-1">
        <p className="font-medium">What's new in v2.0.0:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>New dashboard design</li>
          <li>Improved performance</li>
          <li>Dark mode support</li>
          <li>Bug fixes and improvements</li>
        </ul>
        <Button variant="outline" size="sm" className="mt-3">
          Update Now
        </Button>
      </AlertDescription>
    </Alert>
  ),
};

export const WithCustomContent: Story = {
  render: () => (
    <Alert className="p-0 overflow-hidden">
      <div className="flex">
        <div className="bg-primary flex items-center px-4 py-3 text-primary-foreground">
          <Info className="h-5 w-5" />
        </div>
        <div className="flex-1 p-4">
          <AlertTitle>Custom Styled Alert</AlertTitle>
          <AlertDescription className="mt-1">
            This alert has a custom layout with a colored sidebar.
          </AlertDescription>
        </div>
        <button
          className="p-2 text-muted-foreground hover:text-foreground self-start"
          onClick={() => {}}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </Alert>
  ),
};
