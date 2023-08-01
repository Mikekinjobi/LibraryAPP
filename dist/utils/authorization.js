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
exports.decodeToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (data) => {
    const token = jsonwebtoken_1.default.sign(data, 'appSecret');
    return token;
};
exports.generateToken = generateToken;
const decodeToken = (bearer) => __awaiter(void 0, void 0, void 0, function* () {
    // const token =  bearer.split(' ')[1];
    const decoded = yield jsonwebtoken_1.default.verify(bearer, 'appSecret');
    if (!decoded)
        return;
    return new Promise((resolve) => resolve(decoded));
});
exports.decodeToken = decodeToken;
const contextObject = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const values = req.headers.authorization.split(' ');
    let verified = null;
    try {
        verified = yield jsonwebtoken_1.default.verify(values[1], 'appSecret');
    }
    catch (err) {
        console.log(err);
    }
    return {
        email: verified
    };
});
