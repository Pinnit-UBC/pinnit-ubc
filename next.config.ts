import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals = [...(config.externals || []), 'mongoose']; // Exclude mongoose from being bundled
    return config;
  },
};

export default nextConfig;
