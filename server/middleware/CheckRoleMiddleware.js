const jwt = require('jsonwebtoken');

module.exports = role=>{
return (
    (req, res , next )=> {

        if (req.method === "OPTIONS") {
            return next();
        }
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                res.status(401).json({message: "User is not auth"});
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            if(decoded.role !== role  ){ // check  admin role --  has right for change
           // if(decoded.role !== role && role !== "USER" ){ // check  admin role --  has right for change
               // console.log(role !== "USER");
               // console.log(role);
              // console.log(decoded.role);
                return res.status(403).json({message:"Нет доступа!"});
            }

            // res.user = decoded;  add user data  in res.user or req.user !! for send data to controller !
            req.user = decoded;
            return next();

        } catch (e) {
            res.status(401).json({message: "User is not auth"});
            // return next(ApiError.badRequest(e.message));
        }
    }




)

}

// const ApiError = require("../error/ApiError");

// module.exports = (req, res , next )=>{
//     if( req.method === "OPTIONS"){
//         return next();
//     }
//     try {
//         const token = req.headers.authorization.split(' ')[1];
//         if(!token){
//             res.status(401).json({message:"User is not auth"});
//         }
//         const decoded = jwt.verify( token , process.env.SECRET_KEY );
//
//         // res.user = decoded;  add user data  in res.user or req.user !! for send data to controller !
//         req.user = decoded;
//         return next();
//
//     }catch (e) {
//         res.status(401).json({message:"User is not auth"});
//         // return next(ApiError.badRequest(e.message));
//     }
//
// }