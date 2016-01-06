let express = require('express'),
	router = express.Router(),
	controllers = require('../controllers');

router
	.post('/list', controllers.list);

module.exports = router;
