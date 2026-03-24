


This phase is the core of your "Living Manifesto." Now that the framework, design tokens, components, and app shell are built, we populate the application. We are not just dumping text onto a page; we are architecting five distinct, interactive routes that explicitly prove your mastery of modern frontend development.

Here is the highly detailed, granular breakdown of Phase 5.

---

### Phase 5

### **Task 1: The `/` (Home) Route – The Boot Sequence & Hero**
The homepage must instantly establish the Cyberpunk vibe and hook the user within 3 seconds. We will simulate a terminal boot-up sequence that transitions into a highly polished, interactive Hero section.

*   **Sub-task 1.1: The `useTypewriter` Custom Hook.** We will write a custom React hook to simulate a terminal printing text character-by-character. It will accept an array of strings (e.g., `["INITIALIZING SYSTEM...", "LOADING MODULES...", "MOUNTING DOM..."]`) and a typing speed, creating an authentic command-line feel.
*   **Sub-task 1.2: The Boot Animation Component.** When the user first lands on `/`, the screen will be pitch black except for a blinking cursor. The `useTypewriter` hook will rapidly print the "boot sequence." Once the sequence hits "ACCESS GRANTED," we will trigger a Zustand state: `setBooted(true)`.
*   **Sub-task 1.3: The Hero Layout (Framer Motion Orchestration).** Listening to `setBooted`, Framer Motion will instantly snap the terminal text away and execute a staggered, spring-physics reveal of your actual Hero content. 
*   **Sub-task 1.4: Magnetic CTA (Call to Action).** We will implement a custom `<MagneticButton>` component for your primary action (e.g., "INITIALIZE_CONTACT"). By tracking the `onMouseMove` event relative to the button's bounding box, the button will subtly pull toward the user's cursor as they hover near it, demonstrating advanced DOM mathematics and micro-interaction skills.

### **Task 2: The `/architecture` Route – The Tech Stack Manifesto**
This page explicitly tells the recruiter or engineering manager *why* you are a senior-level developer. It documents your decision-making process, architecture, and DevOps pipeline.

*   **Sub-task 2.1: The Interactive Architecture Diagram.** Instead of a static image, we will build a responsive CSS Grid or flexbox diagram that visualizes your tech stack (Next.js -> Static Export -> GitHub Actions -> GitHub Pages). We will use SVG pathways (animated with Framer Motion `pathLength`) to show data/build flowing from one node to the next.
*   **Sub-task 2.2: The Configuration Code Blocks.** We will utilize the syntax-highlighting component we built in Phase 3. You will display snippets of your actual `next.config.mjs` (showing `output: 'export'`), your `biome.json` (showing your strict linting rules), and your `.github/workflows/deploy.yml` (showing your CI/CD pipeline). 
*   **Sub-task 2.3: Prose & Typography Styling.** We will use our fluid typography engine to perfectly typeset the article. We will use `Geist Mono` for technical terms and `Inter` for the main paragraphs, ensuring maximum readability (WCAG AAA contrast) while maintaining the developer-heavy aesthetic.

### **Task 3: The `/design-system` Route – The UI Showcase**
This route proves you can build and maintain a scalable component library. We will integrate the `<ComponentViewer />` we built in Phase 3 into a beautiful, navigable dashboard.

*   **Sub-task 3.1: The Token Grid (Colors & Typography).** The top of the page will dynamically map over your CSS variables to display your color palette (Neon Cyan, Matrix Green, Dark Zinc, etc.) in glowing swatches. Next to it, an interactive typography scale that updates as the user resizes the browser window, proving the `clamp()` functions work perfectly.
*   **Sub-task 3.2: Component Categorization (Radix Tabs).** We will use the Radix `<Tabs>` component to organize the showcase into categories: `Inputs`, `Buttons`, `Surfaces`, `Overlays`. This keeps the DOM clean and demonstrates you know how to organize complex information.
*   **Sub-task 3.3: Instantiating the Component Viewers.** Inside each tab, we will map out your components using the `<ComponentViewer />`. The user will be able to toggle the `intent` of a button or the `size` of an input and immediately click "View Source" to see your pristine Tailwind/CVA code.

### **Task 4: The `/engineering` Route – State & Logic (The Form Flex)**
Visuals are great, but logic gets you hired. This page acts as a sandbox to demonstrate data validation, error handling, and global state management using **React Hook Form**, **Zod**, and **Zustand**.

*   **Sub-task 4.1: The Zod Schema Definition.** We will define a strict TypeScript validation schema using Zod for a simulated "Secure System Access" form. It will enforce complex rules: passwords must contain specific regex patterns, usernames must be lowercase, and emails must be valid.
*   **Sub-task 4.2: React Hook Form Integration.** We will bind the Zod schema to `useForm()`. This guarantees zero re-renders on input typing (massive performance boost) while maintaining strict type safety.
*   **Sub-task 4.3: Real-Time Error UI.** We will build a `<FormError />` component. When a Zod validation fails, the input border will instantly glow red (`ring-red-500/50`), and the error message will drop down with a slight shake animation (`keyframes`) to grab attention.
*   **Sub-task 4.4: The State Visualization Dashboard.** To the right of the form, we will build a "State Monitor" panel. It will `useStore()` from Zustand to subscribe to the form's global state. As the user types in the form, the State Monitor will instantly update, showing the raw JSON payload assembling in real-time. This explicitly proves you understand how to manage and visualize state.

### **Task 5: The `/projects` Route – The Archives**
This is the presentation of your actual work, but built like a high-end data table or 3D grid.

*   **Sub-task 5.1: The Data Layer.** We will create a strongly typed `src/data/projects.ts` file containing an array of objects representing your portfolio pieces. Each object will contain `id`, `title`, `description`, `techStack` (array of strings), `githubUrl`, and `liveUrl`.
*   **Sub-task 5.2: The Holographic Project Cards.** We will map over the data to render cards. We will use a lightweight 3D tilt effect (either via a custom CSS `perspective` hook or `react-parallax-tilt`). As the mouse moves over the card, a subtle glare effect (a white radial gradient) will track the cursor over the card's surface, making it look like physical glass.
*   **Sub-task 5.3: The Data Filtering Engine.** Above the grid, we will build a tag-based filter system. A row of badges (`React`, `Tailwind`, `TypeScript`, `Framer Motion`). Clicking a badge updates a local state array.
*   **Sub-task 5.4: AnimatePresence Grid Reshuffling.** We will wrap the project grid in Framer Motion's `<AnimatePresence>` and `<motion.div layout>`. When a user clicks the "Tailwind" filter badge, the projects that don't use Tailwind will smoothly scale down and fade out, and the remaining projects will fluidly glide into the empty spaces to close the gaps. 

---

Once these 5 tasks are executed, your site is fully populated. It won't just look like a portfolio; it will function like a high-end SaaS product designed for developers.

If this breakdown is exactly what you are looking for, we can move on to outlining **Phase 6: Visual Virtuosity (Motion, Data UI, & Interactions)**, which is where we add the absolute bleeding-edge experimental features to the `/lab` route.