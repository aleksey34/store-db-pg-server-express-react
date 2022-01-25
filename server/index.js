require('dotenv').config();

const express = require('express');
const sequelize = require('./db');
const models = require("./models/models");
const cors = require("cors");
const router = require('./routes');
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const fileUpload = require('express-fileupload');
const path =require('path');

const PORT =  process.env.PORT || 5000 ;

const app = express();

// middleware
app.use(cors());

// need order!!
app.use(fileUpload({}));

app.use(express.json());

//set static dir  ( path.resoleve or path.join fun need)
app.use(express.static(path.join( __dirname ,  'static')));

app.use('/api' , router);

// change order!!
// app.use(fileUpload({}));

// should be in end of middleware --last !!  because it is for ERROR!!
app.use(errorHandler);
// end middleware



const start = async ()=>{
    try{
        await  sequelize.authenticate();
        await  sequelize.sync();
        app.listen(PORT , ()=>{
            console.log(`The server is listening.The server started on port: ${PORT}`);
        })
    }catch (e) {
        console.log(e);
    }
}




start().catch( error=>console.log(error));
