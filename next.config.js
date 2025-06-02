/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Image optimization
  images: {
    domains: ['localhost', 'academialens.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Webpack configuration with Turbopack support
  webpack: (config, { isServer }) => {
    // Add custom webpack configurations here
    if (!isServer) {
      // Configure client-side only modules
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_APP_ENV: process.env.NODE_ENV || 'development',
  },

  // Enable Turbopack
  experimental: {
    turbo: {},
  },
};

export default withBundleAnalyzerConfig(nextConfig);
