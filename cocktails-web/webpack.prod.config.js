const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');
const path = require('path');
const BrotliPlugin = require('brotli-webpack-plugin');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/;

const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
   prev[`process.env.${next}`] = JSON.stringify(env[next]);
   return prev;
}, {});

const getStyleLoaders = (cssOptions, preProcessor) => {
   const loaders = [
      require.resolve('style-loader'),
      {
         loader: require.resolve('css-loader'),
         options: cssOptions,
      },
   ];

   if (preProcessor) {
      loaders.push({
         loader: require.resolve(preProcessor),
         options: {
            sourceMap: cssOptions.sourceMap,
         },
      });
   }

   return loaders;
};

module.exports = [
   {
      mode: 'production',
      output: {
         path: path.resolve(__dirname, 'dist'),
         filename: '[name].[contenthash].js',
      },
      optimization: {
         splitChunks: {
            chunks: 'all',
            cacheGroups: {
               vendor: {
                  test: /[\\/]node_modules[\\/]/,
                  name(module) {
                     // get the name. E.g. node_modules/packageName/not/this/part.js
                     // or node_modules/packageName
                     const packageName = module.context.match(
                        /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                     )[1];

                     // npm package names are URL-safe, but some servers don't like @ symbols
                     return `npm.${packageName.replace('@', '')}`;
                  },
               },
            },
         },
      },
      resolve: {
         extensions: ['.ts', '.js'],
      },
      module: {
         rules: [
            {
               test: /\.(js|ts)/,
               include: path.resolve(__dirname, 'src'),
               exclude: /node_modules|build|dist/,
               use: {
                  loader: 'babel-loader',
               },
            },
            {
               test: cssRegex,
               exclude: cssModuleRegex,
               use: getStyleLoaders({
                  importLoaders: 1,
               }),
            },
            {
               test: cssModuleRegex,
               use: getStyleLoaders({
                  importLoaders: 1,
                  modules: true,
                  localIdentName: '[path][name]__[local]--[hash:base64:5]',
               }),
            },
            {
               test: lessRegex,
               use: getStyleLoaders({ importLoaders: 2 }, 'less-loader'),
            },
            {
               test: /\.svg$/,
               type: 'asset/inline',
            },
         ],
      },
      plugins: [
         new HtmlWebPackPlugin({
            template: './public/index.html',
            filename: './index.html',
            favicon: './public/favicon.png',
         }),
         new CopyPlugin({
            patterns: [{ from: './public/favicon.png' }],
         }),
         new webpack.DefinePlugin(envKeys),
         new BrotliPlugin({
            asset: '[path].br[query]',
            test: /\.js$|\.html$/,
            threshold: 10240,
            minRatio: 0.7,
         }),
      ],
   },
   {
      entry: path.resolve(__dirname, 'public/sw.js'),
      output: {
         filename: 'sw.js',
         path: path.resolve(__dirname, 'dist'),
      },
      plugins: [new webpack.DefinePlugin(envKeys)],
   },
];
