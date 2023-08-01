"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookControllers_1 = require("../controllers/bookControllers");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// post book
router.post('/addbook', auth_1.auth, (req, res) => {
    (0, bookControllers_1.addBook)(req, res);
});
// get all books
router.get('/getallbooks', auth_1.auth, function (req, res, next) {
    (0, bookControllers_1.getAllBooks)(req, res);
});
// get all books in pages
router.get('/getallbooks/:page', auth_1.auth, function (req, res, next) {
    (0, bookControllers_1.getBooksByPage)(req, res);
});
// get book
router.get('/getbook/:id', auth_1.auth, function (req, res, next) {
    (0, bookControllers_1.getBook)(req, res);
});
// update book
router.put('/updatebook/:id', auth_1.auth, (req, res) => {
    (0, bookControllers_1.updateBook)(req, res);
});
// delete book
router.delete('/deletebook/:id', auth_1.auth, (req, res) => {
    (0, bookControllers_1.deleteBook)(req, res);
});
module.exports = router;
