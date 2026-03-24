import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/-CyberPunk-frontend-dev',
};

export default nextConfig;
