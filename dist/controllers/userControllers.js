"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.userSignUp = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = __importDefault(require("zod"));
const User_1 = __importDefault(require("../Model/User"));
const userSignUpSchema = zod_1.default.object({
    name: zod_1.default.string({
        required_error: "name is required"
    }),
    email: zod_1.default.string({
        required_error: "valid email is required"
    }).email(),
    password: zod_1.default.string({
        required_error: "input password"
    })
});
const userLoginSchema = zod_1.default.object({
    email: zod_1.default.string({
        required_error: "valid email required"
    }).email(),
    password: zod_1.default.string({
        required_error: "input password"
    })
});
const userSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let newUser = req.body;
        const error = userSignUpSchema.safeParse(newUser);
        if (error.success === false) {
            res.status(400).send({
                error: error.error.issues[0].message
            });
            return;
        }
        const duplicate = yield User_1.default.findOne({ title: newUser.email }).exec();
        if (duplicate)
            return res.sendStatus(409);
        const result = yield User_1.default.create({
            'name': newUser.name,
            'email': newUser.email,
            'password': newUser.password
        });
        console.log(result);
        return res.status(200).json({ added: newUser });
    }
    catch (error) {
        console.error('invalid user format');
        console.log(error);
        res.status(500).json(error);
    }
});
exports.userSignUp = userSignUp;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let allUsersJSON = fs_1.default.readFileSync(path_1.default.join(__dirname, '../../database/usersDatabase.json'), 'utf8');
    const allUsers = JSON.parse(allUsersJSON);
    const user = req.body;
    const error = userLoginSchema.safeParse(user);
    if (error.success === false) {
        res.status(400).send({
            error: error.error.issues[0].message
        });
        return;
    }
    const databaseUser = yield User_1.default.findOne({ email: user.email, password: user.password }).exec();
    if (!databaseUser) {
        return res.status(400).send("invalid request");
    }
    if (databaseUser) {
        const token = jsonwebtoken_1.default.sign(databaseUser.email, 'appSecret');
        return res.status(200).json({
            "prompt": "login Successful",
            "email": databaseUser.email,
            token
        });
    }
});
exports.userLogin = userLogin;
