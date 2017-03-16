var fs = require('fs');
var mongoose = require('mongoose');
/** Class to dynamically create mongoose schemas/models from config */
class ModelBuilder {
	/**
     * Build Models
     */
    constructor() {
		var path = "/../models/";
        var files = fs.readdirSync(`${__dirname}${path}`);
        for(let i=0; i<files.length; i++){
            var modelname = files[i].split('.')[0];
            var schema = require(`${__dirname}${path}${files[i]}`)(mongoose);
            if(schema[1].createdby){
                schema[0].createdBy = {type: String}
            }
            if(schema[1].updatedby){
                schema[0].updatedBy = {type: String}
            }
            this[modelname] = mongoose.model(modelname, mongoose.Schema(schema[0], schema[1]));
        }
    }
}

module.exports = ModelBuilder;