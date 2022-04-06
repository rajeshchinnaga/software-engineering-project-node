/**
 * @file Declares data type representing relationship between
 * users and messages.
 */
import User from "../users/User";

/**
 * @typedef Message Represents information about the sender and recipient of the message, date when the message has been sent and the message it self.
 * @property {User} messageSentBy sender of the message.
 * @property {User} messageSentTo recipient of the message.
 * @property {string} message The message.
 * @property {Date} messageSentOn The date on which the message has been sent.
 */
export default interface Message {
    message:string,
    messageSentOn:Date,
    messageSentBy: User,
    messageSentTo: User
};