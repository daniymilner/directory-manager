var mongoose = require('mongoose'), connection,
	config = require('../modules/config').get('env').db;

mongoose.connect('mongodb://' + config.host + '/' + config.database);
mongoose.set('debug', config.debug || false);

connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function callback(){
	console.log('DB connected');
});

require('../models');