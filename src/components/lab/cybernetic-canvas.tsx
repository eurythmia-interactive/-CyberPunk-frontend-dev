'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import type * as THREE from 'three';

/**
 * A wireframe torus that follows the mouse cursor.
 * The color syncs with the current theme (dark = cyan, light = blue).
 */
function CyberneticTorus() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { resolvedTheme } = useTheme();

  // Get theme-based color
  const getThemeColor = () => {
    if (resolvedTheme === 'dark') {
      return '#00f0ff'; // Neon cyan for dark mode
    }
    return '#3b82f6'; // Blue for light mode (Corpo E-Ink)
  };

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to -1 to 1
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animate mesh to follow mouse
  useFrame(() => {
    if (!meshRef.current) return;

    // Smooth interpolation towards mouse position
    const targetRotationX = mousePosition.y * Math.PI * 0.3;
    const targetRotationY = mousePosition.x * Math.PI * 0.3;

    meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.05;
    meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.05;

    // Gentle continuous rotation when idle
    meshRef.current.rotation.z += 0.002;
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <meshBasicMaterial wireframe color={getThemeColor()} />
    </mesh>
  );
}

/**
 * Floating wireframe icosahedron for added visual interest
 */
function FloatingIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { resolvedTheme } = useTheme();
  const [hovered, setHovered] = useState(false);

  const getThemeColor = () => {
    if (resolvedTheme === 'dark') {
      return '#00ff41'; // Matrix green for dark mode
    }
    return '#8b5cf6'; // Purple accent for light mode
  };

  useFrame((state) => {
    if (!meshRef.current) return;
    // Gentle floating animation
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    meshRef.current.rotation.x += 0.005;
    meshRef.current.rotation.y += 0.008;
  });

  return (
    <mesh
      ref={meshRef}
      position={[2, 0, -1]}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <icosahedronGeometry args={[0.6, 1]} />
      <meshBasicMaterial
        wireframe
        color={getThemeColor()}
        opacity={hovered ? 1 : 0.6}
        transparent
      />
    </mesh>
  );
}

/**
 * Main R3F Canvas component with dark/light theme sync
 */
export function CyberneticCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ background: 'transparent' }}>
      {/* Ambient light for overall visibility */}
      <ambientLight intensity={0.5} />

      {/* Main cybernetic torus */}
      <CyberneticTorus />

      {/* Floating icosahedron */}
      <FloatingIcosahedron />

      {/* Grid helper for cyberpunk aesthetic */}
      <gridHelper args={[20, 20, '#1a1a2e', '#1a1a2e']} position={[0, -2, 0]} />
    </Canvas>
  );
}
