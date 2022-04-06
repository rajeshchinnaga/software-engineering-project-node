/**
 * @file BookmarkController interface represents web services for Bookmark resource. 
 */
import {Request, Response} from "express";
import Bookmark from "../../models/bookmarks/Bookmark";

export default interface BookmarkController{
    findAllTuitsBookmarkedByUser(req: Request, res: Response): void;
    userBookmarksTuit(req: Request, res: Response): void;
    userUnBookmarksTuit(req: Request, res: Response): void;
};