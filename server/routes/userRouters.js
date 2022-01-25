const Router = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require("../middleware/AuthMiddleware");


const router = new Router();

router.get('/auth' , authMiddleware , userController.check );
router.post('/login' , userController.login );
router.post('/registration' , userController.registration );


module.exports = router;