/**
 * @file Controller RESTful Web service API for Tuits resource
 */
import {Request, Response, Express} from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/tuits/TuitController";
import Tuit from "../models/tuits/Tuit";
"Access-Control-Allow-Origin: *"
/**
 * @class TuitController Implements RESTful Web service API for tuits resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/tuits this endpoint is hit to retrieve all the tuits.
 *     </li>
 *     <li>GET /api/tuits/:tid this endpoint is hit to retrieve a single tuit having tuitid as tid.
 *     </li>
 *     <li>GET /api/users/:uid/tuits this endpoint is hit to retrieve all tuits that are tuited by user uid.
 *     </li>
 *     <li>POST /api/users/:uid this endpoint is hit to post a tuit by the user uid.</li>
 *     <li>DELETE /api/tuits/:tid this endpoint is hit to delete a tuit with tuit is as tid.
 *      </li>
 *     <li>PUT /api/tuits/:tid this endpoint is hit to record that a user updates a tuit having tuit id as tid.</li>
 * </ul>
 * @property {TuitDao} tuitDao Singleton DAO implementing tuits CRUD operations
 * @property {TuitController} TuitController Singleton controller implementing
 * RESTful Web service API
 */
export default class TuitController implements TuitControllerI {
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static tuitController: TuitController | null = null;
    public static getInstance = (app: Express): TuitController => {
            if(TuitController.tuitController === null) {
                TuitController.tuitController = new TuitController();
                app.get('/api/tuits', TuitController.tuitController.findAllTuits);
                app.get('/api/tuits/:tid', TuitController.tuitController.findTuitById);
                app.get("/api/users/:uid/tuits", TuitController.tuitController.findTuitsByUser);
                app.post("/api/users/:uid/tuits", TuitController.tuitController.createTuit);
                app.put("/api/tuits/:tid", TuitController.tuitController.updateTuit);
                app.delete("/api/tuits/:tid", TuitController.tuitController.deleteTuit);
                
            }
            return TuitController.tuitController;
    }
    private constructor(){}
    /**
     * Retrieve all tuit documents from tuits collection.
     * @param {Request} req Represents request from client, representing the tuits.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects.
     */
    findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuits()
           .then((tuits:Tuit[]) => res.json(tuits));
    /**
     *  Retrieve all tuit documents from tuits collection which are posted by a particular user.
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects.
     */
     findTuitsByUser = (req: Request, res: Response) => {
        // @ts-ignore
        let userId = req.params.uid === "me" && req.session['profile'] ?
            // @ts-ignore
            req.session['profile']._id : req.params.uid;
        TuitController.tuitDao.findTuitsByUser(userId)
            .then((tuits: Tuit[]) => res.json(tuits));
    }
    /**
     * Retrieves a single tuit document from tuits collection which has id as tid.
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the tuit.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit object.
     */
    findTuitById = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitById(req.params.tid)
            .then((tuit: Tuit) => res.json(tuit));
    /**
     * creates a new Tuit instance into the tuits collection.
     * @param {Request} req Represents request from client, including the
     * path parameters uid and body representing the user posting a tuit.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new tuit that was inserted in the
     * database.
     */
     createTuit = (req: Request, res: Response) => {
        // @ts-ignore
        let userId = req.params.uid === "my" && req.session['profile'] ?
            // @ts-ignore
            req.session['profile']._id : req.params.uid;

        console.log(userId);
        
        TuitController.tuitDao.createTuit(userId, req.body)
            .then((tuit: Tuit) => res.json(tuit));
    }
    /**
     * Removes tuit from the tuits collection.
     * @param {Request} req Represents request from client, including the
     * path parameters tid representing the user deleting a tuit.
     * @param {Response} res Represents response to client, including status
     * on whether deleting the tuit was successful or not
     */
    deleteTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.deleteTuit(req.params.tid)
            .then(status => res.json(status));
    /**
     * Updates Tuit with new values in tuits collection for the tuit with tuit id tid.
     * @param {Request} req Represents request from client, including the
     * path parameters tid and body representing the user updating a tuit.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the tuit has been updated and inserted in the
     * database.
     */
    updateTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.updateTuit(req.params.tid, req.body)
            .then(status => res.json(status));
}