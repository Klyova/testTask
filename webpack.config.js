// webpack.config.js

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import CopyWebpackPlugin from 'copy-webpack-plugin';


export default {
    mode: 'development',
    entry: './src/core/index.js', // Оновлено на правильний шлях
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '',
    },
    module: {
        rules: [
            {
                test: /\.css$/, // Обробка CSS файлів
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                include: path.resolve(__dirname, 'src/core'),
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name][ext]',  // Зберігає оригінальну назву файлу
                },
            },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/img', to: 'img' },  // Копіює зображення з src/img в img
            ],
        })
    ],
    resolve: {
        fullySpecified: false,
        extensions: ['.js', '.json', '.css', '.scss'],
    },
    devtool: 'source-map',
};
