import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  distDir: './dist',
  sassOptions: {
    prependData: `
    @use "./src/styles/_vars.scss" as *;
    @use "./src/styles/_mixins.scss" as *;
    `,
  },
};

export default nextConfig;
