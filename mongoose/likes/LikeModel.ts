/**
 * @file exports a  mongoose Like model to perfrom CRUD operations to the 
 * documents in the likes collection.
 */
import * as mongoose from "mongoose";
import LikeSchema from "./LikeSchema";

const LikeModel = mongoose.model('LikeModel', LikeSchema)

export default LikeModel;