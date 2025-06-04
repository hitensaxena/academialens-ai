'use client';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField, // Add FormField
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';

const notificationPreferencesSchema = z.object({
  emailPublicationAlerts: z
    .boolean()
    .describe('Receive email notifications for new publication alerts relevant to your interests.'),
  emailMessageNotifications: z
    .boolean()
    .describe('Receive email notifications for new direct messages or important communications.'),
});

type NotificationPreferencesValues = z.infer<typeof notificationPreferencesSchema>;

// Mock API call to fetch current preferences
const fetchNotificationPreferences = async (): Promise<NotificationPreferencesValues> => {
  console.log('Fetching notification preferences...');
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  // Simulate fetching existing preferences
  return {
    emailPublicationAlerts: true, // Example value
    emailMessageNotifications: false, // Example value
  };
};

// Mock API call to update preferences
const updateNotificationPreferences = async (
  data: NotificationPreferencesValues
): Promise<void> => {
  console.log('Updating notification preferences:', data);
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Simulate a successful update
};

const NotificationPreferencesForm = () => {
  const { toast } = useToast();
  const form = useForm<NotificationPreferencesValues>({
    resolver: zodResolver(notificationPreferencesSchema),
    defaultValues: {
      emailPublicationAlerts: false,
      emailMessageNotifications: false,
    },
  });

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const preferences = await fetchNotificationPreferences();
        form.reset(preferences); // Set form values with fetched data
      } catch (error) {
        console.error('Failed to fetch notification preferences:', error);
        toast({
          title: 'Error',
          description: 'Could not load your notification preferences.',
          variant: 'destructive',
        });
      }
    };
    loadPreferences();
  }, [form, toast]);

  const onSubmit = async (data: NotificationPreferencesValues) => {
    try {
      await updateNotificationPreferences(data);
      toast({
        title: 'Preferences Updated',
        description: 'Your notification preferences have been successfully updated.',
      });
    } catch (error) {
      console.error('Failed to update notification preferences:', error);
      toast({
        title: 'Update Failed',
        description: 'Could not update your notification preferences. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form form={form} onSubmit={onSubmit} className="space-y-8">
      <Controller
        control={form.control}
        name="emailPublicationAlerts"
        render={({ field }) => (
          <FormField name="emailPublicationAlerts">
            <div className="flex flex-row items-center justify-between rounded-lg border bg-muted p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Publication Alerts</FormLabel>
                <FormDescription>
                  Receive email notifications for new publications relevant to your interests.
                </FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </div>
          </FormField>
        )}
      />
      <Controller
        control={form.control}
        name="emailMessageNotifications"
        render={({ field }) => (
          <FormField name="emailMessageNotifications">
            <div className="flex flex-row items-center justify-between rounded-lg border bg-muted p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Message Notifications</FormLabel>
                <FormDescription>
                  Receive email notifications for new direct messages or important communications.
                </FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </div>
          </FormField>
        )}
      />
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? 'Saving...' : 'Save Preferences'}
      </Button>
    </Form>
  );
};

export default NotificationPreferencesForm;
