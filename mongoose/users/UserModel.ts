/**
 * @file exports a  mongoose User model to perfrom CRUD operations to the 
 * documents in the users collection.
 */

import mongoose from "mongoose";
import UserSchema from "./UserSchema";
const UserModel = mongoose.model('UserModel', UserSchema);
export default UserModel;