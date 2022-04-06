import Dislike from "../../models/likes/Dislike";

/**
 * @file Declares API for dislikes related data access object methods
 */
export default interface DislikeDaoI {
    userDislikesTuit (tid: string, uid: string): Promise<any>;
    userUndoDislikeTuit (tid: string, uid: string): Promise<any>;
    findUserDislikesTuit (tid: string, uid: string): Promise<Dislike>;
    countHowManyDisikedTuit (tid: string): Promise<any>;
}; 