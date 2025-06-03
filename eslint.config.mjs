import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Original configuration
const baseConfig = [...compat.extends('next/core-web-vitals', 'next/typescript')];

// Add ignores to the configuration
const eslintConfig = [
  ...baseConfig,
  {
    ignores: [
      ".next/",
      ".imdone/",
      "public/plans/.imdone/",
      "node_modules/", // Good practice to explicitly ignore node_modules here too
      "dist/",
      "build/",
      "out/"
    ]
  }
];

export default eslintConfig;
