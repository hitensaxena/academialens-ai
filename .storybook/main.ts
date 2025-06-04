import type { StorybookConfig } from '@storybook/nextjs-vite';
import tsconfigPaths from 'vite-tsconfig-paths'; // Import the plugin
import { mergeConfig } from 'vite'; // Required to merge vite configs
import path, { dirname } from 'path'; // Modified import
import { fileURLToPath } from 'url'; // Added import

// Import Tailwind and Autoprefixer
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirnameEsm = dirname(__filename); // Renamed to avoid conflict if config is CJS

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-interactions',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  staticDirs: ['../public'],
  // Add the viteFinal function here
  async viteFinal(config) {
    // Merge with the existing Vite config
    return mergeConfig(config, {
      plugins: [tsconfigPaths()],
      css: {
        postcss: {
          plugins: [
            // Pass the Tailwind config path directly
            tailwindcss({ config: path.resolve(__dirnameEsm, '..', 'tailwind.config.mjs') }),
            autoprefixer, // Autoprefixer doesn't usually need explicit config here
          ],
        },
      },
    });
  },
};
export default config;
