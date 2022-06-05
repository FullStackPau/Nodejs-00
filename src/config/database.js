const Sequelize = require("sequelize");
const config = require("./config");
const sequelize = new Sequelize(config.database,config.username,config.password,{
    host: config.host,
    dialect: 'mysql'
  });
/*
const sequelize = new Sequelize(config.database,config.username,config.password,{
    host: config.host,
    dialect: 'mariadb'
  });
*/
module.exports = sequelize;