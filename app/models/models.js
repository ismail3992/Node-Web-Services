var config = require('config');
var mysqlConfig = config.get('mysql');
var Sequelize = require('sequelize');

//Mysql models - should be moved separate files  

var sequelize = new Sequelize(mysqlConfig.database, mysqlConfig.username, mysqlConfig.password, {
    host: mysqlConfig.host,
    dialect: mysqlConfig.dialect,
    pool: {
        min: mysqlConfig.min,
        max: mysqlConfig.max,
        idle: mysqlConfig.idle
    }
});


var roles = sequelize.define('roles', {
    roles: { type: Sequelize.STRING(45) },
}, {
        underscored: true
    });

var users = sequelize.define('users', {
    name: { type: Sequelize.STRING(45) },
}, {
        underscored: true
    });

users.belongsTo(roles,{foreignKey: 'roles_fk'},{targetKey: 'id' });

module.exports.sequelize = sequelize;
module.exports.roles = roles;
module.exports.users = users;