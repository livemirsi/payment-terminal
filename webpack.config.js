const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	mode:   'development',
	entry:  { main: path.join(__dirname, '/src/index.js') },
	output: {
		filename:   '[name].js',
		path:       path.join(__dirname, '/dist'),
		publicPath: '/'
	},
	watch:     false,
	// devtool:   'cheap-eval-source-map',
	devtool:   false,
	devServer: {
		contentBase:        './dist',
		publicPath:         '/',
		port:      	        3000,
		quiet:              true,
		historyApiFallback: true,
		overlay:            {
			warnings: false,
			errors:   true
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			title:    'Payment terminal',
			template: path.join(__dirname, '/public/index.html'),
			inject:   'body'
		}),
		new FriendlyErrorsWebpackPlugin(),
		new webpack.SourceMapDevToolPlugin({ filename: '[file].map' }),
		new CopyWebpackPlugin([{
			from: 'public/images',
			to:   'images'
		}])
	],
	module: { rules: [
		{
			enforce: 'pre',
			test:    /\.(js|jsx)$/,
			exclude: /node_modules/,
			use:     [
				{
					loader:  'eslint-loader',
					options: { fix: true }
				},
				{ loader: 'stylelint-custom-processor-loader' }
			]
		},
		{
			test:    /\.(js|jsx)$/,
			exclude: /node_modules/,
			use:     {
				loader:  'babel-loader',
				options: { plugins: [] }
			}
		},
		{
			test: /\.(png|jpg|gif|svg)$/,
			use:  [
				{
					loader:  'file-loader',
					options: {
						name:       '[name].[ext]',
						outputPath: 'images/'
					}
				}
			]
		}
	] },
	resolve: { extensions: ['.js', '.jsx'] }
};
