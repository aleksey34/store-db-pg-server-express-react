const Router = require('express');

const deviceRouter = require("./deviceRouters");
const brandRouter = require("./brandRouters");
const typeRouter = require("./typeRouters");
const userRouter = require("./userRouters");
// const deviceRouter = require("./deviceRouters");

const router = new Router();

router.use("/user" , userRouter);
router.use("/type" , typeRouter);
router.use("/brand" , brandRouter);
router.use("/device" , deviceRouter);


module.exports = router;