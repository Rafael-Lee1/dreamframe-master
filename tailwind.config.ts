
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				garden: {
					'bg': '#E5DEFF',
					'accent': '#8B5CF6',
					'green': '#6EE7B7',
					'blue': '#93C5FD',
					'purple': '#C4B5FD',
					'neon': '#A855F7',
					'dark': '#1A1033',
					'cyber': '#0D1A3A'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-gentle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'rotate-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'ripple': {
					'0%': { transform: 'scale(1)', opacity: '1' },
					'100%': { transform: 'scale(1.7)', opacity: '0' }
				},
				'ripple-delayed': {
					'0%': { transform: 'scale(1)', opacity: '0' },
					'20%': { opacity: '1' },
					'100%': { transform: 'scale(2)', opacity: '0' }
				},
				'explosion': {
					'0%': { transform: 'scale(0.5)', opacity: '0.8' },
					'100%': { transform: 'scale(2)', opacity: '0' }
				},
				'fade-up': {
					'0%': { transform: 'translateY(10px) translateX(-50%)', opacity: '0' },
					'100%': { transform: 'translateY(0) translateX(-50%)', opacity: '1' }
				},
				'pulse-fast': {
					'0%': { filter: 'brightness(1)' },
					'50%': { filter: 'brightness(1.5)' },
					'100%': { filter: 'brightness(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-gentle': 'pulse-gentle 4s ease-in-out infinite',
				'rotate-slow': 'rotate-slow 20s linear infinite',
				'ripple': 'ripple 1.5s ease-out infinite',
				'ripple-delayed': 'ripple-delayed 1.5s ease-out 0.5s infinite',
				'explosion': 'explosion 0.8s ease-out forwards',
				'fade-up': 'fade-up 0.3s ease-out forwards',
				'pulse-fast': 'pulse-fast 0.4s ease-in-out 2'
			},
			backgroundImage: {
				'garden-gradient': 'linear-gradient(to bottom, #E5DEFF, #F2FCE2)',
				'glow-purple': 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0) 70%)',
				'cyber-gradient': 'linear-gradient(to bottom, #1A1033, #0D1A3A)',
				'aurora-gradient': 'linear-gradient(to right, #A855F7, #6EE7B7, #93C5FD)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
