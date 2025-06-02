import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '../components/ui/dialog';

// Simple button component for the stories
const Button = ({ children, ...props }: any) => (
  <button
    {...props}
    style={{
      padding: '8px 16px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      background: '#f0f0f0',
      cursor: 'pointer',
      ...props.style,
    }}
  >
    {children}
  </button>
);

// Simple input component for the stories
const Input = (props: any) => (
  <input
    {...props}
    style={{
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      width: '100%',
      ...props.style,
    }}
  />
);

// Simple label component for the stories
const Label = ({ children, ...props }: any) => (
  <label {...props} style={{ marginBottom: '4px', display: 'block' }}>
    {children}
  </label>
);

// Simple checkbox component for the stories
const Checkbox = (props: any) => (
  <input type="checkbox" {...props} style={{ marginRight: '8px' }} />
);

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultOpen: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

// Define the type for story args
type DialogStoryArgs = React.ComponentProps<typeof Dialog> & {
  defaultOpen?: boolean;
};

export const Default: Story = {
  render: (args: DialogStoryArgs) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Dialog {...args} open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <div style={{ padding: '16px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox id="confirm" />
              <Label htmlFor="confirm">I understand the consequences</Label>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button style={{ background: '#ef4444', color: 'white' }}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

export const WithForm: Story = {
  render: (args: DialogStoryArgs) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Dialog {...args} open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>Edit Profile</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Make changes to your profile here.</DialogDescription>
          </DialogHeader>
          <div style={{ padding: '16px 0' }}>
            <div style={{ marginBottom: '16px' }}>
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="John Doe" style={{ marginTop: '4px' }} />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@johndoe" style={{ marginTop: '4px' }} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsOpen(false)}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

export const CustomSize: Story = {
  render: (args: DialogStoryArgs) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Dialog {...args} open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>Open Large Dialog</Button>
        </DialogTrigger>
        <DialogContent style={{ maxWidth: '600px' }}>
          <DialogHeader>
            <DialogTitle>Large Dialog</DialogTitle>
            <DialogDescription>This dialog has a custom width set to 600px.</DialogDescription>
          </DialogHeader>
          <div style={{ padding: '16px 0' }}>
            <p>This is a larger dialog that can accommodate more content.</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

export const WithoutCloseButton: Story = {
  render: (args: DialogStoryArgs) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Dialog {...args} open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>Open Non-Closable Dialog</Button>
        </DialogTrigger>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Important Notice</DialogTitle>
          </DialogHeader>
          <div style={{ padding: '16px 0' }}>
            <p>This dialog cannot be closed by clicking outside or pressing Escape.</p>
            <p style={{ marginTop: '8px', fontSize: '0.875rem', color: '#666' }}>
              You must use the button below to close this dialog.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsOpen(false)}>I Understand</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

export const AlertDialog: Story = {
  render: (args: DialogStoryArgs) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Dialog {...args} open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button style={{ background: '#ef4444', color: 'white' }}>Delete Item</Button>
        </DialogTrigger>
        <DialogContent style={{ maxWidth: '425px' }}>
          <DialogHeader>
            <div
              style={{
                margin: '0 auto',
                height: '48px',
                width: '48px',
                borderRadius: '9999px',
                background: '#fee2e2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <DialogTitle style={{ textAlign: 'center', marginTop: '16px' }}>
              Delete item?
            </DialogTitle>
          </DialogHeader>
          <div style={{ padding: '16px 0', textAlign: 'center' }}>
            <p style={{ marginBottom: '16px', color: '#666' }}>
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
          </div>
          <DialogFooter style={{ justifyContent: 'center', gap: '8px' }}>
            <Button
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: '1px solid #d1d5db' }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                alert('Item deleted!');
                setIsOpen(false);
              }}
              style={{ background: '#ef4444', color: 'white' }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

export const ScrollableContent: Story = {
  render: (args: DialogStoryArgs) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Dialog {...args} open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>Open Scrollable Dialog</Button>
        </DialogTrigger>
        <DialogContent style={{ maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
          <DialogHeader>
            <DialogTitle>Scrollable Content</DialogTitle>
            <DialogDescription>
              This dialog has scrollable content that exceeds the viewport height.
            </DialogDescription>
          </DialogHeader>
          <div style={{ overflowY: 'auto', padding: '16px 0' }}>
            {Array.from({ length: 20 }).map((_, i) => (
              <p key={i} style={{ marginBottom: '16px' }}>
                This is paragraph {i + 1}. Scroll down to see more content.
                {i % 5 === 0 && <br />}
              </p>
            ))}
          </div>
          <DialogFooter style={{ marginTop: 'auto' }}>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};
