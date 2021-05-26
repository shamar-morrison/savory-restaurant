module.exports = {
	plugins: [
		require('postcss-uncss')({
			html: ['./index.html'],
		}),
		require('autoprefixer')({}),
	],
};
