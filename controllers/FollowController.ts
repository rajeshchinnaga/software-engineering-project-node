/**
 * @file Controller RESTful Web service API for Follow resource
 */
import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/follow/FollowController"

/**
 * @class FollowController Implements RESTful Web service API for Follow resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/following this endpoint retrieves all the users that the user uid follows.
 *     </li>
 *     <li>GET /api/users/:uid/followers this endpoint retrieves all the users who follow the user with uid.
 *     </li>
 *     <li>POST /api/users/:sourceuid/following/:targetuid this endpoint makes sure that the source user follows a target user.
 *     </li>
 *     <li>DELETE /api/users/:sourceuid/unfollowing/:targetuid this endpoint makes sure that the source user unfollows a target user
 *      </li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing Follow CRUD operations
 * @property {FollowController}  FollowController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post("/api/users/:sourceuid/following/:targetuid",
                FollowController.followController.userFollowsAnotherUser);
            app.delete("/api/users/:sourceuid/unfollowing/:targetuid",
                FollowController.followController.userUnfollowsAnotherUser);
            app.get("/api/users/:uid/following",
                FollowController.followController.findAllFollowingUsers);
            app.get("/api/users/:uid/followers",
                FollowController.followController.findAllFollowers);
        }
        return FollowController.followController;
    }

    private constructor() {
    }

    /**
     * creates new follow record with sourceuid and targetuid where the sourceuid follows the targetuid.
     * @param {Request} req Represents request from client, including the
     * path parameters sourceuid and targetuid representing the user that is following another user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new following user that was inserted in the
     * database.
     */
    userFollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.
        userFollowsAnotherUser(req.params.sourceuid, req.params.targetuid)
            .then(follow => res.json(follow));


    /**
     * deletes follow record with sourceuid and targetuid where the sourceuid follows the targetuid.
     * @param {Request} req Represents request from client, including the
     * path parameters sourceuid and targetuid representing the user that is unfollowing
     * anorther user and the user being unfollowed
     * @param {Response} res Represents response to client, including status
     * on whether unfollowing the user was successful or not
     */
    userUnfollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.
        userUnfollowsAnotherUser(req.params.sourceuid, req.params.targetuid)
            .then(status => res.send(status));


    /**
     *  Retrieve all users documents from follow collection which the user uid follows.
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the User following another user.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follow objects.
     */
    findAllFollowingUsers = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowingUsers(req.params.uid)
            .then(follow => res.json(follow));

    /**
     * Retrieve all followers documents from follow collection that is all the users that follow the user uid.
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the User follower.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follow objects.
     */
    findAllFollowers = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowers(req.params.uid)
            .then(follow => res.json(follow));

};