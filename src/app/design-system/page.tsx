'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function ComponentSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-16">
      <h2 className="text-h2 mb-6 font-mono text-brand-primary">{title}</h2>
      {children}
    </section>
  );
}

function VariantGrid({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <p className="text-small font-mono text-zinc-500">{title}</p>
      <div className="flex flex-wrap gap-3">{children}</div>
    </div>
  );
}

export default function DesignSystemPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <main id="main-content" className="min-h-screen text-fg-base">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <header className="mb-16">
          <h1 className="text-display text-gradient-cyber mb-4">Design System</h1>
          <p className="text-body text-zinc-500">
            A living showcase of UI primitives built with Radix UI, CVA, and Tailwind CSS.
          </p>
        </header>

        {/* Buttons */}
        <ComponentSection title="Button">
          <Tabs defaultValue="preview">
            <TabsList variant="pills">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="variants">Variants</TabsTrigger>
              <TabsTrigger value="sizes">Sizes</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="mt-6">
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="accent">Accent</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </TabsContent>
            <TabsContent value="variants" className="mt-6">
              <VariantGrid title="All Variants">
                {['primary', 'outline', 'secondary', 'accent', 'ghost', 'link'].map((variant) => (
                  <Button
                    key={variant}
                    variant={
                      variant as 'primary' | 'outline' | 'secondary' | 'accent' | 'ghost' | 'link'
                    }
                  >
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Button>
                ))}
              </VariantGrid>
            </TabsContent>
            <TabsContent value="sizes" className="mt-6">
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="icon" aria-label="Add">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 3v18M3 12h18" />
                  </svg>
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8">
            <p className="text-small font-mono text-zinc-500 mb-4">Loading State</p>
            <div className="flex flex-wrap gap-4">
              <Button isLoading>Loading</Button>
              <Button variant="outline" isLoading>
                Loading
              </Button>
            </div>
          </div>
        </ComponentSection>

        {/* Badges */}
        <ComponentSection title="Badge">
          <Tabs defaultValue="preview">
            <TabsList variant="pills">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="variants">Variants</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="mt-6">
              <div className="flex flex-wrap gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="accent">Accent</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </TabsContent>
            <TabsContent value="variants" className="mt-6">
              <VariantGrid title="Badge Variants">
                {['default', 'primary', 'accent', 'success', 'warning', 'error', 'outline'].map(
                  (variant) => (
                    <Badge
                      key={variant}
                      variant={
                        variant as
                          | 'default'
                          | 'primary'
                          | 'accent'
                          | 'success'
                          | 'warning'
                          | 'error'
                          | 'outline'
                      }
                    >
                      {variant.charAt(0).toUpperCase() + variant.slice(1)}
                    </Badge>
                  )
                )}
              </VariantGrid>
            </TabsContent>
          </Tabs>
        </ComponentSection>

        {/* Inputs */}
        <ComponentSection title="Input">
          <Tabs defaultValue="preview">
            <TabsList variant="pills">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="states">States</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="mt-6 space-y-4">
              <div className="max-w-md space-y-2">
                <label htmlFor="input-default" className="text-small font-mono text-zinc-500">
                  Default Input
                </label>
                <Input id="input-default" placeholder="Enter text..." />
              </div>
              <div className="max-w-md space-y-2">
                <label htmlFor="input-email" className="text-small font-mono text-zinc-500">
                  With Label
                </label>
                <Input id="input-email" placeholder="Email address" type="email" />
              </div>
            </TabsContent>
            <TabsContent value="states" className="mt-6 space-y-4">
              <div className="max-w-md space-y-2">
                <label htmlFor="input-state-default" className="text-small font-mono text-zinc-500">
                  Default
                </label>
                <Input id="input-state-default" placeholder="Default state" />
              </div>
              <div className="max-w-md space-y-2">
                <label htmlFor="input-state-error" className="text-small font-mono text-zinc-500">
                  Error State
                </label>
                <Input id="input-state-error" variant="error" placeholder="Error state" />
              </div>
              <div className="max-w-md space-y-2">
                <label htmlFor="input-state-success" className="text-small font-mono text-zinc-500">
                  Success State
                </label>
                <Input id="input-state-success" variant="success" placeholder="Success state" />
              </div>
              <div className="max-w-md space-y-2">
                <label htmlFor="input-disabled" className="text-small font-mono text-zinc-500">
                  Disabled
                </label>
                <Input id="input-disabled" disabled placeholder="Disabled state" />
              </div>
            </TabsContent>
          </Tabs>
        </ComponentSection>

        {/* Cards */}
        <ComponentSection title="Card">
          <Tabs defaultValue="preview">
            <TabsList variant="pills">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="variants">Variants</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card description text goes here.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-body text-zinc-500">
                      This is the card content area where you can put any content.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="primary" size="sm">
                      Action
                    </Button>
                  </CardFooter>
                </Card>
                <Card variant="glow">
                  <CardHeader>
                    <CardTitle>Glow Card</CardTitle>
                    <CardDescription>With neon border glow effect.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-body text-zinc-500">
                      Features the border-glow-cyan utility.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm">
                      View Code
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="variants" className="mt-6 space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <Card variant="default" padding="lg">
                  <CardHeader>
                    <CardTitle>Default Card</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-500">Standard card with border and background.</p>
                  </CardContent>
                </Card>
                <Card variant="glow" padding="lg">
                  <CardHeader>
                    <CardTitle>Glow Card</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-500">Card with cyan neon border glow.</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </ComponentSection>

        {/* Dialog */}
        <ComponentSection title="Dialog">
          <Tabs defaultValue="preview">
            <TabsList variant="pills">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="variants">Variants</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="mt-6">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="primary">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Dialog Title</DialogTitle>
                    <DialogDescription>
                      This is a dialog component built with Radix UI primitives. It provides
                      accessible modal functionality out of the box.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-body text-zinc-500">
                      Dialogs are used for focused tasks that require input or confirmation.
                    </p>
                  </div>
                  <DialogFooter>
                    <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={() => setIsDialogOpen(false)}>
                      Confirm
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TabsContent>
            <TabsContent value="variants" className="mt-6 space-y-4">
              <div className="grid gap-6 md:grid-cols-3">
                <Card padding="lg">
                  <CardTitle className="mb-2">Default</CardTitle>
                  <CardContent>
                    <p className="text-small text-zinc-500 mb-4">
                      Standard overlay with backdrop blur.
                    </p>
                  </CardContent>
                </Card>
                <Card padding="lg">
                  <CardTitle className="mb-2">Glass</CardTitle>
                  <CardContent>
                    <p className="text-small text-zinc-500 mb-4">Strong glassmorphism effect.</p>
                  </CardContent>
                </Card>
                <Card padding="lg">
                  <CardTitle className="mb-2">Grid</CardTitle>
                  <CardContent>
                    <p className="text-small text-zinc-500 mb-4">Grid background overlay.</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </ComponentSection>

        {/* Tabs */}
        <ComponentSection title="Tabs">
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              <TabsTrigger value="tab3">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <Card>
                <CardContent>
                  <p className="text-body text-zinc-500">
                    Content for Tab 1. Tabs allow you to organize content into distinct views.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tab2">
              <Card>
                <CardContent>
                  <p className="text-body text-zinc-500">
                    Content for Tab 2. Each tab panel is aria-labelled for accessibility.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tab3">
              <Card>
                <CardContent>
                  <p className="text-body text-zinc-500">
                    Content for Tab 3. Built with Radix UI for full keyboard navigation.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8">
            <p className="text-small font-mono text-zinc-500 mb-4">Pills Variant</p>
            <Tabs defaultValue="pills1">
              <TabsList variant="pills">
                <TabsTrigger value="pills1">Overview</TabsTrigger>
                <TabsTrigger value="pills2">Analytics</TabsTrigger>
                <TabsTrigger value="pills3">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="pills1">
                <Card>
                  <CardContent>
                    <p className="text-body text-zinc-500">
                      Pills variant for a more modern, pill-shaped tab appearance.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="pills2">
                <Card>
                  <CardContent>
                    <p className="text-body text-zinc-500">
                      Analytics tab content with pills styling.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="pills3">
                <Card>
                  <CardContent>
                    <p className="text-body text-zinc-500">
                      Settings tab content with pills styling.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </ComponentSection>
      </div>
    </main>
  );
}
