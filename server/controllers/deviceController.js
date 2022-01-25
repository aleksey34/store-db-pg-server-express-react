const ApiError = require("../error/ApiError");
const { Device , DeviceInfo } = require("../models/models");
const uuid = require('uuid');
const path = require("path");


class DeviceController{

    async  create(req , res , next){
        try{

            let {name , price , brandId , typeId , info} = req.body;


            const existsDevice = await Device.findOne({where:{name}});

            if(existsDevice){
                return  res.json(ApiError.badRequest('Этот девайс уже существует'))
            }


            const { img } = req.files;
            const fileName = `${uuid.v4()}.jpg`;
            await img.mv(path.resolve(__dirname , '..' , 'static' , fileName));


            const device =  await Device.create( {name, price , brandId , typeId , img: fileName} );

            if(info){
                info = JSON.parse(info);
                info.forEach( el => {
                    DeviceInfo.create({
                        title: el.title ,
                        description: el.description ,
                        deviceId: device.id,
                    });
                })
            }

            return res.json( device );
        }catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async  getAll(req , res){

        let {brandId , typeId , limit , page } = req.query;

        limit = Number( limit )  || 9;

        page = Number( page ) || 1;
        const offset = page * limit - limit;

        let where = {};
        if(brandId){
            where = { brandId };
        }
        if(typeId){
            where = { ...where , typeId };
        }
       const options = {where , limit , offset};
       const devices =  await  Device.findAndCountAll( options );


        if(!devices){
            ApiError.badRequest("Types are not found.")
        }else{
            return res.json( devices );
        }
    }

    async getOne(req , res){
        const { id } = req.params;

        const device = await  Device.findOne( {
            where:{id} ,
            include: [{model: DeviceInfo , as: 'info'}]
        } );

        return res.json(device);

    }

}
module.exports = new DeviceController();