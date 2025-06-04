'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField, // Add FormField back
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import apiClient from '@/lib/apiClient';

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters long'), // Add more complexity rules as needed
    confirmNewPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New passwords don't match",
    path: ['confirmNewPassword'], // Set the error on the confirmNewPassword field
  });

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

const ChangePasswordForm = () => {
  const { toast } = useToast();
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const onSubmit = async (values: PasswordFormValues) => {
    try {
      form.clearErrors(); // Clear previous errors if any
      const response = await apiClient.post('/users/me/password', {
        current_password: values.currentPassword,
        new_password: values.newPassword,
      });

      if (response.data?.msg === 'Password updated successfully') {
        toast({
          title: 'Password Changed',
          description: 'Your password has been successfully updated.',
        });
        form.reset(); // Reset form fields after successful submission
      } else {
        // This case might not be reached if API throws HTTP errors for failures
        throw new Error(response.data?.detail || 'Unknown error occurred');
      }
    } catch (error: unknown) {
      console.error('Failed to change password:', error);
      const errorMessage =
        error.response?.data?.detail ||
        error.message ||
        'Could not change your password. Please try again.';
      toast({
        variant: 'destructive',
        title: 'Password Change Failed',
        description: errorMessage,
      });
    }
  };

  return (
    <Form form={form} onSubmit={onSubmit} className="space-y-6">
      <Controller
        control={form.control}
        name="currentPassword"
        render={({ field }) => (
          <FormField name="currentPassword">
            <div className="space-y-2">
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your current password" {...field} />
              </FormControl>
              <FormMessage />
            </div>
          </FormField>
        )}
      />
      <Controller
        control={form.control}
        name="newPassword"
        render={({ field }) => (
          <FormField name="newPassword">
            <div className="space-y-2">
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your new password" {...field} />
              </FormControl>
              <FormMessage />
            </div>
          </FormField>
        )}
      />
      <Controller
        control={form.control}
        name="confirmNewPassword"
        render={({ field }) => (
          <FormField name="confirmNewPassword">
            <div className="space-y-2">
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Confirm your new password" {...field} />
              </FormControl>
              <FormMessage />
            </div>
          </FormField>
        )}
      />
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? 'Changing...' : 'Change Password'}
      </Button>
    </Form>
  );
};

export default ChangePasswordForm;
