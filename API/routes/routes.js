var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
var AdminAuth = require("../middleware/AdminAuth");
const User = require("../models/User");


router.get('/', HomeController.index);
router.get('/user', AdminAuth, UserController.index);
router.get('/user/:id', UserController.findUser);
router.post('/user', UserController.create);
router.put("/user", AdminAuth, UserController.edit);
router.delete('/user/:id', AdminAuth, UserController.remove);
router.post('/recoverpassword', UserController.recoverPassword);
router.post('/changepassword', UserController.changePassword);
router.post('/login', UserController.login);
router.post('/validate', AdminAuth, HomeController.validate)


module.exports = router;