const { mergeWithRules } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { commonConfig, mergeRuleOptions } = require('./webpack.common');

const config = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [MiniCssExtractPlugin.loader]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css'
    })
  ]
};

module.exports = mergeWithRules(mergeRuleOptions)(commonConfig, config);
