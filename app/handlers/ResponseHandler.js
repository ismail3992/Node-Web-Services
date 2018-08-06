var util = require('util');

var RESTErrorMessages = require('./../constants/RESTErrorMessages');

function ResponseHandler() {

}

function ResponseBody() {
    this.status = "failure";
    this.origin = "";
    this.executionTime = "";
    this.uid = "";
    this.sessionid = "";
    this.count = null;
    this.error = null;
}

ResponseHandler.handleSuccess = function (res, data) {
    var response = new ResponseBody();
    response.status = "success";
    response.result = data;
    if (util.isArray(data)) {
        response.count = data.length;
    }
    else {
        //Data must be an object, Hence setting count as 1
        response.count = 1;
    }
    res.status(200).send(response);
}

ResponseHandler.handleConflictResourceWithMsg = function (res, msg) {
    var response = new ResponseBody();
    response.status = "error";
    response.message = msg   
    res.status(409).send(response); 
}

ResponseHandler.handleBadRequestQueryParam = function (res) {
    var response = new ResponseBody();
    response.status = "failure";
    response.message = RESTErrorMessages.MissingRequiredQueryParam;
    res.status(400).send(response);
}

ResponseHandler.handleBadRequestBody = function (res) {
    var response = new ResponseBody();
    response.message = RESTErrorMessages.MissingRequiredBody;
    res.status(400).send(response);
}

ResponseHandler.handleBadRequestBodyWithErrors = function (res, error) {    
    var response = new ResponseBody();
    response.message = RESTErrorMessages.MissingRequiredBody;
    response.error = error;
    res.status(400).send(response);
}

ResponseHandler.handleResourceNotFound = function (res) {
    var response = new ResponseBody();
    response.message = RESTErrorMessages.ResourceNotFound;
    res.status(404).send(response);
}

ResponseHandler.handleServerError = function (res) {
    var response = new ResponseBody();
    response.message = RESTErrorMessages.InternalError;
    res.status(500).send(response);
}

ResponseHandler.handleUnAuthorized = function (res) {
    var response = new ResponseBody();
    response.message = RESTErrorMessages.Unauthorized;
    res.status(401).send(response);
}

module.exports = ResponseHandler;