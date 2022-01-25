const ApiError = require("../error/ApiError");
const {Brand} = require("../models/models");


class BrandController{

    async  create(req , res){
        // for req - need header  Content-Type: application/json;
        const {name} = req.body;

        const existsBrand = await Brand.findOne({where:{name}});

        if(existsBrand){
            return  res.json(ApiError.badRequest('Этот бренд уже существует'))
        }

        // create data in db  -- Type
        const brand =   await Brand.create( {name} );
// return res.json(name);
        if(!brand){
            return   res.json(ApiError.badRequest('Type is not created.') );
        }else{
            return res.json( brand );
        }
    }

    async getAll(req , res){

        const brands = await  Brand.findAll();

        if(!brands){
            return req.json(   ApiError.badRequest("Types are not found.")  );
        }else{
            return res.json( brands );
        }

    }



}
module.exports = new BrandController();