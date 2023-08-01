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
exports.deleteBook = exports.updateBook = exports.getBook = exports.getBooksByPage = exports.getAllBooks = exports.addBook = void 0;
const Book_1 = __importDefault(require("../Model/Book"));
const User_1 = __importDefault(require("../Model/User"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const zod_1 = __importDefault(require("zod"));
const addBookSchema = zod_1.default.object({
    title: zod_1.default.string({
        required_error: "input book title"
    }),
    author: zod_1.default.string({
        required_error: "input book author"
    }),
    description: zod_1.default.string({
        required_error: "input book description"
    })
});
const usersJSON = fs_1.default.readFileSync(path_1.default.join(__dirname, '../../database/usersDatabase.json'), 'utf-8');
const allValidUsers = JSON.parse(usersJSON);
const addBook = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    request.on('error', (error) => {
        response.status(500).send(error);
    });
    let newBook = request.body;
    const error = addBookSchema.safeParse(newBook);
    if (error.success === false) {
        response.status(400).send({
            error: error.error.issues[0].message
        });
        return;
    }
    const validUser = yield User_1.default.findOne({ email: request.body.user }).exec();
    if (!validUser) {
        response.status(401).send('unauthorized user');
        return;
    }
    delete request.body.user;
    const duplicate = yield Book_1.default.findOne({ title: newBook.title }).exec();
    if (duplicate)
        return response.sendStatus(409);
    try {
        const result = yield Book_1.default.create({
            "title": newBook.title,
            "author": newBook.author,
            "datePublished": newBook.datePublished,
            "description": newBook.description,
            "pageCount": newBook.pageCount,
            "genre": newBook.genre,
            "publisher": newBook.publisher
        });
        console.log(result);
        response.status(201).json({ added: newBook });
    }
    catch (err) {
        console.error(error);
        response.status(500).json(err);
    }
});
exports.addBook = addBook;
const getAllBooks = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    request.on('error', (error) => {
        response.status(500).send(error);
    });
    const validUser = yield User_1.default.findOne({ email: request.body.user }).exec();
    if (!validUser) {
        response.status(401).send('unauthorized user');
        return;
    }
    try {
        const allBooks = yield Book_1.default.find({});
        response.status(200).json(allBooks);
    }
    catch (error) {
        response.status(500).json(error);
    }
});
exports.getAllBooks = getAllBooks;
const getBooksByPage = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    request.on('error', (error) => {
        response.status(500).send(error);
    });
    const validUser = yield User_1.default.findOne({ email: request.body.user }).exec();
    if (!validUser) {
        response.status(401).send('unauthorized user');
        return;
    }
    try {
        let page = Number(request.params.page);
        const limit = 5;
        const skip = 5;
        const allBooks = yield Book_1.default.find({}).skip(skip * (page - 1)).limit(limit);
        if (allBooks.length == 0)
            return response.status(404).send("page not found");
        response.status(200).json(allBooks);
        return;
    }
    catch (error) {
        response.status(500).json(error);
    }
});
exports.getBooksByPage = getBooksByPage;
const getBook = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    request.on('error', (error) => {
        response.status(500).send(error);
    });
    const validUser = yield User_1.default.findOne({ email: request.body.user }).exec();
    if (!validUser) {
        response.status(401).send('unauthorized user');
        return;
    }
    const book = yield Book_1.default.findOne({ title: request.params.id }).exec();
    response.status(200).json(book);
});
exports.getBook = getBook;
const updateBook = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    request.on('error', (error) => {
        response.status(500).send(error);
    });
    const validUser = yield User_1.default.findOne({ email: request.body.user }).exec();
    if (!validUser) {
        response.status(401).send('unauthorized user');
        return;
    }
    delete request.body.user;
    const bookToUpdate = request.params.id;
    let newUpdate = request.body;
    yield Book_1.default.updateOne({ title: [bookToUpdate] }, newUpdate).then(result => {
        response.status(200).json(result);
    });
});
exports.updateBook = updateBook;
const deleteBook = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    request.on('error', (error) => {
        response.status(500).send(error);
    });
    const validUser = yield User_1.default.findOne({ email: request.body.user }).exec();
    if (!validUser) {
        response.status(401).send('unauthorized user');
        return;
    }
    const bookToDelete = request.params.id;
    try {
        Book_1.default.deleteOne({ title: bookToDelete }).then(result => {
            response.status(200).json(result);
        });
    }
    catch (error) {
        console.error(error);
        response.json(error);
    }
});
exports.deleteBook = deleteBook;
