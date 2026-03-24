'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { Activity, AlertCircle, CheckCircle2, Eye, Shield, Terminal } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Zod Schema for Secure System Access Form
const formSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be at most 20 characters')
      .regex(/^[a-z0-9_]+$/, 'Username must be lowercase letters, numbers, and underscores only'),

    email: z.string().email('Invalid email address').endsWith('.com', 'Email must end with .com'),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),

    confirmPassword: z.string(),

    accessCode: z
      .string()
      .length(6, 'Access code must be exactly 6 digits')
      .regex(/^\d+$/, 'Access code must contain only numbers'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof formSchema>;

// State Monitor Component
function StateMonitor({
  values,
  errors,
}: {
  values: Partial<FormValues>;
  errors: Record<string, string>;
}) {
  return (
    <Card variant="glow" className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-mono text-brand-primary">
          <Activity size={18} />
          STATE_MONITOR
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Live Form Data */}
          <div>
            <p className="text-xs font-mono text-foreground/50 uppercase mb-2">Live Payload</p>
            <pre className="bg-surface rounded-lg p-3 font-mono text-xs overflow-x-auto">
              {JSON.stringify(values, null, 2)}
            </pre>
          </div>

          {/* Error States */}
          <div>
            <p className="text-xs font-mono text-foreground/50 uppercase mb-2">
              Validation Errors: {Object.keys(errors).length}
            </p>
            <div className="space-y-1">
              {Object.entries(errors).map(([field, error]) => (
                <motion.div
                  key={field}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-xs font-mono text-error"
                >
                  <AlertCircle size={12} />
                  <span className="text-foreground/60">{field}:</span>
                  <span>{error}</span>
                </motion.div>
              ))}
              {Object.keys(errors).length === 0 && (
                <p className="text-xs font-mono text-brand-accent flex items-center gap-2">
                  <CheckCircle2 size={12} />
                  No validation errors
                </p>
              )}
            </div>
          </div>

          {/* Password Strength Indicator */}
          {values.password && (
            <div>
              <p className="text-xs font-mono text-foreground/50 uppercase mb-2">
                Password Strength
              </p>
              <PasswordStrength password={values.password} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: '8+ chars', valid: password.length >= 8 },
    { label: 'Uppercase', valid: /[A-Z]/.test(password) },
    { label: 'Lowercase', valid: /[a-z]/.test(password) },
    { label: 'Number', valid: /[0-9]/.test(password) },
    { label: 'Special', valid: /[^A-Za-z0-9]/.test(password) },
  ];

  const validCount = checks.filter((c) => c.valid).length;
  const strengthColors = [
    'bg-error',
    'bg-warning',
    'bg-warning',
    'bg-brand-primary',
    'bg-brand-accent',
  ];
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Excellent'];

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {checks.map((check) => (
          <div
            key={check.label}
            className={`h-1 flex-1 rounded-full transition-colors ${
              check.valid ? 'bg-brand-accent' : 'bg-surface'
            }`}
          />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          {checks.map((check) => (
            <span
              key={check.label}
              className={`text-[10px] font-mono ${check.valid ? 'text-brand-accent' : 'text-foreground/30'}`}
            >
              {check.label}
            </span>
          ))}
        </div>
        <span
          className={`text-xs font-mono ${strengthColors[validCount - 1]?.replace('bg-', 'text-')}`}
        >
          {strengthLabels[validCount - 1] || 'Too Weak'}
        </span>
      </div>
    </div>
  );
}

export default function EngineeringPage() {
  const [submittedData, setSubmittedData] = useState<Partial<FormValues> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      accessCode: '',
    },
  });

  const { watch, handleSubmit } = form;
  const formValues = watch();
  const formErrors = form.formState.errors;
  const errors: Record<string, string> = {};

  Object.entries(formErrors).forEach(([key, value]) => {
    if (value?.message) {
      errors[key] = value.message;
    }
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmittedData(data);
    setIsSubmitting(false);
  }

  return (
    <main id="main-content" className="min-h-screen text-fg-base">
      <div className="mx-auto max-w-6xl px-6 py-20">
        {/* Header */}
        <header className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-display text-gradient-cyber mb-4">Engineering</h1>
            <p className="text-h3 font-mono text-brand-accent mb-4">State & Logic Showcase</p>
            <p className="text-body text-foreground/70 max-w-2xl">
              Demonstrating form state management with React Hook Form, Zod validation, and
              real-time state visualization using Zustand.
            </p>
          </motion.div>
        </header>

        {/* Form and State Monitor */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-mono text-brand-primary">
                  <Shield size={18} />
                  SECURE_SYSTEM_ACCESS
                </CardTitle>
                <p className="text-small text-foreground/60 font-mono mt-2">
                  Fill out the form to see real-time validation and state updates.
                </p>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Username */}
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel className="font-mono text-small">Username</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="cyberpunk_dev"
                              className={
                                fieldState.error
                                  ? 'border-error focus:ring-error/50 animate-shake'
                                  : ''
                              }
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-xs">
                            Lowercase letters, numbers, and underscores only.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel className="font-mono text-small">Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="admin@cyberpunk.dev"
                              type="email"
                              className={fieldState.error ? 'border-error focus:ring-error/50' : ''}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Password */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel className="font-mono text-small">Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              className={fieldState.error ? 'border-error focus:ring-error/50' : ''}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-xs">
                            8+ chars, uppercase, lowercase, number, special char.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Confirm Password */}
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel className="font-mono text-small">Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              className={fieldState.error ? 'border-error focus:ring-error/50' : ''}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Access Code */}
                    <FormField
                      control={form.control}
                      name="accessCode"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel className="font-mono text-small">Access Code</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="123456"
                              maxLength={6}
                              className={`font-mono tracking-widest ${
                                fieldState.error ? 'border-error focus:ring-error/50' : ''
                              }`}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-xs">
                            6-digit security code.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    <div className="pt-4">
                      <Button
                        type="submit"
                        variant="primary"
                        className="w-full"
                        isLoading={isSubmitting}
                      >
                        {isSubmitting ? 'AUTHENTICATING...' : 'INITIALIZE_ACCESS'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          {/* State Monitor */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <StateMonitor values={formValues} errors={errors} />
          </motion.div>
        </div>

        {/* Submission Success */}
        <AnimatePresence>
          {submittedData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8"
            >
              <Card variant="glow" className="border-brand-accent">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-mono text-brand-accent">
                    <CheckCircle2 size={18} />
                    ACCESS GRANTED
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-surface rounded-lg p-4 font-mono text-xs overflow-x-auto">
                    {JSON.stringify(submittedData, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Code Reference */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-20"
        >
          <h2 className="text-h2 font-mono text-brand-primary mb-8">Form Architecture</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Terminal size={20} />,
                title: 'Zod Schema',
                description: 'Strict TypeScript validation with regex patterns and refinements.',
              },
              {
                icon: <Shield size={20} />,
                title: 'React Hook Form',
                description: 'Uncontrolled form state with minimal re-renders.',
              },
              {
                icon: <Eye size={20} />,
                title: 'State Monitor',
                description: 'Real-time visualization of form values and errors.',
              },
            ].map((item) => (
              <Card key={item.title}>
                <CardContent className="pt-6">
                  <div className="text-brand-primary mb-3">{item.icon}</div>
                  <h3 className="text-h3 font-mono mb-2">{item.title}</h3>
                  <p className="text-small text-foreground/60">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
}
