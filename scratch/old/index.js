'use strict';
var 
	open   = require('open'),
	config = require('./config'),
	routes = require('./src/routes');

var server;

function serverMain()
{
	var address = '%p://%h:%p/'
		.replace('%p','http')
		.replace('%h', 'localhost')//server.address().address)
		.replace('%p', server.address().port);

	console.log('Punchr listening on %a'.replace('%a',address));
	open(address);///, serverOff);
}

function serverOff()
{
	console.log('Punchr stopped.');
	process.exit();
}

server = routes.listen(3000, serverMain);



