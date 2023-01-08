/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
	content: ['./index.html', './src/**/*.tsx'],
	darkMode: 'class',
	theme: {
		extend: {
			backgroundImage: {
				'default-gradient':
					'linear-gradient(165deg, #F5F5F5 0%, #EEEEEE 25%, #EEEEEE 50%, #EEEEEE 75%, #F5F5F5 100%)'
			},
			colors: {
				primary: 'var(--color-primary)',
				secondary: 'var(--color-secondary)',
				popup: 'var(--color-popup)',
				outline: 'var(--color-outline)'
			},
			spacing: {
				main: '12px'
			},
			boxShadow: {
				thin: '0px 0px 2px 0px rgba(0, 0, 0, 0.25);'
			}
		}
	},
	plugins: []
}
