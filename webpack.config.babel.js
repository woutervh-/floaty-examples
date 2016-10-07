import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    devtool: 'eval-source-map',
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
                include: /src/,
                loader: 'babel'
            }, {
                test: /\.css$/,
                loader: 'style!css?modules'
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin()]
};
