const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');
const path = require('path');

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

module.exports = {
   mode: 'development',
   devServer: {
      hot: true,
      disableHostCheck: true,
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
         patterns: [
            { from: './public/sw.js' },
            { from: './public/favicon.png' },
         ],
      }),
      new webpack.DefinePlugin(envKeys),
      new webpack.HotModuleReplacementPlugin(),
   ],
};
