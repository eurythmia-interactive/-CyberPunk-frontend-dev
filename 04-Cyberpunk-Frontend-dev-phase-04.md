


This is where your application transforms from a collection of web pages into a cohesive, immersive software experience. Phase 4 is about building the "App Shell"—the persistent frame that wraps your content. We want the user to feel like they’ve just booted up a high-end, next-generation IDE or a terminal straight out of a Cyberpunk UI.

By the end of this phase, the routing will feel instantaneous, the layout will be flawlessly responsive, and the Command Palette will show recruiters that you understand SaaS-level user experience.

Here is the exact, descriptive breakdown of how we architect the App Shell.

---

### Phase 04 

### **Task 1: The Root Layout & The Animated Cyber-Grid Background**
We will build the foundational `layout.tsx` file. This layout persists across route changes, meaning the background animations and navigation state won't reset or flash when the user clicks a link.

*   **Sub-task 1.1: The CSS-Only Infinite Grid.** Heavy JavaScript backgrounds ruin Lighthouse performance scores. We will create an ultra-performant, infinite moving grid using purely CSS. We'll use a `background-image` with intersecting `linear-gradient` lines mapped to our CSS variables (e.g., a faint `zinc-900` grid on a `black` background). We will apply an infinite `@keyframes` translation to make it look like the user is slowly flying forward over a wireframe landscape.
*   **Sub-task 1.2: The CRT Film Grain Overlay.** To perfect the Cyberpunk aesthetic, we will create a fixed, pointer-events-none overlay `div`. It will use a lightweight base64-encoded SVG noise pattern with `mix-blend-mode: overlay` and a low opacity (e.g., `5%`). This gives the entire screen a subtle, tactile, retro-futuristic texture.
*   **Sub-task 1.3: Layout Constraints & CSS Grid.** We will structure the root `<body>` using CSS Grid, defining absolute areas for the Sidebar (left), the Header (top), and the Main Content Area (center/right). This guarantees zero layout shift regardless of what content loads.

### **Task 2: The IDE-Style Sidebar Navigation (File Tree)**
Standard horizontal navbars are boring. We are going to build a vertical sidebar that closely resembles the file explorer in VS Code or a Unix directory structure. 

*   **Sub-task 2.1: The Recursive File Tree Component.** We will build a component that maps over a configuration array of your routes. It will render "Folders" (collapsible categories like `~/skills` or `~/projects`) and "Files" (the actual pages).
*   **Sub-task 2.2: Active State & `usePathname`.** We will use Next.js's `usePathname` hook to determine the current route. The active "file" in the sidebar will receive a distinct style: a glowing neon left-border, an electric cyan text color, and a subtle text-shadow.
*   **Sub-task 2.3: Micro-interactions & Icons.** Every file link will have a specific icon (e.g., a React logo for the UI page, a Terminal icon for the home page). We will add a Framer Motion `<LayoutGroup>` so that when a user expands a "Folder," the links below it slide down with a buttery smooth spring physics animation.

### **Task 3: The Glassmorphic Header & Dynamic Breadcrumbs**
The top bar will serve as your system status indicator and secondary navigation.

*   **Sub-task 3.1: The Header Shell.** A sticky header with a heavy `backdrop-blur-md` and a semi-transparent background (e.g., `bg-black/50`). It will have a subtle bottom border using our `--color-border-neon` token.
*   **Sub-task 3.2: Dynamic Breadcrumbs.** Instead of a generic title, the header will display the exact path the user is on, styled like a terminal path: `admin@portfolio: ~ / root / design-system / buttons`. This will dynamically read the URL segments and generate clickable breadcrumb links.
*   **Sub-task 3.3: System Status & Clock.** On the far right of the header, we will add a blinking green dot (`animate-pulse`) labeled "SYSTEM ONLINE". Next to it, we will write a custom hook to display the current local time in Mexico City (or UTC), ticking in real-time. This adds a live, dynamic feel to the static site.

### **Task 4: The Command Palette (⌘K) - Core Architecture**
This is a massive flex. Power users love keyboard shortcuts. We will implement a global spotlight search using `cmdk` (the industry-standard headless command menu).

*   **Sub-task 4.1: Install & Bind `cmdk`.** We will install the library and create a global event listener inside a `useEffect` hook. It will listen for `Meta+K` (Mac) or `Ctrl+K` (Windows). We will call `e.preventDefault()` to stop the browser's default search bar from opening.
*   **Sub-task 4.2: Global State Management (Zustand).** We need to open the palette from anywhere—via keyboard shortcut, clicking a button in the header, or an error page. We will configure a tiny Zustand store: `useCommandStore` with `isOpen`, `open()`, `close()`, and `toggle()` methods.
*   **Sub-task 4.3: Dialog Implementation.** We will wrap the `cmdk` component inside a Radix UI `<Dialog>` to ensure that when the palette opens, the background blurs, scroll is locked on the `body`, and focus is immediately trapped inside the search input (perfect WAI-ARIA accessibility).

### **Task 5: The Command Palette - Commands & Easter Eggs**
A command palette is only as good as what it can do. We will populate it with routing, actions, and secrets.

*   **Sub-task 5.1: Navigation Group.** As the user types, the palette will filter a list of site routes. Hitting `Enter` will use the Next.js `useRouter().push()` method to instantly navigate them to `/projects`, `/architecture`, etc.
*   **Sub-task 5.2: Action Group (System Controls).** We will add commands that execute functions rather than route. 
    *   `> Toggle Dark/Light Theme` (invokes `next-themes`)
    *   `> Copy Email Address` (invokes the clipboard API and fires a toast)
    *   `> View Resume (PDF)` (opens your resume in a new tab)
*   **Sub-task 5.3: The "Virtuoso" Easter Eggs.** We will hide secret commands that don't appear until typed exactly.
    *   Typing `matrix` triggers a function that injects a digital rain canvas over the screen for 5 seconds.
    *   Typing `sudo rm -rf /` triggers a fake CSS "glitch" animation and a red error toast saying "Permission Denied: Nice try." This shows recruiters you have personality and mastery over DOM manipulation.

### **Task 6: Seamless Page Transitions (Next.js `template.tsx`)**
Because we are building a Static Export (SSG), clicking a link feels like a traditional page load. We want it to feel like an expensive Single Page Application (SPA). 

*   **Sub-task 6.1: Implement `template.tsx`.** In the Next.js App Router, `layout.tsx` persists, but `template.tsx` remounts on every route change. We will use this file to wrap our main content area.
*   **Sub-task 6.2: Framer Motion Orchestration.** Inside the template, we will wrap the `children` in a Framer Motion `<motion.main>`. We will define an `initial` state (opacity 0, y-axis +10px) and an `animate` state (opacity 1, y-axis 0). Now, every time a user navigates via the Sidebar or the Command Palette, the new page content will smoothly fade and slide up into place.

---

Once these 6 tasks are complete, the foundational structure of your portfolio is fully operational. The user can navigate, use keyboard shortcuts, toggle themes, and marvel at the animations—all before reading a single word of your content.

Does this breakdown match your expectations for the App Shell? If so, we can outline **Phase 5: Page Architecture & "Manifesto" Content**, where we actually start building the pages themselves. Let me know!