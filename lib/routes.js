var express = require('express')
    , router = express.Router();
var utils = require('./utils');
var messages = require('./messages');
var CRUD = require('./crud');


/**
 * @swagger
 * /#model#/schema:
 *      get:
 *          tags:
 *              - tagreplace
 *          description: Get mongoose schema object for #model#.
 *          produces:
 *              - application/json
 *          responses:
 *              200:
 *                  description: Success
 *                  properties:
 *                      responseCode:
 *                          type: number
 *                      responseMessage:
 *                          type: string
 *                      schema:
 *                          type: object
 *                          description: mongoose schema object
 *              default:
 *                  description: Error responses
 *                  schema:
 *                      $ref: "#/definitions/DefaultErrorResponse"
 * 
 */
router.get('/:model/schema', function (req, res) {
    let crud = new CRUD(req.params.model);
    crud.getSchema((err, resp)=>{
        if (err) {
            return utils.handleErrResp(req, res, err);
        }
        return res.json({
            responseCode: messages.defaultSuccessObject.responseCode,
            responseMessage: messages.defaultSuccessObject.responseMessage,
            schema: resp
        });
    });
});

/**
 * @swagger
 * /#model#/list:
 *      post:
 *          tags:
 *              - tagreplace
 *          description: Get documents
 *          produces:
 *              - application/json
 *          parameters:
 *              -   name: body
 *                  in: body
 *                  schema:
 *                      $ref: "#/definitions/listBody"
 *          responses:
 *              200:
 *                  description: Success
 *                  properties:
 *                      responseCode:
 *                          type: number
 *                      responseMessage:
 *                          type: string
 *                      docs:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                  createdAt:
 *                                      type: string
 *                                  updatedAt:
 *                                      type: string
 *              default:
 *                  description: Error responses
 *                  schema:
 *                      $ref: "#/definitions/DefaultErrorResponse"
 */
router.post('/:model/list', function (req, res) {
    let crud = new CRUD(req.params.model);
    crud.list(req.body.params, (err, docs)=>{
        if (err) {
            return utils.handleErrResp(req, res, err);
        }
        return res.json({
            responseCode: messages.defaultSuccessObject.responseCode,
            responseMessage: messages.defaultSuccessObject.responseMessage,
            docs: docs,
            params: req.body.params
        });
    });
});

/**
 * @swagger
 * /#model#/{_id}:
 *      get:
 *          tags:
 *              - tagreplace
 *          description: Get {_id} from #model#.
 *          produces:
 *              - application/json
 *          parameters:
 *              -   name: _id
 *                  in: path
 *                  description: Mongo Document id
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
 *                  properties:
 *                      responseCode:
 *                          type: number
 *                      responseMessage:
 *                          type: string
 *                      doc:
 *                          type: object
 *                          description: mongoose document
 *              default:
 *                  description: Error responses
 *                  schema:
 *                      $ref: "#/definitions/DefaultErrorResponse"
 * 
 */
router.get('/:model/:_id', function (req, res) {
    let crud = new CRUD(req.params.model);
    crud.findOne(req.params._id, (err, resp)=>{
        if (err) {
            return utils.handleErrResp(req, res, err);
        }
        return res.json({
            responseCode: messages.defaultSuccessObject.responseCode,
            responseMessage: messages.defaultSuccessObject.responseMessage,
            doc: resp
        });
    });
});

/**
 * @swagger
 * /#model#:
 *      post:
 *          tags:
 *              - tagreplace
 *          description: Get documents
 *          produces:
 *              - application/json
 *          parameters:
 *              -   name: body
 *                  in: body
 *                  required: true
 *                  schema:
 *                      properties:
 *                          data:
 *                              type: object
 *                              required: true
 *          responses:
 *              200:
 *                  description: Success
 *                  properties:
 *                      responseCode:
 *                          type: number
 *                      responseMessage:
 *                          type: string
 *                      docs:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                  createdAt:
 *                                      type: string
 *                                  updatedAt:
 *                                      type: string
 *              default:
 *                  description: Error responses
 *                  schema:
 *                      $ref: "#/definitions/DefaultErrorResponse"
 */
router.post('/:model', function (req, res) {
    let crud = new CRUD(req.params.model);
    crud.create(req.body.data, (err, resp)=>{
        if (err) {
            return utils.handleErrResp(req, res, err);
        }
        return res.json({
            responseCode: messages.defaultSuccessObject.responseCode,
            responseMessage: messages.defaultSuccessObject.responseMessage,
            doc: resp
        });
    });
});

/**
 * @swagger
 * /#model#/{_id}:
 *      put:
 *          tags:
 *              - tagreplace
 *          description: Get documents
 *          produces:
 *              - application/json
 *          parameters:
 *              -   name: _id
 *                  in: path
 *                  description: Mongo Document id
 *                  required: true
 *              -   name: body
 *                  in: body   
 *                  description: request body
 *                  required: true
 *                  schema:
 *                      $ref: "#/definitions/updateBody"
 *          responses:
 *              200:
 *                  description: Success
 *                  properties:
 *                      responseCode:
 *                          type: number
 *                      responseMessage:
 *                          type: string
 *                      docs:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                  createdAt:
 *                                      type: string
 *                                  updatedAt:
 *                                      type: string
 *              default:
 *                  description: Error responses
 *                  schema:
 *                      $ref: "#/definitions/DefaultErrorResponse"
 */
router.put('/:model/:_id', function (req, res) {
    let crud = new CRUD(req.params.model);
    crud.update(req.params._id, req.body, (err, resp)=>{
        if (err) {
            return utils.handleErrResp(req, res, err);
        }
        return res.json({
            responseCode: messages.defaultSuccessObject.responseCode,
            responseMessage: messages.defaultSuccessObject.responseMessage,
            doc: resp
        });
    });
});

/**
 * @swagger
 * /#model#/{_id}:
 *      delete:
 *          tags:
 *              - tagreplace
 *          description: Delete {_id} from #model#.
 *          produces:
 *              - application/json
 *          parameters:
 *              -   name: _id
 *                  in: path
 *                  description: Mongo Document id
 *                  required: true
 *              -   name: body
 *                  in: body   
 *                  description: request body
 *                  required: true
 *                  schema:
 *                      properties:
 *                          hardDelete:
 *                              description: Flag to remove object from the db
 *                              type: boolean
 *                              default: false
 *          responses:
 *              200:
 *                  description: Success
 *                  properties:
 *                      responseCode:
 *                          type: number
 *                      responseMessage:
 *                          type: string
 *                      doc:
 *                          type: object
 *                          description: mongoose document
 *              default:
 *                  description: Error responses
 *                  schema:
 *                      $ref: "#/definitions/DefaultErrorResponse"
 * 
 */ 
router.delete('/:model/:_id', function (req, res) {
    let crud = new CRUD(req.params.model);
    let params = req.body.params;
    crud.delete(req.params._id, params, (err, resp)=>{
        if (err) {
            return utils.handleErrResp(req, res, err);
        }
        return res.json({
            responseCode: messages.defaultSuccessObject.responseCode,
            responseMessage: messages.defaultSuccessObject.responseMessage,
            doc: resp
        });
    });
});

/** Delete many */
router.post('/:model/deletemany', function (req, res) {
    let crud = new CRUD(req.params.model);
    crud.update(req.params._id, req.body.data, req.body.options, (err, resp)=>{
        if (err) {
            return utils.handleErrResp(req, res, err);
        }
        return res.json({
            responseCode: messages.defaultSuccessObject.responseCode,
            responseMessage: messages.defaultSuccessObject.responseMessage,
            doc: resp
        });
    });
});


module.exports = router;
