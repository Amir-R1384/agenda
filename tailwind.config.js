/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
	content: ['./src/**/*.tsx'],
	theme: {
		extend: {
			backgroundImage: {
				'default-gradient':
					'linear-gradient(165deg, #F5F5F5 0%, #EEEEEE 25%, #EEEEEE 50%, #EEEEEE 75%, #F5F5F5 100%)'
			},
			colors: {
				'dark-1': colors.neutral['900'],
				'dark-2': colors.neutral['600'],

				popup: colors.neutral['200']
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
