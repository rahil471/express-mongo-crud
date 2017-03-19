var express = require('express')
    , router = express.Router();
var swaggerJSDoc = require('swagger-jsdoc');
var path = require('path');
var ModelBuilder = require('./lib/ModelBuilder');
var logger = require('./lib/logger');
//var loadmodels = new ModelBuilder();

module.exports = function(options){
    var swaggerDefinition = {
        info: {
            title: 'Express Mongo CRUD',
            version: '1.0.0',
            description: '',
        },
        host: options.host,
        basePath: options.prefixPath || '/',
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
    logger('info', `Swagger UI availaible at ${options.host}/apidoc \n`);
    router.get('/swagger.json', function(req, res){
        res.setHeader('Content-Type', 'application/json');
        let models = ModelBuilder.getModels();
        let dynamicSwaggerSpec = JSON.parse(JSON.stringify(swaggerSpec));
        let paths = JSON.stringify(dynamicSwaggerSpec.paths);
        dynamicSwaggerSpec.paths = {};
        for(let i=0; i<models.length; i++){
            let temp = paths.replace(/#model#/g, models[i]).replace(/tagreplace/g, models[i]);
            temp = JSON.parse(temp);
            for(let key in temp){
                dynamicSwaggerSpec.paths[key] = temp[key];
            }
        }
        res.send(dynamicSwaggerSpec);
    });

    router.use('/', require('./lib/routes'));
	return router;
}