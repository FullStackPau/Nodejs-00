const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');


const user = express.Router();
const {register, login, getUser, getAllUser, getAllFriends, newFriend, deleteFriend} = require("../controllers/UserController");
const verifyToken = require("../middlewares/verifyJWT");


user.get("/", (req, res, next) => {
    res.json("Funciona");
});
user.post("/register", async (req,res,next) => {
    await register(req.body)
    .then(resp => {
        const token = jwt.sign({auth:true,user:resp.user},"pruebatecnica",{expiresIn:"2h"});
        res.cookie('token',token, {httpOnly:true});
        res.json({login:true});
    })
    .catch(err => {
        res.json({
            login:false,
            message:"Error in Register"
        })
    })

});

user.post("/login", async (req, res, next) => {
    await login(req.body)
    .then(resp => {
        const token = jwt.sign({auth:true,user:resp.user},"pruebatecnica",{expiresIn:"2h"});
        res.cookie('token',token, {httpOnly:true});
        res.json(resp);
    })
    .catch(err => {
        res.json({
            login:false,
            message:"Error in Login"
        })
    })
});
user.get("/getUser", verifyToken, async (req, res, next) => {
    const response = await getUser(req.user.user);
    res.json(response);
});
user.get("/getAllUsers", verifyToken, async (req, res, next) => {
    const response = await getAllUser();
    const response2 = await getAllFriends(req.user.user.id);
    res.json({
        id_user:req.user.user.id,
        users:response,
        friends:response2
    });
});
user.get("/protected", verifyToken,(req,res,next) => {
    res.json({
        auth:true
    });
});
user.post("/newfriend", verifyToken, async (req, res, next) => {
    const response = await newFriend(Number(req.body.user.id), req.user.user.id, req.body.user.nombre);
    const response2 = await getAllUser();
    res.json({
        id_user:req.user.user.id,
        friends:response,
        users:response2
    });
});
//Deberia utilizar el método delete, pero el middleware verifyJWT no le pasa el token bien
user.post("/deletefriend", verifyToken, async (req, res, next) => {
    const response = await deleteFriend(req.body.idfriend, req.user.user.id);
    const response2 = await getAllUser();
    const response3 = await getAllFriends(req.user.user.id);
    res.json({
        id_user:req.user.user.id,
        friends:response3,
        users:response2
    });
});

module.exports = user;