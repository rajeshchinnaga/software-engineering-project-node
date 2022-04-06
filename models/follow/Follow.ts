/**
 * @file Declares data type representing relationship between
 * users and users where one user follows another and vice-versa.
 */
import User from "../users/User";


/**
 * @typedef Follow Represents follow relationship between a user and a user that is which user follows which another user.
 * @property {User} userFollower the source user.
 * @property {User} userFollowing the target user whom the source user follows.
 * @property {Date} followedOn the date on which the source user follows the target user.
 */
export default interface Follow {
    userFollower: User,
    userFollowing: User,
    followedOn:Date
}