let express = require("express"),
	bodyParser = require('body-parser'),
	logger = require('morgan'),
	modules = require('./modules'),
	env = modules.config.get('env'),
	app = express();

app.set('modules', modules);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));
require('./settings/db');

app.use('/api', require('./routes'));

app.listen(env.port, () => {
	console.log('Start listen on port ' + env.port);
});