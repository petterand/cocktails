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
   devtool: 'inline-source-map',
   resolve: {
      extensions: ['.tsx', '.ts', '.js'],
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules|build|dist/,
            use: {
               loader: 'babel-loader',
            },
         },
         {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
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
            loader: require.resolve('file-loader'),
            options: {
               name: 'assets/[name].[hash:8].[ext]',
            },
         },
      ],
   },
   plugins: [
      new HtmlWebPackPlugin({
         template: './public/index.html',
         filename: './index.html',
         favicon: './public/favicon.png',
      }),
      new CopyPlugin({ patterns: [{ from: './public/sw.js' }] }),
      new webpack.DefinePlugin(envKeys),
   ],
};
