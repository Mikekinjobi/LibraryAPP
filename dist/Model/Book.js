"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    datePublished: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    pageCount: {
        type: Number,
        required: false,
    },
    genre: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    },
});
// module.exports = mongoose.model("Book", bookSchema);
exports.default = mongoose_1.default.model("Book", bookSchema);
