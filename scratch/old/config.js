'use strict';
module.exports = 
{
	listen_port: 16261,	
	db         : 
	{
		dbname  : 'punchr',
		user    : null,
		password: null,
		params  :
		{
			dialect : 'sqlite',
			storage : 'res/punchr.db',
		},
	}
}