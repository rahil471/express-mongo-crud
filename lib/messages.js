module.exports = {
    "mongoErrCodes": {
        "11000": "Opps! the given info already exists"
    },
    "defaultSuccessObject": {
        "responseCode": 0,
        "responseMessage": "Successfully processed the request"
    },
    "defaultErrorObject": {
        "responseCode": 1,
        "responseMessage": "Some error occured, try again after sometime"
    },
    "invalidValueObject": {
        "responseCode": 1,
        "responseMessage": "Should be a valid %key%"
    },
    "invalidLogin": {
        "statusCode": 404,
        "message": "Invalid login credentials"
    },
    "unauthorized": {
        "statusCode": 401,
        "responseCode": 7,
        "message": "Please login to continue"
    },
    "forbidden": {
        "statusCode": 403,
        "responseCode": 1,
        "message": "You are not-allowed access here"
    },
    "systemError": {
        "statusCode": 500,
        "responseCode": 100,
        "message": "System Error, please try again later"
    },
    "docNotFound": {
        "statusCode": 404,
        "responseCode": 1,
        "message": "Document does not exist"
    },
    "noAuthority": {
        "statusCode": 400,
        "message": "Not authorized to peroform this operation"
    },
    "successNoContentAvailable": {
        "statusCode": 204,
        "message": "Content Not Available!"
    },
    "successButFileIsLocked": {
        "statusCode": 204,
        "message": "File Is Lock By #user#!",
        "name": ""
    }

}