import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: 'dist',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.css']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            }, {
                test: /\.css$/,
                loader: 'style!css?modules'
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin()]
};
