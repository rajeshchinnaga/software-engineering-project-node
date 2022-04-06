/**
 * @file LikeDao Interface represents the methods that can be perfomed on an LikeModel.
 */
import Like from "../../models/likes/Like";

export default interface LikeDao {
    findAllUsersThatLikedTuit(tid: string): Promise<Like[]>;
    findAllTuitsLikedByUser(uid: string): Promise<Like[]>;
    userLikesTuit(tid: string, uid: string): Promise<any>;
    userUnlikesTuit(tid: string, uid: string): Promise<any>;
    findUserLikesTuit (tid: string, uid: string): Promise<any>;
    countHowManyLikedTuit (tid: string): Promise<any>;
}