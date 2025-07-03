/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'system': ['MS Sans Serif', 'Tahoma', 'sans-serif'],
        'mono': ['Courier New', 'monospace'],
      },
      colors: {
        win95: {
          gray: '#c0c0c0',
          darkgray: '#808080',
          lightgray: '#e0e0e0',
          white: '#ffffff',
          black: '#000000',
          blue: '#000080',
          darkblue: '#000040',
          cyan: '#008080',
          teal: '#008b8b',
          purple: '#800080',
          magenta: '#ff00ff',
          yellow: '#ffff00',
          lime: '#00ff00',
          red: '#ff0000',
          green: '#008000',
          navy: '#000080',
          silver: '#c0c0c0',
          maroon: '#800000',
          olive: '#808000',
          aqua: '#00ffff',
          fuchsia: '#ff00ff',
        },
        y2k: {
          pink: '#ff69b4',
          cyan: '#00ffff',
          lime: '#32cd32',
          orange: '#ffa500',
          violet: '#ee82ee',
          gold: '#ffd700',
          coral: '#ff7f50',
          turquoise: '#40e0d0',
        }
      },
      backgroundImage: {
        'win95-desktop': 'linear-gradient(135deg, #008080, #20b2aa)',
        'win95-clouds': 'radial-gradient(ellipse at center, rgba(255,255,255,0.8) 0%, rgba(135,206,235,0.6) 100%)',
      },
      boxShadow: {
        'win95-inset': 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080',
        'win95-outset': '1px 1px 0px #ffffff, -1px -1px 0px #808080, 1px 1px 0px #808080 inset',
        'win95-pressed': 'inset 1px 1px 0px #808080, inset -1px -1px 0px #ffffff',
        'win95-window': '2px 2px 4px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
};