import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./contexts/**/*.{js,ts,jsx,tsx}',
		'./domains/**/*.{js,ts,jsx,tsx}',
		'../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
	],
	// Theme is defined in CSS @theme blocks, not here
	// See app/globals.css
	// Note: Some Tailwind 3 plugins may not be compatible with Tailwind 4
	// Consider migrating to Tailwind 4 native features
	plugins: [
		// Tailwind 4 handles typography and forms natively
		// Only include plugins that are compatible with Tailwind 4
	],
}

export default config


