// Require DB  conncetion model 
const db = require('../models/models')


function UserDAO() {
}

UserDAO.prototype.getUsers = function (callback) {
    db.users.findAll({
        include :{model:db.roles}
    }).then(callback)
}

module.exports = UserDAO;