import type { CustomTheme } from 'daisyui';
import type { Config } from 'tailwindcss';

const themes: CustomTheme = {
  light: {
    ...require('daisyui/src/theming/themes')['light'],
    primary: '#28B876',
    'primary-content': '#FFF',

    success: '#1CB0A5',
    error: '#E0526A',
    warning: '#E99E0C',
    info: '#256EF6',

    neutral: '#F9F9FB',
    'neutral-content': '#20222A',

    '.btn.btn-transparent': {
      background: 'transparent',
      border: 'none',
    }

    // secondary: 'teal',
  },
  dark: {
    ...require('daisyui/src/theming/themes')['dark'],
    primary: '#1DD680',

    success: '#12BAAE',
    error: '#D04D63',
    warning: '#FDA802',
    info: '#508BF7',

    // secondary: 'teal',
  },
};

Object.entries(themes).forEach(([name, th]) => {
  delete th['secondary']
  delete th['secondary-content']
})

const config: Config = {
  daisyui: { themes: [themes] },
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
};
export default config;
