export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  year: number;
}

export const projects: Project[] = [
  {
    id: 'cyberpunk-portfolio',
    title: 'Cyberpunk Portfolio',
    description:
      'A living manifesto of frontend development skills. Cyberpunk-themed portfolio built with Next.js 16, TypeScript, and Tailwind CSS v4.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Radix UI', 'Zustand'],
    githubUrl: 'https://github.com/cyberpunk-dev/portfolio',
    liveUrl: 'https://cyberpunk.dev',
    featured: true,
    year: 2026,
  },
  {
    id: 'neon-dashboard',
    title: 'Neon Dashboard',
    description:
      'Real-time analytics dashboard with cyberpunk aesthetics. Features live data visualization and dark mode.',
    techStack: ['React', 'TypeScript', 'D3.js', 'Tailwind CSS', 'WebSocket'],
    githubUrl: 'https://github.com/cyberpunk-dev/neon-dashboard',
    liveUrl: 'https://neon-dashboard.vercel.app',
    featured: true,
    year: 2025,
  },
  {
    id: 'holographic-ui',
    title: 'Holographic UI Kit',
    description:
      'Open source UI component library with glassmorphism and holographic effects. Built for React applications.',
    techStack: ['React', 'TypeScript', 'CSS', 'Storybook'],
    githubUrl: 'https://github.com/cyberpunk-dev/holographic-ui',
    liveUrl: 'https://holographic-ui.dev',
    featured: true,
    year: 2025,
  },
  {
    id: 'synthwave-cli',
    title: 'Synthwave CLI',
    description:
      'A command-line interface tool for generating cyberpunk-themed ASCII art and banners.',
    techStack: ['Node.js', 'TypeScript', 'Commander.js'],
    githubUrl: 'https://github.com/cyberpunk-dev/synthwave-cli',
    liveUrl: 'https://npmjs.com/package/synthwave-cli',
    featured: false,
    year: 2024,
  },
  {
    id: 'grid-engine',
    title: 'Grid Engine',
    description:
      'High-performance CSS grid layout engine with auto-placement algorithms and responsive breakpoints.',
    techStack: ['TypeScript', 'CSS', 'Rollup'],
    githubUrl: 'https://github.com/cyberpunk-dev/grid-engine',
    liveUrl: 'https://grid-engine.dev',
    featured: false,
    year: 2024,
  },
  {
    id: 'neural-search',
    title: 'Neural Search',
    description:
      'AI-powered search experience with semantic understanding and real-time autocomplete suggestions.',
    techStack: ['Next.js', 'TypeScript', 'OpenAI', 'PostgreSQL'],
    githubUrl: 'https://github.com/cyberpunk-dev/neural-search',
    liveUrl: 'https://neural-search.dev',
    featured: false,
    year: 2024,
  },
  {
    id: 'phantom-store',
    title: 'Phantom Store',
    description:
      'E-commerce platform with ghost checkout flow. Instant form validation and optimistic UI updates for seamless purchasing.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'PostgreSQL', 'Redis'],
    githubUrl: 'https://github.com/cyberpunk-dev/phantom-store',
    liveUrl: 'https://phantom-store.dev',
    featured: false,
    year: 2025,
  },
  {
    id: 'glitch-patch',
    title: 'Glitch Patch',
    description:
      'Debug visualizer that highlights race conditions and memory leaks in real-time Node.js applications.',
    techStack: ['Node.js', 'TypeScript', 'Electron', 'Vue.js'],
    githubUrl: 'https://github.com/cyberpunk-dev/glitch-patch',
    liveUrl: 'https://glitch-patch.dev',
    featured: false,
    year: 2025,
  },
  {
    id: 'cyber-forms',
    title: 'Cyber Forms',
    description:
      'Dynamic form builder with conditional logic, real-time validation, and animated transitions.',
    techStack: ['React', 'TypeScript', 'Zod', 'React Hook Form', 'Framer Motion'],
    githubUrl: 'https://github.com/cyberpunk-dev/cyber-forms',
    liveUrl: 'https://cyber-forms.dev',
    featured: false,
    year: 2024,
  },
  {
    id: 'neon-api',
    title: 'Neon API Gateway',
    description:
      'Lightweight API gateway with rate limiting, caching, and automatic Swagger documentation.',
    techStack: ['Node.js', 'TypeScript', 'Redis', 'Docker', 'Nginx'],
    githubUrl: 'https://github.com/cyberpunk-dev/neon-api',
    liveUrl: 'https://neon-api.dev',
    featured: false,
    year: 2024,
  },
  {
    id: 'holo-map',
    title: 'Holo Map',
    description:
      'Interactive 3D world map with WebGL rendering, terrain visualization, and real-time data overlays.',
    techStack: ['React', 'Three.js', 'TypeScript', 'MapboxGL', 'WebGL'],
    githubUrl: 'https://github.com/cyberpunk-dev/holo-map',
    liveUrl: 'https://holo-map.dev',
    featured: false,
    year: 2025,
  },
  {
    id: 'quantum-db',
    title: 'Quantum DB',
    description:
      'Time-travel debugging tool for database queries. Replay and inspect any historical database state.',
    techStack: ['PostgreSQL', 'Python', 'Go', 'gRPC', 'Docker'],
    githubUrl: 'https://github.com/cyberpunk-dev/quantum-db',
    liveUrl: 'https://quantum-db.dev',
    featured: false,
    year: 2024,
  },
  {
    id: 'pixel-stream',
    title: 'Pixel Stream',
    description:
      'Live streaming platform optimized for pixel art and retro game content. Sub-second latency streaming.',
    techStack: ['Rust', 'WebRTC', 'Next.js', 'TypeScript', 'AWS'],
    githubUrl: 'https://github.com/cyberpunk-dev/pixel-stream',
    liveUrl: 'https://pixel-stream.dev',
    featured: false,
    year: 2025,
  },
  {
    id: 'cipher-lock',
    title: 'Cipher Lock',
    description:
      'End-to-end encrypted notes app with zero-knowledge architecture. Your data never touches our servers.',
    techStack: ['React', 'TypeScript', 'Web Crypto API', 'IndexedDB', 'Svelte'],
    githubUrl: 'https://github.com/cyberpunk-dev/cipher-lock',
    liveUrl: 'https://cipher-lock.dev',
    featured: false,
    year: 2024,
  },
  {
    id: 'void-cdn',
    title: 'Void CDN',
    description:
      'Edge network for static assets with instant cache invalidation and geographic load balancing.',
    techStack: ['Go', 'AWS CloudFront', 'Redis', 'Docker', 'Kubernetes'],
    githubUrl: 'https://github.com/cyberpunk-dev/void-cdn',
    liveUrl: 'https://void-cdn.dev',
    featured: false,
    year: 2025,
  },
  {
    id: 'chrome-echo',
    title: 'Chrome Echo',
    description:
      'AI-powered code review assistant that learns from your team patterns and suggests improvements.',
    techStack: ['Python', 'OpenAI', 'GitHub API', 'Next.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/cyberpunk-dev/chrome-echo',
    liveUrl: 'https://chrome-echo.dev',
    featured: false,
    year: 2025,
  },
  {
    id: 'prism-ui',
    title: 'Prism UI',
    description:
      'Design system with automatic dark mode, color contrast checking, and WCAG AAA compliance.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'Storybook'],
    githubUrl: 'https://github.com/cyberpunk-dev/prism-ui',
    liveUrl: 'https://prism-ui.dev',
    featured: false,
    year: 2024,
  },
  {
    id: 'flux-state',
    title: 'Flux State',
    description:
      'Predictable state management with time-travel debugging and snapshot testing built-in.',
    techStack: ['React', 'TypeScript', 'Zustand', 'Immer', 'Vitest'],
    githubUrl: 'https://github.com/cyberpunk-dev/flux-state',
    liveUrl: 'https://flux-state.dev',
    featured: false,
    year: 2024,
  },
  {
    id: 'hyper-queue',
    title: 'Hyper Queue',
    description:
      'Distributed task queue with priority scheduling, dead letter queues, and real-time monitoring.',
    techStack: ['Go', 'Redis', 'PostgreSQL', 'Prometheus', 'Grafana'],
    githubUrl: 'https://github.com/cyberpunk-dev/hyper-queue',
    liveUrl: 'https://hyper-queue.dev',
    featured: false,
    year: 2025,
  },
  {
    id: 'matrix-mail',
    title: 'Matrix Mail',
    description:
      'Email client with threading visualization, keyboard-driven navigation, and Gmail integration.',
    techStack: ['Svelte', 'TypeScript', 'Electron', 'GraphQL', 'Redis'],
    githubUrl: 'https://github.com/cyberpunk-dev/matrix-mail',
    liveUrl: 'https://matrix-mail.dev',
    featured: false,
    year: 2024,
  },
  {
    id: 'warp-drive',
    title: 'Warp Drive',
    description: 'Blazingly fast static site generator with incremental builds and edge rendering.',
    techStack: ['Rust', 'WebAssembly', 'Nitro', 'Vue.js', 'Vite'],
    githubUrl: 'https://github.com/cyberpunk-dev/warp-drive',
    liveUrl: 'https://warp-drive.dev',
    featured: false,
    year: 2025,
  },
  {
    id: 'ghost-css',
    title: 'Ghost CSS',
    description:
      'CSS-in-JS solution with zero runtime overhead. Generates static class names at build time.',
    techStack: ['TypeScript', 'Babel', 'Webpack', 'CSS Modules'],
    githubUrl: 'https://github.com/cyberpunk-dev/ghost-css',
    liveUrl: 'https://ghost-css.dev',
    featured: false,
    year: 2024,
  },
  {
    id: 'neon-mesh',
    title: 'Neon Mesh',
    description:
      'Real-time collaboration framework for building shared documents, whiteboards, and code editors.',
    techStack: ['Node.js', 'TypeScript', 'Y.js', 'WebSocket', 'React'],
    githubUrl: 'https://github.com/cyberpunk-dev/neon-mesh',
    liveUrl: 'https://neon-mesh.dev',
    featured: false,
    year: 2025,
  },
  {
    id: 'synth-db',
    title: 'Synth DB',
    description:
      'Embedded JavaScript database with SQL-like queries. Perfect for desktop apps and browsers.',
    techStack: ['TypeScript', 'SQLite', 'Node.js', 'Electron'],
    githubUrl: 'https://github.com/cyberpunk-dev/synth-db',
    liveUrl: 'https://synth-db.dev',
    featured: false,
    year: 2024,
  },
  {
    id: 'cyber-query',
    title: 'Cyber Query',
    description:
      'Visual SQL query builder with live preview, explain plans, and one-click index recommendations.',
    techStack: ['React', 'TypeScript', 'PostgreSQL', 'Monaco Editor', 'Tailwind CSS'],
    githubUrl: 'https://github.com/cyberpunk-dev/cyber-query',
    liveUrl: 'https://cyber-query.dev',
    featured: false,
    year: 2025,
  },
  {
    id: 'hex-palette',
    title: 'Hex Palette',
    description:
      'AI-powered color palette generator that creates accessible color systems with contrast checking.',
    techStack: ['Svelte', 'TypeScript', 'OpenAI', 'Vite', 'CSS'],
    githubUrl: 'https://github.com/cyberpunk-dev/hex-palette',
    liveUrl: 'https://hex-palette.dev',
    featured: false,
    year: 2024,
  },
  {
    id: 'grid-forge',
    title: 'Grid Forge',
    description:
      'Component-driven development toolkit with visual testing, documentation, and design tokens.',
    techStack: ['React', 'TypeScript', 'Storybook', 'Jest', 'Playwright'],
    githubUrl: 'https://github.com/cyberpunk-dev/grid-forge',
    liveUrl: 'https://grid-forge.dev',
    featured: false,
    year: 2024,
  },
  {
    id: 'turbo-cache',
    title: 'Turbo Cache',
    description:
      'Intelligent caching layer that learns access patterns and pre-warms cache for predicted requests.',
    techStack: ['Go', 'Redis', 'Docker', 'Prometheus', 'AWS'],
    githubUrl: 'https://github.com/cyberpunk-dev/turbo-cache',
    liveUrl: 'https://turbo-cache.dev',
    featured: false,
    year: 2025,
  },
  {
    id: 'chrome-shell',
    title: 'Chrome Shell',
    description:
      'Browser extension that provides a terminal-style command palette for navigating any website.',
    techStack: ['TypeScript', 'Chrome Extensions', 'React', 'Webpack'],
    githubUrl: 'https://github.com/cyberpunk-dev/chrome-shell',
    liveUrl: 'https://chrome-shell.dev',
    featured: false,
    year: 2024,
  },
  {
    id: 'neural-css',
    title: 'Neural CSS',
    description:
      'AI layout engine that converts Figma designs to responsive Tailwind CSS automatically.',
    techStack: ['Python', 'TensorFlow', 'Next.js', 'Tailwind CSS', 'Figma API'],
    githubUrl: 'https://github.com/cyberpunk-dev/neural-css',
    liveUrl: 'https://neural-css.dev',
    featured: false,
    year: 2025,
  },
  {
    id: 'void-api',
    title: 'Void API',
    description:
      'Mock API generator that creates realistic fake data with proper relationships and validation.',
    techStack: ['Node.js', 'TypeScript', 'JSON Schema', 'Docker', 'GraphQL'],
    githubUrl: 'https://github.com/cyberpunk-dev/void-api',
    liveUrl: 'https://void-api.dev',
    featured: false,
    year: 2024,
  },
  {
    id: 'pixel-perfect',
    title: 'Pixel Perfect',
    description:
      'Visual regression testing tool that uses AI to detect layout shifts and design inconsistencies.',
    techStack: ['Python', 'Playwright', 'OpenCV', 'Next.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/cyberpunk-dev/pixel-perfect',
    liveUrl: 'https://pixel-perfect.dev',
    featured: false,
    year: 2025,
  },
  {
    id: 'hyper-forms',
    title: 'Hyper Forms',
    description:
      'Serverless form backend with spam filtering, analytics, and webhook integrations.',
    techStack: ['Node.js', 'TypeScript', 'AWS Lambda', 'DynamoDB', 'Serverless'],
    githubUrl: 'https://github.com/cyberpunk-dev/hyper-forms',
    liveUrl: 'https://hyper-forms.dev',
    featured: false,
    year: 2024,
  },
  {
    id: 'grid-stack',
    title: 'Grid Stack',
    description: 'Drag-and-drop page builder with responsive breakpoints and component locking.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'dnd-kit', 'Zustand'],
    githubUrl: 'https://github.com/cyberpunk-dev/grid-stack',
    liveUrl: 'https://grid-stack.dev',
    featured: false,
    year: 2025,
  },
  {
    id: 'code-pulse',
    title: 'Code Pulse',
    description:
      'Real-time code collaboration with cursor presence, voice chat, and shared terminals.',
    techStack: ['Node.js', 'WebRTC', 'CodeMirror', 'Socket.io', 'Redis'],
    githubUrl: 'https://github.com/cyberpunk-dev/code-pulse',
    liveUrl: 'https://code-pulse.dev',
    featured: false,
    year: 2025,
  },
];

export const allTechTags = Array.from(new Set(projects.flatMap((p) => p.techStack))).sort();
