"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("../controllers/userControllers");
const router = express_1.default.Router();
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
// user sign up
router.post('/usersignup', (req, res) => {
    (0, userControllers_1.userSignUp)(req, res);
});
// user login
router.post('/userlogin', (req, res) => {
    (0, userControllers_1.userLogin)(req, res);
});
module.exports = router;
