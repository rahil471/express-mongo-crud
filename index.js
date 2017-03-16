var express = require('express')
    , router = express.Router();

router.use('/', require('./lib/routes'));

module.exports = function(options){
    console.log('bla');
	return router;
}