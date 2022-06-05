const {DataTypes} = require("sequelize");
const sequelize = require("../../config/database");
const bcrypt = require("bcrypt");

const User = sequelize.define("users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false  
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.INTEGER,
        unique:true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique:true,
        allowNull: false
    },
    fecha_de_nacimiento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    saldo: {
        type: DataTypes.INTEGER,
        defaultValue: 100,
        allowNull: false
    }
},{
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSaltSync(10);
                user.password = bcrypt.hashSync(user.password, salt);
            }
        }
    }
});
User.prototype.validatePassword = async function (password){
    return await bcrypt.compareSync(password,this.password);
}
module.exports = User;