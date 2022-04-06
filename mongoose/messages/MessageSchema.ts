/**
 * @file Message Schema represents the schema of the message collections that is present in the MongoDB.
 */
import mongoose, {Schema} from "mongoose";
import Message from "../../models/messages/Message";

const MessageSchema = new mongoose.Schema<Message>({
    message: {type: String, required: true},
    messageSentBy: {type: Schema.Types.ObjectId, ref: 'UserModel'},
    messageSentTo: {type: Schema.Types.ObjectId, ref: 'UserModel'},
    messageSentOn: {type: Date, default: Date.now}
}, {collection: 'message'});

export default MessageSchema;