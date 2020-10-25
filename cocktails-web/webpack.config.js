const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/;

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
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules|build/,
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
      new Dotenv(),
   ],
   node: {
      fs: 'empty',
   },
};
