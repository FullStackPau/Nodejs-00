
const User = require("../models/User");
const Amigos = require("../models/ListaAmigos");


exports.register = async (user) => {
    const {nombre, apellido, password, telefono, email, fecha} = user;
    return await User.create({
        nombre,
        apellido,
        telefono,
        password,
        email,
        fecha_de_nacimiento:fecha
    })
    .then(user => {
        return {success:true, error:false, message:"User Registered", user:{
            id:user.id,
            email:user.email,
            nombre: user.nombre
        }}
    })
    .catch(err => {
        return err;
    })
    
}

exports.login = async (user) => {
    const {email, password} = user;
    const login = await User.findOne({where:{email}})
    .then((response) => {
        if(response == null){
            return {error: true, message: "Email o Contraseña Erronea"}
        }
        if(response.validatePassword(password, response.password)){
            return {login:true, user: {
                id:response.id,
                email:response.email,
                nombre:response.nombre
            }}
        }
        return {login:false, message:"Password is not correct"}
    })
    .catch(err => {
        return err;
    
    })
    return login;

}
exports.getUser = async (user) => {
    return await User.findOne({where:{email:user.email}})
    .then(response => {
        return {error:false,email:response.email,nombre: response.nombre,apellido: response.apellido,telefono:response.telefono,fecha:response.fecha_de_nacimiento,saldo:response.saldo}
    })
    .catch(err => {
        return {error:true, message:err}
    })
}

exports.getAllUser = async () => {
    return await User.findAll({
        attributes: { exclude: ["password"]}
    })
    .then(res => {
        return {error:false, data:res}
    })
    .catch(err => {
        return {error:true, message:"Error Getting Users"}
    })
}
exports.getAllFriends = async (iduser) => {
    return await Amigos.findAll({
        where:{id_user:iduser}
    })
    .then(res => res)
    .catch(err => ({error:true,message:"Error Getting Friends"}))
}
exports.newFriend = async (idfriend,iduser, name_friend) => {
    const friend = await Amigos.create({
        id_friend:idfriend,
        id_user:iduser,
        name_friend
    })
    .then(res => {
        return res;
    })
    .catch(err => {
        return {error:true, message:"Error in create new Friend"}
    })
    if(!friend.error){
        return await Amigos.findAll({
            where:{id_user:iduser}
        });
    }
    return {error:true, message:"Error in create new Friend"}
}
exports.deleteFriend = async (id_friend,id_user) => {
    const deleted =  await Amigos.destroy({
        where:{id_friend:id_friend, id_user}
    })
    .then(res => ({error:false}))
    .catch(err => ({error:true}))
    if(!deleted.error){
        return await Amigos.findAll({
            where:{id_user}
        });
    }
    return {error:true}
}