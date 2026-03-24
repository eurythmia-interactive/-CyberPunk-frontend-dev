


This is where we separate the senior developers from the absolute masters. Building a bespoke, strictly typed Component Library proves that you don't just paste code from the internet—you architect scalable, maintainable, and accessible UI systems from the ground up.

By the end of Phase 3, you will have an internal design system (acting much like a customized version of Shadcn UI, but entirely your own) tailored to the Cyberpunk/Corpo aesthetic, and a beautiful way to display it.

Here is the exact, detailed breakdown for Phase 3.

---

### Phase 03

### **Task 1: The UI Engine Foundation (Tailwind Merge & CVA)**
Before writing a single React component, we must build the utility pipeline that will process our classes. This prevents the classic "Tailwind class collision" nightmare.

*   **Sub-task 1.1: Install Dependencies.** We will install `clsx` (for conditional class joining) and `tailwind-merge` (for intelligently resolving Tailwind class conflicts).
*   **Sub-task 1.2: The `cn()` Utility Function.** We will create a `src/lib/utils.ts` file and write the `cn()` function. This function takes any number of class arrays/objects, passes them through `clsx` to evaluate conditions, and then through `twMerge`. *Why?* If a component has a default `bg-blue-500` and a user passes `bg-red-500` via props, `twMerge` ensures only the red background is applied, rather than relying on CSS source order.
*   **Sub-task 1.3: Install CVA (Class Variance Authority).** We will add `class-variance-authority`. This library will allow us to define our component styles not as a giant mess of ternary operators, but as a clean, typed object mapping out variants (e.g., `intent: "neon"`, `size: "lg"`).

### **Task 2: Architecting the Core "Atoms" (Buttons, Badges, Inputs)**
We start by building the foundational elements of the Cyberpunk UI. These components require zero third-party logic, just perfect styling and TypeScript interfaces.

*   **Sub-task 2.1: The `<Button />` Matrix.** We will build a highly flexible button component using CVA. 
    *   *Variants:* `intent` (Primary Neon, Ghost, Destructive, Corpo-Minimalist), `size` (sm, md, lg, icon).
    *   *States:* We will implement an `isLoading` prop that disables the button, dims the text, and smoothly fades in a custom glowing SVG spinner without altering the button's physical dimensions.
*   **Sub-task 2.2: The `<Input />` & `<Textarea />` (Terminal Style).** We will style form controls that look like command-line interfaces. 
    *   *Features:* Monospaced fonts, transparent backgrounds with bottom-borders only, and a neon glow `ring` that activates smoothly on `:focus-visible`. We will also create a variation with a built-in terminal prefix (e.g., `>_ `).
*   **Sub-task 2.3: The `<Badge />` & `<Card />` Components.** 
    *   *Cards:* Glassmorphism containers with subtle `border-zinc-800` borders and an inner `<div className="absolute inset-0 bg-scanline opacity-10" />` for that CRT texture.
    *   *Badges:* Tiny, pill-shaped data tags. We will include a variant with a pulsing CSS dot (using `@keyframes ping`) to indicate "live" status or system health.

### **Task 4: Engineering Complex, Accessible Primitives (Radix UI)**
Building a custom dropdown or modal from scratch that handles screen readers, keyboard focus trapping, and escape-key dismissal is a nightmare. A virtuoso uses Headless UI libraries. We will use **Radix UI** to provide the invisible accessible skeleton, and wrap it in our Cyberpunk skin.

*   **Sub-task 3.1: The `<Dialog />` (Modal) Component.** We will install `@radix-ui/react-dialog`. 
    *   *Styling:* We will style the Radix Overlay to be a heavily blurred, dark backdrop (`backdrop-blur-md bg-black/80`). The Dialog Content will be styled as a glowing terminal window.
    *   *Animation:* We will integrate Framer Motion or Tailwind `data-[state=open]` attributes to make the modal scale-up and fade-in smoothly when triggered.
*   **Sub-task 3.2: The `<DropdownMenu />` Component.** We will install `@radix-ui/react-dropdown-menu`.
    *   *Styling:* We will build custom item styles with hover states that feature an electric cyan left-border highlight, mimicking a cursor selection in a vintage terminal.
*   **Sub-task 3.3: The `<Tabs />` Component.** We will install `@radix-ui/react-tabs`. This will be crucial for organizing data on your portfolio. We will style the active tab to have a glowing bottom border and vibrant text, while inactive tabs remain dimmed.

### **Task 4: Building the "Showcase" Architecture (The Component Viewer)**
You want an entire page (`/design-system`) dedicated to showing off these components. We need a specific UI wrapper to present them like a professional documentation site.

*   **Sub-task 4.1: The `<ComponentViewer />` Layout.** We will build a container component that splits into two main sections: a "Preview" pane (top) and a "Controls/Code" pane (bottom).
*   **Sub-task 4.2: The Preview Canvas.** The top pane will feature a checkered transparency grid background (subtle dark mode grid) to clearly contrast the component. It will center the component using CSS Flexbox/Grid.
*   **Sub-task 4.3: Interactive Prop Toggles (State Management).** We will use standard React `useState` within the viewer to build a mini-control panel. This will include segmented controls or select dropdowns allowing the recruiter/engineer viewing your site to click "Size: Large" or "Intent: Destructive" and watch the component update in real-time in the Preview Canvas above.

### **Task 5: Implementing the "View Source" Feature (Syntax Highlighting)**
This is the ultimate flex. When they see a beautiful component, they will want to see the code that powers it. We will serve the pristine TypeScript file directly in the browser.

*   **Sub-task 5.1: Integrate Syntax Highlighting (`Shiki` or `Prism`).** We will install a modern syntax highlighter (like `shiki`, which provides extremely accurate, VS Code-level tokenization). We will configure it to use a dark cyberpunk theme (like "Tokyo Night" or "Andromeda").
*   **Sub-task 5.2: The Expand/Collapse Animation.** Inside the `<ComponentViewer />`, we will build an accordion trigger labeled "View Source Code". Using Framer Motion's `<AnimatePresence>`, clicking this will cause a smooth, spring-based layout shift as the code block expands downward.
*   **Sub-task 5.3: The "Copy to Clipboard" Micro-interaction.** In the top right corner of the code block, we will add a `<CopyButton />`. We will write a custom hook (`useCopyToClipboard`) utilizing the modern `navigator.clipboard.writeText` API. When clicked, the icon will flawlessly morph from a "Clipboard" SVG to a green "Checkmark" SVG for 2 seconds, firing off a custom Toast notification saying "Code copied to clipboard."

---

By completing these 5 tasks, you won't just have a portfolio; you will have a fully functioning, highly polished UI framework documented within your own site. 

Does this breakdown hit the mark? If so, we can move straight into **Phase 4: App Shell, Layouts, & Global Navigation (Command Palette)**, or dive into the code. Let me know the command!