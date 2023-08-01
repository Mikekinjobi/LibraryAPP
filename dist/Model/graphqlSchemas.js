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
const graphql_1 = require("graphql");
const graphql_2 = require("graphql");
// import { getAllBooks, getBook, addBook, updateBook, deleteBook } from '../controllers/bookControllers';
const Book_1 = __importDefault(require("./Book"));
const User_1 = __importDefault(require("./User"));
const authorization_1 = require("../utils/authorization");
// const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = graphql;
const BookType = new graphql_2.GraphQLObjectType({
    name: "Book",
    fields: () => ({
        _id: { type: graphql_1.GraphQLID },
        title: { type: graphql_2.GraphQLString },
        author: { type: graphql_2.GraphQLString },
        datePublished: { type: graphql_2.GraphQLString },
        description: { type: graphql_2.GraphQLString },
        pageCount: { type: graphql_2.GraphQLInt },
        genre: { type: graphql_2.GraphQLString },
        publisher: { type: graphql_2.GraphQLString },
        // "__V": { type: GraphQLInt}
    })
});
const UserType = new graphql_2.GraphQLObjectType({
    name: "User",
    fields: () => ({
        _id: { type: graphql_1.GraphQLID },
        name: { type: graphql_2.GraphQLString },
        email: { type: graphql_2.GraphQLString },
        password: { type: graphql_2.GraphQLString }
    })
});
const RootQuery = new graphql_2.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllBooks: {
            type: new graphql_2.GraphQLList(BookType),
            resolve: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
                const email = yield (0, authorization_1.decodeToken)(context.token);
                if (!email)
                    return;
                return yield Book_1.default.find({});
            })
        },
        getbook: {
            type: BookType,
            args: {
                _id: { type: graphql_1.GraphQLID }
            },
            resolve: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
                const email = yield (0, authorization_1.decodeToken)(context.token);
                if (!email)
                    return;
                return yield Book_1.default.findOne({ _id: args._id });
            })
        },
        getAllUsers: {
            type: new graphql_2.GraphQLList(UserType),
            resolve: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
                const email = yield (0, authorization_1.decodeToken)(context.token);
                if (!email)
                    return;
                return yield User_1.default.find({});
            })
        },
        getUser: {
            type: UserType,
            args: {
                _id: { type: graphql_1.GraphQLID }
            },
            resolve: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
                const email = yield (0, authorization_1.decodeToken)(context.token);
                if (!email)
                    return;
                return yield User_1.default.findOne({ _id: args._id });
            })
        }
    }
});
const Mutation = new graphql_2.GraphQLObjectType({
    name: "Mutation",
    fields: {
        addBook: {
            type: BookType,
            args: {
                title: { type: graphql_2.GraphQLString },
                author: { type: graphql_2.GraphQLString },
                datePublished: { type: graphql_2.GraphQLString },
                description: { type: graphql_2.GraphQLString },
                pageCount: { type: graphql_2.GraphQLInt },
                genre: { type: graphql_2.GraphQLString },
                publisher: { type: graphql_2.GraphQLString }
            },
            resolve: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
                const email = yield (0, authorization_1.decodeToken)(context.token);
                if (!email)
                    return;
                const duplicate = yield Book_1.default.findOne({ title: args.title }).exec();
                if (duplicate)
                    return;
                try {
                    yield Book_1.default.create({
                        "title": args.title,
                        "author": args.author,
                        "datePublished": args.datePublished,
                        "description": args.description,
                        "pageCount": args.pageCount,
                        "genre": args.genre,
                        "publisher": args.publisher
                    });
                    // console.log(args);
                    return args;
                    //   response.status(201).json({added: newBook});
                }
                catch (err) {
                    console.error(err);
                    //   b
                }
            })
        },
        updateBook: {
            type: BookType,
            args: {
                _id: { type: graphql_1.GraphQLID },
                author: { type: graphql_2.GraphQLString },
                datePublished: { type: graphql_2.GraphQLString },
                description: { type: graphql_2.GraphQLString },
                pageCount: { type: graphql_2.GraphQLInt },
                genre: { type: graphql_2.GraphQLString },
                publisher: { type: graphql_2.GraphQLString }
            },
            resolve: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
                const email = yield (0, authorization_1.decodeToken)(context.token);
                if (!email)
                    return;
                try {
                    yield Book_1.default.updateOne({
                        _id: args._id,
                    }, { author: args.author,
                        datePublished: args.datePublished,
                        description: args.description,
                        pageCount: args.pageCount,
                        genre: args.genre,
                        publisher: args.publisher });
                    // console.log(args);
                    return args;
                    //   response.status(201).json({added: newBook});
                }
                catch (err) {
                    console.error(err);
                }
            })
        },
        deleteBook: {
            type: BookType,
            args: {
                _id: { type: graphql_1.GraphQLID },
            },
            resolve: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
                const email = yield (0, authorization_1.decodeToken)(context.token);
                if (!email)
                    return;
                try {
                    yield Book_1.default.deleteOne({
                        _id: args._id,
                    });
                    // console.log(args);
                    return args;
                    //   response.status(201).json({added: newBook});
                }
                catch (err) {
                    console.error(err);
                }
            })
        },
        addUser: {
            type: UserType,
            args: {
                name: { type: graphql_2.GraphQLString },
                email: { type: graphql_2.GraphQLString },
                password: { type: graphql_2.GraphQLString }
            },
            resolve: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
                const duplicate = yield User_1.default.findOne({ email: args.email }).exec();
                if (duplicate)
                    return;
                try {
                    yield User_1.default.create({
                        name: args.name,
                        email: args.email,
                        password: args.password
                    });
                    return args;
                }
                catch (err) {
                    console.error(err);
                }
            })
        },
        loginUser: {
            type: graphql_2.GraphQLString,
            args: {
                email: { type: graphql_2.GraphQLString },
                password: { type: graphql_2.GraphQLString }
            },
            resolve: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
                const validUser = yield User_1.default.findOne({ email: args.email, password: args.password }).exec();
                if (!validUser)
                    return;
                const token = (0, authorization_1.generateToken)(validUser.email);
                return token;
            })
        }
    }
});
exports.default = new graphql_2.GraphQLSchema({ query: RootQuery, mutation: Mutation });
