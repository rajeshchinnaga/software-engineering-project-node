/**
 * @file Declares data type representing relationship between
 * users and tuits.
 */
import Tuit from "../tuits/Tuit";
import User from "../users/User";

/**
 * @typedef Like Represents likes relationship between a user and a tuit that is information about the user who liked a particular tuit.
 * @property {Tuit} tuit Tuit that is being liked.
 * @property {User} likedBy User liking the tuit.
 */
export default interface Like {
    tuit: Tuit,
    likedBy: User
}