const {DataTypes} = require("sequelize");
const sequelize = require("../../config/database");
const {User} = require("./User");

const Amigos = sequelize.define("amigos", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    id_friend: {
        type: DataTypes.INTEGER

    },
    id_user: {
        type: DataTypes.INTEGER
    },
    name_friend: {
        type: DataTypes.STRING
    }
});

module.exports = Amigos;