'use client';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField, // Add FormField
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import useUserStore from '@/store/userStore'; // Import the store
import apiClient from '@/lib/apiClient';

const profileFormSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must be 50 characters or less'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be 50 characters or less'),
  bio: z.string().max(500, 'Bio must be 500 characters or less').optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const UpdateProfileForm = () => {
  const { toast } = useToast();
  const { user, fetchCurrentUser, isLoading: isUserLoading, error: userError } = useUserStore();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      // Default values will be updated by useEffect once user data is fetched
      firstName: '',
      lastName: '',
      bio: '',
    },
  });

  useEffect(() => {
    // Fetch user data if not already available and not currently loading/in error state
    if (!user && !isUserLoading && !userError) {
      fetchCurrentUser();
    }
  }, [user, isUserLoading, userError, fetchCurrentUser]);

  useEffect(() => {
    // Once user data is available, reset the form with it
    if (user) {
      form.reset({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        bio: user.bio || '',
      });
    }
  }, [user, form.reset, form]);

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user?.id) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'User ID not found. Cannot update profile.',
      });
      return;
    }

    try {
      form.clearErrors(); // Clear previous errors
      const response = await apiClient.put(`/users/${user.id}`, values);

      if (response.data) {
        // Assuming your API client returns data in response.data
        toast({
          title: 'Profile Updated',
          description: 'Your personal information has been successfully updated.',
        });
        fetchCurrentUser(); // Re-fetch user data to update the store
      } else {
        throw new Error('No data returned from API');
      }
    } catch (error: unknown) {
      console.error('Failed to update profile:', error);
      const errorMessage =
        error.response?.data?.detail ||
        error.message ||
        'Could not update your profile. Please try again.';
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: errorMessage,
      });
      // Optionally set form errors if API returns field-specific issues
      // if (error.response?.data?.errors) {
      //   Object.entries(error.response.data.errors).forEach(([key, value]) => {
      //     form.setError(key as keyof ProfileFormValues, { type: 'manual', message: value as string });
      //   });
      // }
    }
  };

  if (isUserLoading) {
    return <p className="text-foreground">Loading user profile...</p>; // Or a spinner component
  }

  if (userError) {
    return <p className="text-destructive">Error loading profile: {userError}</p>;
  }

  if (!user) {
    // This case might occur if fetchCurrentUser fails silently or if called on a page where user must be authenticated
    // but is not. Consider redirecting or showing a more specific message.
    return (
      <p className="text-muted-foreground">
        User data not available. Please ensure you are logged in.
      </p>
    );
  }

  return (
    <Form form={form} onSubmit={onSubmit} className="space-y-6">
      <Controller
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormField name="firstName">
            <div className="space-y-2">
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Your first name" {...field} />
              </FormControl>
              <FormMessage />
            </div>
          </FormField>
        )}
      />
      <Controller
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormField name="lastName">
            <div className="space-y-2">
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Your last name" {...field} />
              </FormControl>
              <FormMessage />
            </div>
          </FormField>
        )}
      />
      <Controller
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormField name="bio">
            <div className="space-y-2">
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </div>
          </FormField>
        )}
      />
      <Button type="submit" disabled={form.formState.isSubmitting || isUserLoading}>
        {form.formState.isSubmitting ? 'Updating...' : 'Update Profile'}
      </Button>
    </Form>
  );
};

export default UpdateProfileForm;
