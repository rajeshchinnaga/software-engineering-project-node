/**
 * @file Declares data type representing information about the tuit
 */
import User from "../users/User";
import mongoose from "mongoose";
import Stats from "../Stats";

/**
 * @typedef Tuit Represents information about the tuit i.e when the tuit is posted and by whom the tuit has been posted.
 * @property postedBy{User} The User who posted the tuit.
 * @property tuit{string} Information of the tuit.
 * @property postedOn{Date} The date when the tuit has been posted.
 */
 export default interface Tuit {
  tuit: string,
  postedBy: User,
  postedOn?: Date,
  image?: String,
  youtube?: String,
  avatarLogo?: String,
  imageOverlay?: String,
  stats: Stats
};
