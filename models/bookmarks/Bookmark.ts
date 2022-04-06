/**
 * @file Declares  data type representing relationship between
 * users and tuits.
 */
import Tuit from "../tuits/Tuit";
import User from "../users/User";


/**
 * @typedef Bookmark Represents bookmarks relationship between a user and a tuit that is it gives information about the bookmarks done by a particular user.
 * @property {Tuit} tuit Tuit being bookmarked.
 * @property {User} bookMarkedBy User who bookmarked the tuit.
 * @property {Date} bookMarkedOn the date on which the user bookmarked the tuit.
 */
export default interface Bookmark {
    tuit: Tuit,
    bookMarkedBy: User,
    bookMarkedOn: Date
}