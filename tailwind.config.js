module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	theme: {
		fontFamily: {
			body: 'Nunito Sans, sans-serif',
			heading: 'Roboto, sans-serif'
		},
		extend: {}
	},
	plugins: [require('@tailwindcss/typography')]
};
