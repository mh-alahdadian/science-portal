import type { Config as DaisyConfig } from 'daisyui';
import type { Config } from 'tailwindcss';

const daisyui: DaisyConfig = {
  themes: ['light'],
};

const config: Config = {
  daisyui,
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('daisyui')],
  corePlugins: {
    preflight: false,
  },
};
export default config;
