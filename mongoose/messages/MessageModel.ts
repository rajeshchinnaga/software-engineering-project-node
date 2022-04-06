/**
 * @file exports a  Message Tuit model to perfrom CRUD operations to the 
 * documents in the message collection.
 */
import * as mongoose from "mongoose";
import MessageSchema from "./MessageSchema";

const MessageModel = mongoose.model('MessageModel', MessageSchema)

export default MessageModel;