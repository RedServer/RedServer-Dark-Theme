const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
	const inDev = argv.mode === undefined || argv.mode === 'development';
	return {
		mode: 'development',
		entry: {
			'forum': './src/forum/_main.scss',
			'forum.user': './src/forum/_user.scss'
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].js',
			clean: true
		},
		devtool: inDev ? 'source-map' : false,
		module: {
			rules: [
				{
					test: /\.css$/,
					use: [MiniCssExtractPlugin.loader, 'css-loader'],
				},
				{
					test: /\.scss$/,
					use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
				},
				{
					test: /\.(png|jpg|jpeg|gif|webp)$/i,
					type: inDev ? 'asset/resource' : 'asset/inline'
				},
			]
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: '[name].css',
			})
		],
		devServer: {
			compress: false,
			port: 9000,
		},
		optimization: {
			removeEmptyChunks: false,
		}
	};
};

