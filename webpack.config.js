const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode:'development',
    entry: './src/index.js',
    plugins : [
        new HtmlWebpackPlugin({
            title: 'Development',
            template: './src/index.html'
        })
    ],
    output: {
        filename : 'main.js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'images/[hash][ext][query]',
    },
    module: {

        rules: [
    
          {
    
            test: /\.css$/i,
    
            use: ['style-loader', 'css-loader'],
    
          },
          {

            test: /\.(png|svg|jpg|jpeg|gif)$/i,
    
            type: 'asset/resource',
    
          },

    
        ],
    
      },
}