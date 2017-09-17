'use strict';
/*
sets up the express app.  I plan to use compages for this-- eventually this is going away
*/
let app = require('express')();

app.set('view engine', 'pug');

if (true)
	app.use(require('morgan')('dev'));

app.listen(3000);

let router = require('express').Router();

router.get('/', (req, res) =>
{
	res.send('init test');
});

let server = require('http').Server(app);

server.on('error', console.error);

server.on('listening', function on_listening () 
{
	let addr = server.address();
	debug('ready');
});

app.use(router);