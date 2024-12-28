import type { CustomTheme, Config as DaisyConfig } from 'daisyui';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const baseTheme = {
  '.drawer': {
    width: 'auto',
  },
};

// const colorConvertor = import('daisyui/src/theming/functions.js');

const themes: CustomTheme = {
  light: {
    ...require('daisyui/src/theming/themes')['light'],
    ...baseTheme,
    primary: '#28B876',
    'primary-content': '#FFF',

    success: '#1CB0A5',
    error: '#E0526A',
    warning: '#E99E0C',
    info: '#256EF6',

    // neutral: '#F9F9FB',
    neutral: '#CBD5DF80',
    'neutral-content': '#20222A',

    '--neutral-md': '#CBD5DF',
  },
  dark: {
    ...require('daisyui/src/theming/themes')['dark'],
    primary: '#1DD680',

    success: '#12BAAE',
    error: '#D04D63',
    warning: '#FDA802',
    info: '#508BF7',
  },
};

Object.entries(themes).forEach(([name, th]) => {
  delete th['secondary'];
  delete th['secondary-content'];
});

const gridTemplate = plugin(({ matchUtilities, theme }) => {
  matchUtilities(
    { 'grid-area': (value) => ({ gridArea: `area-${value}` }) },
    { values: { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6 } }
  );
});

const tagComponent = plugin(({ addComponents, matchComponents }) => {
  addComponents({ '.tag': { background: '#CBD5DF7f' } }, {});
  // matchComponents({ tag: (values) => ({ padding: '0.75rem', background: '#CBD5DF7f' }) }, {  });
});

const textUtility = plugin(({ addUtilities }) => {
  addUtilities({ '.text-bidi': { unicodeBidi: 'plaintext' } }, {});
});

const colors = require('tailwindcss/colors')

const config: Config = {
  daisyui: { logs: false, themes: [themes], utils: true } as DaisyConfig,
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  safelist: [
    { pattern: /bg-custom/ },
    // { pattern: /bg-custom2-?/ },
  ],
  theme: {
    extend: {
      colors: {
        custom1: colors.emerald,
        custom2: colors.teal,
        custom3: colors.cyan,
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui'), gridTemplate, tagComponent, textUtility],
};
export default config;
