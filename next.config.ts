<<<<<<< HEAD
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals = [...(config.externals || []), 'mongoose']; // Exclude mongoose from being bundled
    return config;
  },
=======
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
>>>>>>> pinnit-ubc/auth
};

export default nextConfig;
