/**
 * @file MessageDao Interface represents the methods that can be perfomed on an MessageModel.
 */
import Message from "../../models/messages/Message";

export default interface MessageDao {

    userSendsAMessage(sourceuid: string, targetuid: string,message:Message): Promise<any>
    findAllMessagesSent(uid: string): Promise<Message[]>
    findAllMessagesReceived(uid: string): Promise<Message[]>
    userDeletesAMessage(uid: string, mid: string): Promise<any>

}