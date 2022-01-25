const {Type} = require("../models/models");
const ApiError = require("../error/ApiError");

class TypeController{

    async  create(req , res){

        const {name} = req.body;

        const existsType = await Type.findOne({where:{name}});

        if(existsType){
            return  res.json(ApiError.badRequest('Этот тип уже существует'))
        }

        const type =  await Type.create( {name} );

        if(!type){
              return   res.json(ApiError.badRequest('Type is not created.') );
        }else{
             return res.json( type );
        }
    }

    async  getAll(req , res){

        //get all types from db
        const types = await  Type.findAll();

        if(!types){
            const  err = ApiError.badRequest("Types are not found.");
            return res.status(err.status).json( err  );
            // return new Error(ApiError.badRequest("Types are not found."));
        }else{
            return res.json( types );
        }
    }



}
module.exports = new TypeController();