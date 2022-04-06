/**
 * @file Bookmark Schema represents the schema of the bookmark collections that is present in the MongoDB.
 */
import mongoose, {Schema} from "mongoose";
import Bookmark from "../../models/bookmarks/Bookmark";

const BookmarkSchema = new mongoose.Schema<Bookmark>({
    tuit: {type:Schema.Types.ObjectId, ref: 'TuitModel'},
    bookMarkedBy: {type: Schema.Types.ObjectId, ref: 'UserModel'},
    bookMarkedOn: {type: Date, default: Date.now}
}, {collection: 'bookmarks'});

export default BookmarkSchema;