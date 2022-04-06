/**
 * @file MessageController interface represents web services for Message resource. 
 */
import {Request, Response} from "express";

export default interface MessageController{

    userSendsAMessage(req: Request, res: Response): void;
    findAllMessagesSent(req: Request, res: Response): void;
    findAllMessagesReceived(req: Request, res: Response): void;
    userDeletesAMessage(req: Request, res: Response): void;

};