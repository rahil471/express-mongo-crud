var fs = require('fs');
var mongoose = require('mongoose');
var logger = require('./logger');
/** Class to dynamically create mongoose schemas/models from config */
class ModelBuilder {
	/**
     * Build Models
     */
    constructor() {
        this.models = [];
		var path = `/../../../models/`;
        if(!fs.existsSync(`${__dirname}${path}`)){
            logger('warn', `${__dirname}${path} does not exists!`)
            return;
        }
        var files = fs.readdirSync(`${__dirname}${path}`);
        for(let i=0; i<files.length; i++){
            let split = files[i].split('.');
            if(split[2] !== 'js') continue;
            var modelname = split[0];
            this.models.push(modelname);
            var schema = require(`${__dirname}${path}${files[i]}`)(mongoose);
            if(schema[1].createdby){
                schema[0].createdBy = {type: String}
            }
            if(schema[1].updatedby){
                schema[0].updatedBy = {type: String}
            }
            this[modelname] = mongoose.model(modelname, mongoose.Schema(schema[0], schema[1]));
            logger('info', `MODEL | {${modelname}} initialized!`);
            logger('info', `API | GET | /${modelname}/schema`);
            logger('info', `API | POST | /${modelname}/list`);
            logger('info', `API | DELETE | /${modelname}/{_id}`);
            logger('info', `API | GET | /${modelname}/{_id}`);
            logger('info', `API | PUT | /${modelname}/{_id}`);
            logger('info', `API | POST | /${modelname}`);
            logger('default', `\n`);
        }
    }

    getModels() {
        return this.models;
    }
}

module.exports = new ModelBuilder();