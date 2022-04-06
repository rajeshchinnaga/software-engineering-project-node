/**
 * @file Controller RESTful Web service API for Users resource
 */
import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/users/UserController";
/**
 * @class UserController Implements RESTful Web service API for users resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users to retrieve all the users created.
 *     </li>
 *     <li>GET /api/users/:userid to retrieve a single user using uid.
 *     </li>
 *     <li>POST /api/users to create a user</li>
 *     <li>DELETE /api/users/:userid to record that a user
 *      is deleted</li>
 *     <li>PUT /api/users/:userid to record that a user is updated</li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing tuits CRUD operations
 * @property {UserController} UserController Singleton controller implementing
 * RESTful Web service API
 */
export default class UserController implements UserControllerI {
    private static userDao: UserDao = UserDao.getInstance();
    private static userController: UserController | null = null;
    public static getInstance = (app: Express): UserController => {
        if(UserController.userController === null) {
            UserController.userController = new UserController();
            app.get('/api/users', UserController.userController.findAllUsers);
            app.get('/api/users/:userid', UserController.userController.findUserById);
            app.post('/api/users', UserController.userController.createUser);
            app.delete('/api/users/:userid', UserController.userController.deleteUser);
            app.put('/api/users/:userid', UserController.userController.updateUser);
            app.delete("/api/users",
                UserController.userController.deleteAllUsers);

            app.post("/api/login",
                UserController.userController.login);

             // for testing. Not RESTful
             app.get("/api/users/create",
             UserController.userController.createUser);
           app.get("/api/users/id/:uid/delete",
             UserController.userController.deleteUser);
           app.get("/api/users/username/:username/delete",
             UserController.userController.deleteUsersByUsername);
           app.get("/api/users/delete",
             UserController.userController.deleteAllUsers);
        }
        return UserController.userController;
   }
   /**
     * Retrieves all users from the users collection.
     * @param {Request} req Represents request from client to retrieve all the users.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects.
     */
   findAllUsers = (req: Request, res: Response) =>
        UserController.userDao.findAllUsers()
           .then(users => res.json(users));
     /**
     * Retrieves a user from the users collection.
     * @param {Request} req Represents request from client, including the path
     * parameter userid representing the user.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user object.
     */
   findUserById = (req: Request, res: Response) =>
        UserController.userDao.findUserById(req.params.userid)
           .then(user => res.json(user));

     /**
     * creates the user in the user collection as per the request body.
     * @param {Request} req Represents request from client, including the
     * path parameters body representing the creating a user.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new user that was inserted in the
     * database.
     */
   createUser = (req: Request, res: Response) =>
        UserController.userDao.createUser(req.body)
           .then(user => res.json(user));
     /**
      * Deletes the user from the user collection with id as userid
     * @param {Request} req Represents request from client, including the
     * path parameters userid representing the user is deleted.
     * @param {Response} res Represents response to client, including status
     * on whether deleting the user was successful or not
     */
   deleteUser = (req: Request, res: Response) =>
        UserController.userDao.deleteUser(req.params.userid)
           .then(status => res.json(status));
     /**
      * Updates the user from the user collection with id as userid using the request body.
     * @param {Request} req Represents request from client, including the
     * path parameters userid and body representing the user and the details of the user..
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the user has been updated and inserted in the
     * database.
     */
   updateUser = (req: Request, res: Response) =>
        UserController.userDao.updateUser(req.params.userid, req.body)
           .then(status => res.json(status));

   /**
     * Removes all user instances from the database. Useful for testing
     * @param {Request} req Represents request from client 
     * @param {Response} res Represents response to client, including status
     * on whether deleting all users was successful or not
     */
    deleteAllUsers = (req: Request, res: Response) =>
        UserController.userDao.deleteAllUsers()
            .then((status) => res.send(status));

    deleteUsersByUsername = (req: Request, res: Response) =>
      UserController.userDao.deleteUsersByUsername(req.params.username)
        .then(status => res.send(status));

    login = (req: Request, res: Response) =>
        UserController.userDao
            .findUserByCredentials(req.body.username, req.body.password)
            .then(user => {
                res.json(user)
            });
    
    register = (req: Request, res: Response) =>
        UserController.userDao.findUserByUsername(req.body.username)
            .then(user => {
                
            })
}
