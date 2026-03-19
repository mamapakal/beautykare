/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			camel: {
  				50: '#faf6f1',
  				100: '#f3ebe0',
  				200: '#e8d5be',
  				300: '#d4b896',
  				400: '#c4a07a',
  				500: '#b08968',
  				600: '#96724f',
  				700: '#7a5c40',
  				800: '#5c4530',
  				900: '#3d2e20',
  			},
  			cream: '#fdfbf7',
  			warm: '#f5f0ea',
  			charcoal: '#1a1a1a',
  			softgray: '#6b6b6b',
  		},
  		fontFamily: {
  			serif: ['Playfair Display', 'Georgia', 'serif'],
  			sans: ['Inter', 'system-ui', 'sans-serif'],
  		},
  		keyframes: {
  			'float': {
  				'0%, 100%': { transform: 'translateY(0px)' },
  				'50%': { transform: 'translateY(-10px)' },
  			},
  			'fade-up': {
  				'0%': { opacity: '0', transform: 'translateY(30px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' },
  			},
  			'fade-in': {
  				'0%': { opacity: '0' },
  				'100%': { opacity: '1' },
  			},
  			'slide-in-right': {
  				'0%': { opacity: '0', transform: 'translateX(20px)' },
  				'100%': { opacity: '1', transform: 'translateX(0)' },
  			},
  		},
  		animation: {
  			'float': 'float 6s ease-in-out infinite',
  			'float-delayed': 'float 6s ease-in-out 2s infinite',
  			'fade-up': 'fade-up 0.8s ease-out forwards',
  			'fade-in': 'fade-in 0.6s ease-out forwards',
  			'slide-in-right': 'slide-in-right 0.5s ease-out forwards',
  		},
  	}
  },
  plugins: [import("tailwindcss-animate")],
}

