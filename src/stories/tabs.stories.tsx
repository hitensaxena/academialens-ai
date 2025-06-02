import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@johndoe" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const VerticalTabs: Story = {
  render: () => (
    <Tabs defaultValue="account" className="flex gap-4 w-[600px]" orientation="vertical">
      <TabsList className="flex flex-col h-[200px] w-[180px]">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
        <TabsTrigger value="team" disabled>
          Team (disabled)
        </TabsTrigger>
        <TabsTrigger value="integrations">Integrations</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="flex-1">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@example.com" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="notifications" className="flex-1">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure how you receive notifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Email Notifications</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="marketing" className="font-normal">
                    Marketing emails
                  </Label>
                  <input
                    id="marketing"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="security" className="font-normal">
                    Security alerts
                  </Label>
                  <input
                    id="security"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save preferences</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="billing" className="flex-1">
        <Card>
          <CardHeader>
            <CardTitle>Billing</CardTitle>
            <CardDescription>Manage your subscription and payment methods.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Current Plan</Label>
                <p className="text-sm text-muted-foreground">Pro Plan - $29/month</p>
              </div>
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <p className="text-sm text-muted-foreground">Visa ending in 4242</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Update Payment</Button>
            <Button>Cancel Subscription</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="team" className="flex-1">
        <Card>
          <CardHeader>
            <CardTitle>Team</CardTitle>
            <CardDescription>Manage your team members and their permissions.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Team management is not available in your current plan. Upgrade to access this feature.
            </p>
          </CardContent>
          <CardFooter>
            <Button>Upgrade Plan</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="integrations" className="flex-1">
        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>Connect with third-party tools and services.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Available Integrations</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600">G</span>
                    </div>
                    <span className="text-sm font-medium">Google Drive</span>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-600">S</span>
                    </div>
                    <span className="text-sm font-medium">Slack</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const ControlledTabs: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('account');

    return (
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Make changes to your account here.</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => setActiveTab('billing')}>Go to Billing</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configure your notification preferences.</CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing</CardTitle>
              <CardDescription>Manage your subscription and payment methods.</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="outline" onClick={() => setActiveTab('account')}>
                Back to Account
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    );
  },
};
