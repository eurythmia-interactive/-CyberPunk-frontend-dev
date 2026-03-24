'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Github, Star } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ParallaxBackground } from '@/components/ui/parallax-background';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal';
import type { Project } from '@/data/projects';
import { allTechTags, projects } from '@/data/projects';

export default function ProjectsPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredProjects =
    selectedTags.length > 0
      ? projects.filter((p) => selectedTags.every((tag) => p.techStack.includes(tag)))
      : projects;

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => setSelectedTags([]);

  return (
    <main id="main-content" className="min-h-screen text-fg-base relative overflow-hidden">
      {/* Parallax Background */}
      <ParallaxBackground gridSpeed={0.5} decorationSpeed={1.2} />

      <div className="mx-auto max-w-6xl px-6 py-20 relative z-10">
        {/* Header */}
        <Reveal className="mb-16">
          <h1 className="text-display text-gradient-cyber mb-4">Projects</h1>
          <p className="text-h3 font-mono text-brand-accent mb-4">The Archives</p>
          <p className="text-body text-foreground/70 max-w-2xl">
            A curated collection of work demonstrating expertise in modern frontend development.
            Each project represents a unique challenge solved with careful architecture and
            attention to detail.
          </p>
        </Reveal>

        {/* Filter Tags */}
        <Reveal delay={0.1} className="mb-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono text-foreground/50 uppercase tracking-widest">
              Filter by:
            </span>
            {allTechTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`transition-all duration-200 ${
                  selectedTags.includes(tag) ? 'scale-105' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Badge
                  variant={selectedTags.includes(tag) ? 'primary' : 'outline'}
                  className="cursor-pointer"
                >
                  {tag}
                </Badge>
              </button>
            ))}
            {selectedTags.length > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-mono text-error hover:text-error/80 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        </Reveal>

        {/* Projects Grid */}
        <RevealGroup staggerInterval={0.05} staggerDelay={0.2}>
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <RevealItem key={project.id}>
                  <ProjectCard
                    project={project}
                    isHovered={hoveredId === project.id}
                    onHoverChange={setHoveredId}
                  />
                </RevealItem>
              ))}
            </AnimatePresence>
          </motion.div>
        </RevealGroup>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <Reveal>
            <div className="text-center py-20">
              <p className="text-h3 font-mono text-foreground/40 mb-4">
                No projects match the selected filters.
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear filters
              </Button>
            </div>
          </Reveal>
        )}
      </div>
    </main>
  );
}

interface ProjectCardProps {
  project: Project;
  isHovered: boolean;
  onHoverChange: (id: string | null) => void;
}

function ProjectCard({ project, isHovered, onHoverChange }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTilt({ x: rotateX, y: rotateY });
    setGlarePosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    onHoverChange(null);
  }, [onHoverChange]);

  const handleMouseEnter = useCallback(() => {
    onHoverChange(project.id);
  }, [project.id, onHoverChange]);

  const handleClick = useCallback(() => {
    // Future: Open project detail modal or navigate to project page
    // The layoutId enables smooth morphing animation when paired with shared layout
  }, []);

  return (
    <motion.div
      layoutId={`project-card-${project.id}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
    >
      {/* biome-ignore lint/a11y/noStaticElementInteractions: card container with 3D tilt mouse interaction */}
      <div
        ref={cardRef}
        className="relative rounded-xl border border-border bg-surface/50 p-6 cursor-pointer transition-shadow duration-300 hover:shadow-neon-cyan/20"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered ? 'none' : 'transform 0.3s ease-out',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        {/* Shared layout element for card content */}
        <motion.div layoutId={`project-card-content-${project.id}`}>
          {/* Holographic glare effect */}
          <div
            className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                {project.featured && (
                  <span className="inline-flex items-center gap-1 text-xs font-mono text-brand-accent">
                    <Star size={12} />
                    Featured
                  </span>
                )}
              </div>
              <span className="text-xs font-mono text-foreground/40">{project.year}</span>
            </div>

            {/* Title */}
            <h3 className="text-h3 font-mono mb-3 group-hover:text-brand-primary transition-colors">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-small text-foreground/60 mb-6 line-clamp-3">{project.description}</p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded-full bg-surface-elevated border border-border text-[10px] font-mono text-foreground/60"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-foreground/40">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>

            {/* Links */}
            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-foreground/60 hover:text-brand-primary transition-colors"
              >
                <Github size={14} />
                Source
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-foreground/60 hover:text-brand-accent transition-colors"
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            </div>
          </div>

          {/* Border glow on hover */}
          <div
            className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              boxShadow: 'inset 0 0 20px rgba(0, 240, 255, 0.1), 0 0 20px rgba(0, 240, 255, 0.05)',
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
