var UserDAO = require('./../dao/UserDAO');
var userDAO = new UserDAO();

function UserService() {

}

UserService.prototype.getUsers = function (callback) {
    userDAO.getUsers(callback);
}




module.exports = UserService;