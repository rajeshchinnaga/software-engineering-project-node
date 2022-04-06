/**
 * @file LikeController interface represents web services for Likes resource. 
 */
import {Request, Response} from "express";

export default interface LikeController{
    findAllUsersThatLikedTuit(req: Request, res: Response): void;
    findAllTuitsLikedByUser(req: Request, res: Response): void;
    userTogglesTuitLikes (req: Request, res: Response): void;
    findUserLikedTuit (req: Request, res: Response): void;
};