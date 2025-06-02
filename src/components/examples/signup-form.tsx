'use client';

import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  useForm,
} from '@/components/ui/form';

// Define the form schema using Zod
const signUpSchema = z
  .object({
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const form = useForm<SignUpFormValues>({
    schema: signUpSchema,
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const onSubmit = (data: SignUpFormValues) => {
    console.log('Form submitted:', data);
    // Handle form submission
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground">Enter your information to create an account</p>
      </div>

      <Form form={form} onSubmit={onSubmit}>
        <div className="space-y-4">
          <FormField
            name="email"
            render={() => (
              <div className="space-y-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email@example.com" />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          <FormField
            name="password"
            render={() => (
              <div className="space-y-2">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" />
                </FormControl>
                <FormDescription>
                  Must be at least 8 characters with uppercase, lowercase, and a number
                </FormDescription>
                <FormMessage />
              </div>
            )}
          />

          <FormField
            name="confirmPassword"
            render={() => (
              <div className="space-y-2">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          <FormField
            name="terms"
            render={({ field: { value, onChange } }) => (
              <div className="flex items-start space-x-2">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </FormControl>
                <div className="grid gap-1.5 leading-none">
                  <FormLabel className="font-normal">
                    I agree to the{' '}
                    <a href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </FormLabel>
                  <FormMessage />
                </div>
              </div>
            )}
          />

          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </div>
      </Form>
    </div>
  );
}
