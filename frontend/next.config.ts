import path from 'path';

import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // УБРАТЬ
  },
  eslint: {
    ignoreDuringBuilds: true, // УБРАТЬ
  },
  distDir: './dist',
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')],
    prependData: `
      @use "@shared/styles/_vars.scss" as *;
      @use "@shared/styles/_mixins.scss" as *;
  `,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.dodostatic.net',
        port: '',
        pathname: '/image/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'cdpiz1.pizzasoft.ru',
      },
    ],
  },
  reactStrictMode: true,
  // turbopack: {
  //   // Enable polling for file changes in Docker
  //   // watchOptions: {
  //   //   pollIntervalMs: 1000, // Poll every second
  //   // },
  //   // // Resolve aliases if needed
  //   // resolveAlias: {
  //   //   '@': path.join(__dirname, 'src'),
  //   //   '@shared': path.join(__dirname, 'src/shared'),
  //   //   // ... other aliases
  //   // },
  // },

  // output: 'standalone',
  // outputFileTracingRoot: path.join(__dirname, '../../'),
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.watchOptions = {
        poll: 1000, // Poll every 1 second
        aggregateTimeout: 300, // Delay before rebuilding
      };
    }
    return config;
  },
};

// export default nextConfig;
// Make sure you wrap your `nextConfig`
// with the `withPayload` plugin
export default nextConfig;
