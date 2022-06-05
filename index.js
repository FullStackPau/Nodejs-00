const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();
const routes = require("./src/api/routes");
const sequelize = require("./src/config/database");
require("./src/api/models/User");


app.use(cookieParser());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus:200
}));

app.use(express.json());

app.use("/", routes);

async function main(){
    try{
        await sequelize.sync()
        app.listen(8000, () => {
            console.log("Server encendido");
        })
    }catch(err){
        console.log("Server Error", err);
    }
}
main();