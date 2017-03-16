var messages = require('./messages');
var mongoose = require('mongoose');
var ModelBuilder = require('./ModelBuilder');
var loadmodels = new ModelBuilder();

/**
 * Encapsulates CRUD Operations and workflow for mdContent.
 * @class
 */
class CRUD {
	
	/** Set mongoose model in use*/
    constructor(model) {
        this.modelName = model;
        this.Model = mongoose.model(model);
    }
	
	
	/**
	 * Send a request.
	 * @param {CRUD~requestCallback} callback - The callback that handles the response.
	 */
    getSchema(callback){
        callback(null, this.Model.schema);
    }
	/**
	 * This callback is displayed as part of the CRUD class.
	 * @callback CRUD~requestCallback
	 * @param {*} error
	 * @param {object} Mongoose schema
	 */


/**
 * Inserts new mongo document
 * @param {object} params - data oject to be inserted  
 */
    create(params, callback){
        let model = new this.Model(params);
        model.save((err, doc)=>{
            if (err) {
                return callback(err);
            }
            callback(null, doc);
        });
    }

/**
 * Get document by _id
 * @param {string} _id - MongoID of the document to be fetched
*/
    findOne(_id, callback){
        this.Model.findOne({_id:_id}, function(err, doc){
            if (err) {
                return callback(err);
            }
            callback(null, doc);
        });
    }

/**
 * Update a document by _id
 * @param {string} _id - Mongo ID of the docuemnt to be updated
 * @param {object} params - Parameters
 * @param {object} params.data - Fileds to be updated
 * @param {*} callback - callback function
 */
    update(_id, params, callback){
        this.Model.update({_id:_id}, params.data, (err, resp)=>{
            if (err) {
                return callback(err);
            }
            callback(null, resp)
        });
    }

/**
 * 
 * @param {string} _id - Mongo ID of the docuemnt to be updated
 * @param {object} params - Parameters
 * @param {boolean} params.hardDelete - Enable permenant delete
 * @param {*} callback -callback function
 */
    delete(_id, params, callback){
        if(params.hardDelete === true){
            this.Model.remove({_id: _id}, (err, doc)=>{
                if (err) {
                    return callback(err);
                }
                callback(null, doc);
            });
        } else {
            let data = {
                status: "deleted"
            }
            this.Model.update({_id:_id}, {status: "deleted"}, (err, doc)=>{
                if(err){
                    return callback(err);
                }
                callback(null, doc);
            });
        }
    }

/**
 * 
 * @param {object} params - Parameters 
 * @param {number} params.$skip - The number of records to skip in the database. This is typically used in pagination.
 * @param {number} params.$limit - The maximum number of records to return.
 * @param {Array.string} params.$sort - String of fields to be sorted by, priority based on index, -field to sort in reverse. 
 * @param {Object} params.$in - Filter docs on values for given fields
 * @param {Array} params.$in.field - Fields can be any property in model. 
 * @param {Object} params.$eq - Match values for given fields
 * @param {*} params.$eq.field - Fields can be any property in model. 
 * @param {Array.string} params.$select - List of fields to be included in the results. 
 * @param {boolean} params.$count - If true return only count. 
 * @param {Object} params.$gt - List of fields with value to be compared
 * @param {Object} params.$gte - List of fields with value to be compared
 * @param {Object} params.$lt - List of fields with value to be compared
 * @param {Object} params.$lte - List of fields with value to be compared
 * @param {*} callback 
 */
    list(params, callback){
        let query = this.Model.find();
        if(params){
            if(params.$skip) {
                query.skip(params.$skip);
            }
            if(params.$limit){
                query.limit(params.$limit);
            }
            if(params.$sort){
                query.sort(params.$sort.join(','));
            }
            if(params.$in){
                for(let key in params.$in){
                    query.where(key).in(params.$in[key]);
                }
            }
            if(params.$eq){
                for(let key in params.$eq){
                    query.where(key).equals(params.$eq[key]);
                }
            }
            if(params.$select){
                query.select(params.$select.join(','));
            }
            if(params.$count === true){
                query.count();
            }
            if(params.$within){
                for(let key in params.$within){
                    query.where(key).equals(params.$within[key]);
                }
            }
            if(params.$gt){
                for(var key in params.$gt){
                    query.gt(key, params.$gt[key])
                }
            }
            if(params.$gte){
                for(var key in params.$gte){
                    query.gte(key, params.$gte[key])
                }
            }
            if(params.$lt){
                for(var key in params.$lt){
                    query.lt(key, params.$lt[key])
                }
            }
            if(params.$lte){
                for(var key in params.$lte){
                    query.lte(key, params.$lte[key])
                }
            }
        }
        query.lean().exec((err, docs)=>{
            if(err){
                return callback(err);
            }
            callback(null, docs);
        });
    }
}
module.exports = CRUD;
