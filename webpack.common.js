const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const publicUrlOrPath = process.env.NODE_ENV === 'development' ?
  // eslint-disable-next-line global-require
  '/' : process.env.PUBLIC_URL || require('./package.json').homepage;

module.exports.commonConfig = {
  entry: './src/index.js',
  output: {
    clean: true,
    publicPath: publicUrlOrPath,
    path: path.resolve(__dirname, 'site'),
    filename: 'static/js/[name].[contenthash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: '[folder]_[local]__[hash:base64:5]'
              },
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env']
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(a?png|avif|gif|jpe?g|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/images/[name].[contenthash].[ext]'
        }
      },
      {
        test: /\.(eot|otf|ttf|woff2?)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[name].[contenthash].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Todo List',
      template: './public/index.html'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};

module.exports.mergeRuleOptions = {
  module: {
    rules: {
      test: 'match',
      use: 'prepend'
    }
  }
};
