import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import PreloadWebpackPlugin from 'preload-webpack-plugin';
import path from 'path';
import fs from 'fs';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CleanPlugin from 'clean-webpack-plugin';
import StyleExtHtmlWebpackPlugin from 'style-ext-html-webpack-plugin';
import ServiceWorkerWebpackPlugin from 'serviceworker-webpack-plugin';

const babelSettings = JSON.parse(fs.readFileSync(".babelrc"))

const ENV = process.env.NODE_ENV || 'development';

const MDC_DIR = path.resolve(__dirname, 'node_modules', '@material');

const CSS_MAPS = ENV!=='production';

const criticalCSS = new ExtractTextPlugin('critical.css');
const nonCritical = new ExtractTextPlugin({
				filename: '[name].' + (ENV === 'production' ? '[chunkhash]' : '[hash]') + '.css',
				allChunks: true,
				disable: ENV!=='production'
			})
// the path(s) that should be cleaned
const pathsToClean = [
  'build'
]

// the clean options to use
const cleanOptions = {
  root:     __dirname,
  verbose:  true,
  dry:      false
}

module.exports = {
	context: path.resolve(__dirname, "src"),
	entry:
	{
		app: path.resolve(__dirname, './src/index.js'),
		// vendors.js separate gives a much bigger total file
		// than all combined in app.js
		vendors: [
			'@material/drawer',
			'@material/ripple',
			'@material/textfield',
			'@material/linear-progress',
			// 'preact',
			// 'react-redux',
			// 'react-router',
			// 'react-router-dom',
			// 'react-apollo',
			// 'history',
			// 'apollo-client',
			// 'graphql'
		]
	},

	output: {
		path: path.resolve(__dirname, "build"),
		publicPath: '/',
		filename: '[name].' + (ENV === 'production' ? '[chunkhash]' : '[hash]') + '.js',
		chunkFilename: '[name]-[chunkhash].js',
	},

	resolve: {
		extensions: ['.jsx', '.js', '.json', '.less'],
		modules: [
			path.resolve(__dirname, "src/lib"),
			path.resolve(__dirname, "node_modules"),
			'node_modules'
		],
		alias: {
			components: path.resolve(__dirname, "src/components"),		// used for tests
			style: path.resolve(__dirname, "src/style"),
			'react': 'preact-compat',
			'react-dom': 'preact-compat'
		}
	},

	module: {
		rules: [
	        {
	        	enforce: 'pre',
	            test: /\.js/,
	            exclude: [
	            	//TODO
	            	/src\/components\/mdc\//,
	            	/src\/components\/apps\//,
	            	/src\/components\/graphQlonAppShellTest.js/,
	            	/src\/components\/home\//,
	            	/src\/reducers\//,
	            	/src\/store\//,
	            	/src\/containers\//,
	            	/src\/index.js/,
	            	/src\/serviceWorker.js/,
	            ],
	            loader: 'eslint-loader'
	        },
			{
				enforce: "pre",
				test: /\.jsx$/,
				exclude: /src\//,
				loader: 'source-map-loader'
			},
			{
				test: /\.(jsx|js)$/,
				include: [
          			MDC_DIR,
					/src\//
        		],
				loader: 'babel-loader',
        		query: babelSettings
			},
			{
				test: /critical\.(less|css)$/,
				include: /critical\.(less|css)$/,
				loader: criticalCSS.extract({

					use: [
							{
								loader: 'css-loader',
								options: {
									import: true,
									modules: true,
									importLoaders: 1,
									minimize: CSS_MAPS,
									// sourceMap: true,
									localIdentName: `[local]${process.env.CSS_MODULES_IDENT || '_[hash:base64:5]'}`
								}
							},
							{
								loader: 'postcss-loader'
							},
							{
								loader: 'less-loader',
								options: {
									// sourceMap: true
								}
							}
						],
						fallback: 'style-loader?singleton',
				})
			},
			{
				test: /\.css$/,
				include: /src\/components\/mdc\//,
				loader: nonCritical.extract({
					use: [
							{
								loader: 'css-loader',
								options: {
									// sourceMap: true
								}
							},
							{
								loader: 'postcss-loader'
							}
						],
						fallback: 'style-loader?singleton',
				})
			},
			{
				test: /\.(less|css)$/,
				include: /src\/components\//,
				exclude: [
					/critical\.(less|css)$/,
					/src\/components\/mdc\//
				],
				loader: nonCritical.extract({
					use: [

							{
								loader: 'css-loader',
								options: {
									import: true,
									modules: true,
									importLoaders: 1,
									minimize: CSS_MAPS,
									// sourceMap: true,
									localIdentName: `[local]${process.env.CSS_MODULES_IDENT || '_[hash:base64:5]'}`
								}
							},
							{
								loader: 'postcss-loader'
							},
							{
								loader: 'less-loader',
								options: {
									// sourceMap: true
								}
							}
						],
						fallback: 'style-loader?singleton',
				})
			},
			{
				test: /\.(less|css)$/,
				exclude: [
					/src\/components\//,
					/critical\.(less|css)$/,
					/src\/components\/mdc\//
				],
				loader: nonCritical.extract({
					use: [
							{
								loader: 'css-loader',
								options: {
									// sourceMap: true
								}
							},
							{
								loader: 'postcss-loader'
							},
							{
								loader: 'less-loader',
								options: {
									// sourceMap: true
								}
							}
						],
						fallback: 'style-loader?singleton',
				})
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.(xml|html|txt|md)$/,
				loader: 'raw-loader'
			},
			{
				test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
				loader: ENV ==='production' ? 'file?name=[path][name]_[hash:base64:5].[ext]' : 'url-loader',
			    query: {
			    	//TODO - test with prod
      				limit: 10000,
    			}
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				loaders: [
				  'file-loader',
				  {
				    loader: 'image-webpack-loader',
				    query: {
				      progressive: true,
				      optimizationLevel: 7,
				      interlaced: false,
				      pngquant: {
				        quality: '65-90',
				        speed: 4
				      }
				    }
				  }
				]
			},
			//TODO - add baggage-loader
			//TODO - js async
			//TODO - do we need preload/prefetch css? seems like it already has the Highest priority on main()
			//TODO - serviceWorker and Manifest generation!! -> ServiceWorkerWebpackPlugin
		]
	},

	plugins: ([
		new webpack.NoEmitOnErrorsPlugin(),
		// new webpack.DefinePlugin({
		// 	'process.env': JSON.stringify({ NODE_ENV: ENV }),
		// 	// 'process.env.NODE_ENV': ENV
		// }),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [
					autoprefixer({ browsers: 'last 2 versions' }),
				]
			}
		}),
		new webpack.NormalModuleReplacementPlugin(/(.*)-ENV_TARGET(\.*)/, function(resource) {
			resource.request = resource.request.replace(/-ENV_TARGET/, `-${ENV}`);
		}),

		new HtmlWebpackPlugin({
			template: './index.html',
			minify: { collapseWhitespace: true }
		}),

		nonCritical,
		criticalCSS,

		new StyleExtHtmlWebpackPlugin(
			'critical.css'
			// this bellow will include the link
			// to non-exisisting critical.css
			// TODO: report issue
			// {
			// 	file: 'critical.css',
			// 	position: 'head-top',
			// 	minify: true
			// }
		),


 		//might come handy later on scale
		// new webpack.optimize.AggressiveSplittingPlugin({
		// 	minSize: 30000,
		// 	maxSize: 50000
		// }),
		new CopyWebpackPlugin([
			// { from: './serviceWorker.js', to: './' },
			{ from: './manifest.json', to: './' },
			{ from: './favicon.ico', to: './' }
		]),
		// vendors.js separate gives a much bigger total file
		// than all combined in app.js
		// and there are no common modules yet
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendors',
			filename: '[name].' + (ENV === 'production' ? '[chunkhash]' : '[hash]') + '.js',
			// chunks: ["A", "B"],
			// async: true,
			// children: true,
			// minChunks: 2,
		})

		// Still need some experimentation and adjustment
	    // new ServiceWorkerWebpackPlugin({
     //  		entry: path.join(__dirname, 'src/serviceWorker.js')
    	// }),

	]).concat(ENV==='production' ? [

 		new PreloadWebpackPlugin({
		    rel: 'preload',
		    as: 'script',
		    fileBlacklist: [/\.css$/,/\.map/],
		    include: ['app']//, 'vendors']
 		}),
 		new PreloadWebpackPlugin({
		    rel: 'prefetch',
		    as: 'script',
		    fileBlacklist: [/\.css$/,/\.map/],
		    include: 'asyncChunks'
 		}),
 			
		new CleanPlugin(pathsToClean, cleanOptions),
        // This plugin looks for similar chunks and files
        // and merges them for better caching by the user
		new webpack.optimize.OccurrenceOrderPlugin(),
        // This plugin prevents Webpack from creating chunks
        // that would be too small to be worth loading separately
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 51200, // ~50kb
        }),

		// just generate report later on once CI is there
		// TODO - add debug
		new BundleAnalyzerPlugin({
					// Can be `server`, `static` or `disabled`.
					// In `server` mode analyzer will start HTTP server to show bundle report.
					// In `static` mode single HTML file with bundle report will be generated.
					// In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
					analyzerMode: 'static',
					// Host that will be used in `server` mode to start HTTP server.
					analyzerHost: 'localhost',
					// Port that will be used in `server` mode to start HTTP server.
					analyzerPort: 8888,
					// Path to bundle report file that will be generated in `static` mode.
					// Relative to bundles output directory.
					reportFilename: 'report.html',
					// Module sizes to show in report by default.
					// Should be one of `stat`, `parsed` or `gzip`.
					// See "Definitions" section for more information.
					defaultSizes: 'start',
					// Automatically open report in default browser
					openAnalyzer: true,
					// If `true`, Webpack Stats JSON file will be generated in bundles output directory
					generateStatsFile: false,
					// Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
					// Relative to bundles output directory.
					statsFilename: 'stats.json',
					// Options for `stats.toJson()` method.
					// For example you can exclude sources of your modules from stats file with `source: false` option.
					// See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
					statsOptions: null,
					// Log level. Can be 'info', 'warn', 'error' or 'silent'.
					logLevel: 'info'
				})
	] : []),

	stats: { colors: true },

	node: {
		global: true,
		process: true,
		Buffer: false,
		__filename: false,
		__dirname: true,
		setImmediate: false
	},

	// devtool: ENV ==='production' ? '' : 'cheap-module-eval-source-map',

	devServer: {
		port: process.env.PORT || 8081,
		host: 'localhost',
		colors: true,
		https: {
    		cert: fs.readFileSync('./certs/cert.pem'),
    		key: fs.readFileSync('./certs/key.pem')
		},
		publicPath: '/',
		contentBase: './src',
		historyApiFallback: true,
		open: true,
		proxy: {
			// OPTIONAL: proxy configuration:
			// '/optional-prefix/**': { // path pattern to rewrite
			//	 target: 'http://target-sec-host.com',
			//	 pathRewrite: path => path.replace(/^\/[^\/]+\//, '')   // strip first path segment
			// }
		}
	}
};
