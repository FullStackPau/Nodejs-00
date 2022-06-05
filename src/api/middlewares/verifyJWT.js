const jwt = require("jsonwebtoken");


const verifyToken = (req,res,next) => {
    const token = req.cookies.token;
    if(!token) return res.json({auth:false,message:"Acceso No Autorizado"})
    try{
        const verify = jwt.verify(token, "pruebatecnica");
        req.user = verify;
        next();
    }catch(err){
        res.json({auth:false, message:"Token No válido"});
    }
}

module.exports = verifyToken;