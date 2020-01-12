const path = require('path');

module.exports = {
  mode: 'development',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        // Options to configure the babel. here we have set up the preset. this can be replaced with .babelrc file
        query: {
            presets: ['@babel/env']
        }
    },
  ]
  },
  
};