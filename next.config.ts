import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: '/index.html', destination: '/' },
      { source: '/architecture.html', destination: '/architecture' },
      { source: '/culture.html', destination: '/culture' },
      { source: '/garden.html', destination: '/garden' },
      { source: '/outdoor.html', destination: '/outdoor' },
      { source: '/promotional.html', destination: '/promotional' }
    ];
  },
};

export default nextConfig;
