/**
 * @file Implements DAO managing data storage of Bookmark. Uses mongoose Bookmark model
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/bookmarks/BookmarkDao";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmark.
 * @property {Bookmark} bookmarkDao  single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {
    }

    /**
     * Retrieve all bookmarks documents from bookmarks collection which are bookmarked by user.
     * @param {string} uid Primary key of user to get details.
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookMarkedBy: uid})
            .populate("tuit")
            .exec();

    /**
     * creates a new bookmark record which contains the tuit id and user id.
     * @param {string} uid Instance to be inserted into the databse
     * @param {string} tid Instance to be inserted into the databse
     * @returns Promise To be notified when bookmark is inserted into the database
     */
    userBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.create({tuit: tid, bookMarkedBy: uid});

    /**
     * deletes bookmark record which contains the tuit id and user id.
     * @param {string} uid Primary key of user to retrieve the bookmark.
     * @param {string} tid Primary key of tuit.
     * @returns Promise To be notified when bookmark is removed from the database
     */
    userUnBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({tuit: tid, bookMarkedBy: uid});
}