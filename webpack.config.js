var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

module.exports = {
	entry: {
		vendors: ['jquery', 'bootstrap-webpack']
	},
	output: {
		path: "./public/javascripts",
		filename: "[name].js"
	},
	module: {
		loaders: [
			// **IMPORTANT** This is needed so that each bootstrap js file required by
			// bootstrap-webpack has access to the jQuery object
			//{ test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery', exclude: [node_modules_dir] },

			// Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
			// loads bootstrap's css.
			{ test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?name=../fonts/[name].[ext]&limit=10000&mimetype=application/font-woff" },
			{ test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?name=../fonts/[name].[ext]&limit=10000&mimetype=application/font-woff2" },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?name=../fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream" },
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=../fonts/[name].[ext]" },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?name=../fonts/[name].[ext]&limit=10000&mimetype=image/svg+xml" }
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			'root.jQuery': 'jquery'
		}),
		// 第一個參數對應到 entry 內的屬性名
		// 第二個參數是輸出檔案的名稱
		new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
	]
};
