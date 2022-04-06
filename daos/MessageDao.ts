/**
 * @file Implements DAO managing data storage of Messages. Uses mongoose Message model
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/messages/MessageDao";
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages/Message";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of messages.
 * @property {Message} messageDao  single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {
    }

    /**
     * Retrieve all messages documents from messages collection which are sent by the user.
     * @param {string} uid Primary key of user to get details.
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    findAllMessagesSent = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({messageSentBy: uid})
            .populate("message")
            .exec();

    /**
     * Retrieve all messages documents from messages collection which are received by a particular user.
     * @param {string} uid Primary key of user to get details.
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    findAllMessagesReceived = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({messageSentTo: uid})
            .populate("message")
            .exec();

    /**
     * creates a new  Message instance into the message collection.
     * @param {Message} message Instance to be inserted into the database
     * @param {string} sourceuid Instance to be inserted into the databse
     * @param {string} targetuid Instance to be inserted into the databse
     * @returns Promise To be notified when message is inserted into the database
     */
     userSendsAMessage = async (sourceuid: string, targetuid: string, message: Message): Promise<any> =>
        MessageModel.create({...message, messageSentBy: sourceuid, messageSentTo: targetuid});


    /**
     * Deletes Message from the message collection.
     * @param {string} uid Primary key of user to retrieve the message.
     * @param {string} mid Primary key of message.
     * @returns Promise To be notified when message is removed from the database
     */
    userDeletesAMessage = async (uid: string, mid: string): Promise<any> =>
        MessageModel.deleteOne({messageSentBy: uid, _id: mid});
}