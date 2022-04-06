/**
 * @file exports a  mongoose BookMark model to perfrom CRUD operations to the 
 * documents in the bookmarks collection.
 */
import * as mongoose from "mongoose";
import BookmarkSchema from "./BookmarkSchema";

const BookmarkModel = mongoose.model('BookmarkModel', BookmarkSchema)

export default BookmarkModel;