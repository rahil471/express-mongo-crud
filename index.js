var express = require('express')
    , router = express.Router();
var swaggerJSDoc = require('swagger-jsdoc');
var path = require('path');

module.exports = function(options){
    var swaggerDefinition = {
        info: {
            title: 'Express Mongo CRUD',
            version: '1.0.0',
            description: '',
        },
        host: options.host,
        basePath: '/',
    };
    
    var swaggerOptions = {
        // import swaggerDefinitions
        swaggerDefinition: swaggerDefinition,
        // path to the API docs
        apis: [`${__dirname}/lib/definitions.js`, `${__dirname}/lib/routes.js`]
    };
    // initialize swagger-jsdoc
    var swaggerSpec = swaggerJSDoc(swaggerOptions);
    router.get('/apidoc', function(req, res, next){
        if(!req.query.url){
            res.redirect(`/apidoc?url=http://${options.host}/swagger.json`);
        } else {
            next();
        }
    });
    router.use('/apidoc', express.static(path.join(__dirname, '/api-doc')));
    router.get('/swagger.json', function(req, res){
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    router.use('/', require('./lib/routes'));
	return router;
}