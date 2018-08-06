var express = require('express');
var router = express.Router();

var UserService = require('./../services/UserService');
var userService = new UserService();
var ResponseHandler = require('./../handlers/ResponseHandler');



router.get('/',function(req, res, next) {
    userService.getUsers(function (user, err) {
        if (err) {
          console.error(err);
          ResponseHandler.handleServerError(res);
        }
        else {
          ResponseHandler.handleSuccess(res, user);
        }
      });
});









module.exports = router;