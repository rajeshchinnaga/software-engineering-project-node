/**
 * @file FollowController interface represents web services for Follow resource. 
 */
import {Request, Response} from "express";


export default interface FollowController{
    findAllFollowingUsers(req: Request, res: Response): void;
    findAllFollowers(req: Request, res: Response): void;
    userFollowsAnotherUser(req: Request, res: Response): void;
    userUnfollowsAnotherUser(req: Request, res: Response): void;
};