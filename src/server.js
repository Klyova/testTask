import express from 'express';
import config from './config/web-server.js';
import routes from './routes/routes.js';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();

server.set('view engine', 'pug');
server.set('views', './src/core');

const compiler = webpack(webpackConfig);

// Webpack Dev
server.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath, // Синхронізовано з Webpack
}));

// Підключення статичних файлів
server.use('/dist', express.static(path.join(__dirname, 'dist')));
server.use('/img', express.static(path.join(__dirname, 'src/img')));

server.use(express.static(path.join(__dirname, 'public')));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Налаштування маршрутів
server.use('/', routes);
server.use('/user', routes);
server.use('/form', routes);
server.use('/contact', routes);
server.use('/check-email', routes);


// Функція для запуску сервера
function start() {
    server.listen(config.port, () => {
        console.log(`Server is running at http://localhost:${config.port}`);
    });
    return server;
}

export default { server, start };
