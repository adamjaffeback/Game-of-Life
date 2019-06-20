/* eslint-disable no-console */

import http from 'http';
import express from 'express';
import webpack from 'webpack';
import ShareDb from 'sharedb';
import WebSocket from 'ws';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebSocketJSONStream from '@teamwork/websocket-json-stream';

import webpack_config from '../webpack.config';

// set up the express server
const app = express();
app.use(express.static('static'));

// wire up webpack hot module replacement
const compiler = webpack(webpack_config);
app.use(
	WebpackDevMiddleware(compiler, {
		noInfo: true,
		publicPath: webpack_config.output.publicPath,
	})
);

// create the server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// set up the sharedb backend
const backend = new ShareDb();
wss.on('connection', ws => {
	backend.listen(new WebSocketJSONStream(ws));
});

// listen to incoming requests
server.listen(8080, () => {
	console.log('listening on http://localhost:8080/');
});
