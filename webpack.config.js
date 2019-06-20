var path = require('path');

module.exports = {
	mode: 'development',
	entry: {
		app: ['./src/client/index.jsx'],
	},
	output: {
		filename: '[name].js',
		publicPath: '/',
	},
	resolve: {
		modules: ['node_modules', path.resolve(__dirname, 'src')],
		extensions: ['.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /(\.js|\.jsx)$/,
				include: [
					path.resolve(__dirname, 'src'),
					path.resolve(__dirname, 'node_modules'),
				],
				exclude: [/\/@babel/],
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},
		],
	},
};
