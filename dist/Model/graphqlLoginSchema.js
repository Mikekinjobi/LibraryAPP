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
const User_1 = __importDefault(require("./User"));
const authorization_1 = require("../utils/authorization");
const UserType = new graphql_2.GraphQLObjectType({
    name: "User",
    fields: () => ({
        _id: { type: graphql_1.GraphQLID },
        name: { type: graphql_2.GraphQLString },
        email: { type: graphql_2.GraphQLString },
        password: { type: graphql_2.GraphQLString }
    })
});
const Query = new graphql_2.GraphQLObjectType({
    name: "query",
    fields: {
        getAllUsers: {
            type: new graphql_2.GraphQLList(UserType),
            resolve: (parent) => __awaiter(void 0, void 0, void 0, function* () { return yield User_1.default.find({}); })
        }
    }
});
const Mutation = new graphql_2.GraphQLObjectType({
    name: "mutation",
    fields: {
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
exports.default = new graphql_2.GraphQLSchema({ query: Query, mutation: Mutation });
