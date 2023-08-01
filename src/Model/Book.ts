import mongoose from "mongoose";

const Schema = mongoose.Schema;

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
export default mongoose.model("Book", bookSchema);
