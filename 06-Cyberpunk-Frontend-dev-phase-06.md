


This is the phase where you stop just building a website and start directing an experience. "Visual Virtuosity" is about bridging the gap between engineering and digital art. When a senior engineer or design lead sees this phase in action, the conversation shifts from "Can they write code?" to "How soon can they start?"

We are going to inject GPU-accelerated physics, WebGL 3D rendering, and complex drag-and-drop state mathematics into the `/lab` route.

Here is the exact, granular breakdown of Phase 6.

---

### **Task 1: Advanced Framer Motion Orchestration**
CSS transitions are fine for basics, but for a true 2026 masterclass, we use spring physics. We will implement global motion rules that make the UI feel tangible, weighty, and flawlessly fluid.

*   **Sub-task 1.1: Shared Layout Animations (`layoutId`).** We will use Framer Motion's `layoutId` prop to create seamless morphing animations between completely different DOM states. For example, when a user clicks a small project thumbnail, instead of a sudden page jump, that exact image will fluidly detach from the grid and scale up to become the hero image of a modal or a new route, maintaining its aspect ratio perfectly.
*   **Sub-task 1.2: Scroll-Linked Parallax (`useScroll` & `useTransform`).** We will hook into the browser's scroll position without hijacking the native scrollbar (which is an anti-pattern). As the user scrolls down the `/architecture` or `/projects` pages, background grid lines will move at a 0.5x speed, while floating cyberpunk UI elements (like glowing decorative brackets `[ ]`) will move at 1.2x speed, creating a stunning depth of field.
*   **Sub-task 1.3: Staggered Intersection Observers.** We will build a reusable `<Reveal>` wrapper component. When a list of items (like your skills matrix) enters the viewport, they won't just appear. They will execute a staggered spring animation (e.g., item 1 pops in, item 2 pops in 50ms later, item 3 at 100ms), giving the data a cascading, waterfall effect.

### **Task 2: The Terminal Simulator Engine (`useCyberTyper`)**
To fully sell the Developer-Heavy aesthetic, static text isn't enough. We will build a highly realistic typing simulator for your primary headlines.

*   **Sub-task 2.1: The State Machine Hook.** We will write a custom hook (`useCyberTyper`) that doesn't just add letters on a fixed interval (which looks robotic). We will introduce a randomized delay `Math.random() * (max - min) + min` between each keystroke to simulate real human typing cadences—including occasional simulated "typos" that the script quickly backspaces and corrects.
*   **Sub-task 2.2: The Decoupled Blinking Cursor.** We will create a standalone `<Cursor />` component. It will be a solid block (`w-3 h-5 bg-neon-cyan`) that blinks using CSS `@keyframes`. However, we will sync its state with the `useCyberTyper` hook so that the cursor *stops* blinking while actively typing, and resumes blinking when paused—exactly how a real command line behaves.
*   **Sub-task 2.3: Route-Mount Integration.** We will apply this hook to the `<h1>` elements across your site. When a user navigates to `/engineering`, the header won't just be there; it will type out `> cd ./engineering && ls -la` in real-time.

### **Task 3: Architecting the `/lab` Route (The Sandbox)**
The `/lab` route is a dedicated playground. It proves that you don't just consume libraries; you experiment with the bleeding edge of the browser's capabilities.

*   **Sub-task 3.1: The Lab Dashboard Layout.** We will build a strict CSS Grid/Masonry layout. Unlike the rest of the site, this page will look like a complex control panel or monitoring dashboard. Each "experiment" will live inside its own glowing, glassmorphic widget container.
*   **Sub-task 3.2: The "View Source" Overlay.** Every experiment widget will have a toggle switch in its header. Flipping it will cause the 3D or interactive canvas to flip 180 degrees (using `rotateY` in Framer Motion), revealing the heavily commented TypeScript code that powers that specific experiment on the back of the card.

### **Task 4: Lab Experiment 1 - WebGL & React Three Fiber (The 3D Flex)**
Nothing says "frontend virtuoso" like mixing standard DOM elements with a WebGL canvas. We will build a lightweight 3D element to prove your math and rendering skills.

*   **Sub-task 4.1: R3F Canvas Setup.** We will install `@react-three/fiber` and `@react-three/drei`. We will initialize a `<Canvas>` within one of our lab widgets, ensuring it doesn't block the main thread by utilizing React's concurrent features.
*   **Sub-task 4.2: The Cybernetic Object (Wireframe Torus or Icosahedron).** We will generate a 3D geometry and apply a custom `MeshBasicMaterial`. We will set `wireframe={true}` to fit the cyberpunk aesthetic. We will tie the material's color directly to your CSS variables—if the user toggles the site to Light Mode, the 3D object instantly changes from Neon Green to Corpo Blue.
*   **Sub-task 4.3: Raycasting & Mouse Interaction (`useFrame`).** We will hook into the `useFrame` render loop. We will use raycasting to track the user's cursor position over the canvas, mathematically mapping the 2D mouse coordinates to the 3D object's rotation. As the user moves their mouse, the 3D wireframe will smoothly rotate to "look" at the cursor.

### **Task 5: Lab Experiment 2 - Complex Data UI & Drag-and-Drop**
To balance the artistic 3D flex, we need a heavy logic flex. We will build a sortable, drag-and-drop terminal interface.

*   **Sub-task 5.1: Implementing `@dnd-kit`.** We will use `@dnd-kit` (the modern, accessible 2026 standard for drag-and-drop, bypassing outdated libraries). We will set up the `DndContext`, `SortableContext`, and collision detection algorithms.
*   **Sub-task 5.2: Building the Draggable Widgets.** We will create mock "Server Status" widgets (e.g., CPU Load, Memory Allocation, Network Latency, fetching fake fluctuating data). The user will be able to click a drag-handle (styled like a textured metal grip) and reorder these widgets within the grid.
*   **Sub-task 5.3: Client-Side Persistence (Zustand + LocalStorage).** It's not enough to just drag them; the browser must remember the layout. We will use a Zustand store wrapped in the `persist` middleware. When the user rearranges the widgets, the new array order is instantly serialized and saved to `localStorage`. If they refresh the page or come back tomorrow, the dashboard remains exactly how they left it.

---

By completing Phase 6, you transition from a standard UI developer to a highly skilled creative engineer. You will have proven mastery over the DOM, the Canvas, browser memory, and physics-based animation.

Does this level of virtuosity align with your vision for the `/lab` route? If so, we are ready to outline **Phase 7: Quality Assurance, Performance & Accessibility**, ensuring this Ferrari of a website actually runs perfectly.