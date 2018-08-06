//Error Codes and Messages inspired from https://msdn.microsoft.com/en-us/library/azure/dd179357.aspx
var RESTErrorMessages = {
    "ResourceNotFound": "The specified resource does not exist.",
    "MissingRequiredQueryParam": "A required Query Parameter was not specified.",
    "MissingRequiredBody": "A required HTTP Body was not specified.",
    "InternalError": "The server encountered an internal error. Please retry the request.",
    "Unauthorized": "Unauthorized Request. Please retry this request using access token",
    "UserAlreadyExists": "User Already Exists"    
};

module.exports = RESTErrorMessages;