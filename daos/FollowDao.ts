/**
 * @file Implements DAO managing data storage of Follow. Uses mongoose Follow model
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/follow/FollowDao";
import FollowModel from "../mongoose/follow/FollowModel";
import Follow from "../models/follow/Follow";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follow.
 * @property {Follow} followDao  single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {
    }


    /**
     * Retrieve all users documents from follow collection which the user uid follows.
     * @param {string} uid Primary key of user to get details.
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllFollowingUsers = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollower: uid})
            .populate("userFollowing")
            .exec();

    /**
     * Retrieve all followers documents from follow collection that is all the users that follow the user uid.
     * @param {string} uid Primary key of user to get details.
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllFollowers = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("userFollower")
            .exec();


    /**
     * creates new follow record with sourceuid and targetuid where the sourceuid follows the targetuid.
     * @param {string} sourceuid Instance to be inserted into the databse
     * @param {string} targetuid Instance to be inserted into the databse
     * @returns Promise To be notified when following user is inserted into the database
     */
    userFollowsAnotherUser = async (sourceuid: string, targetuid: string): Promise<any> =>
        FollowModel.create({userFollower: sourceuid, userFollowing: targetuid});

    /**
     * deletes follow record with sourceuid and targetuid where the sourceuid follows the targetuid.
     * @param {string} sourceuid Primary key of source user.
     * @param {string} targetid Primary key of target user.
     * @returns Promise To be notified when following user is removed from the database
     */
    userUnfollowsAnotherUser = async (sourceuid: string, targetuid: string): Promise<any> =>
        FollowModel.deleteOne({userFollower: sourceuid, userFollowing: targetuid});
}