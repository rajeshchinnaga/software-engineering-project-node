/**
 * @file exports a  mongoose Follow model to perfrom CRUD operations to the 
 * documents in the follows collection.
 */
import * as mongoose from "mongoose";
import FollowSchema from "./FollowSchema";

const FollowModel = mongoose.model('FollowModel', FollowSchema)

export default FollowModel;