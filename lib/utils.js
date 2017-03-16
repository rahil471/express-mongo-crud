var messages = require('./messages');

module.exports.handleErrResp = function (req, res, err) {

    if (err.statusCode) {
        return res.status(err.statusCode).json({
            responseCode: messages.defaultErrorObject.responseCode,
            responseMessage: err.message,
        });
    }
    return res.status(400).json({
        responseCode: messages.defaultErrorObject.responseCode,
        responseMessage: err,
    });
}