const { mergeWithRules } = require('webpack-merge');
const { commonConfig, mergeRuleOptions } = require('./webpack.common');

const config = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    open: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(c|sa|sc)ss$/i,
        use: ['style-loader']
      }
    ]
  }
};

module.exports = mergeWithRules(mergeRuleOptions)(commonConfig, config);
