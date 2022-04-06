/**
 * @file Implements DAO managing data storage of users. Uses mongoose UserModel
 * to integrate with MongoDB
 */
import User from "../models/users/User";
import UserModel from "../mongoose/users/UserModel";
import UserDaoI from "../interfaces/users/UserDao";

/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao  single instance of UserDao which is obtained using a singleton design pattern.
 */
export default class UserDao implements UserDaoI {

    private static userDao: UserDao | null =null;
    public static getInstance = (): UserDao => {
        if(UserDao.userDao === null) {
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    }
    private constructor(){}
    /**
     * Retrieves all user documents from users collection.
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    async findAllUsers(): Promise<User[]> {
       return await UserModel.find();
    }
    /**
     * Retrieve single user document with id:uid from users collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when user is retrieved from the database
     */
    async findUserById(uid: string): Promise<any> {
       return await UserModel.findById(uid);
    }
    /**
     * Creates user instance into the users collection.
     * @param {User} user Instance to be inserted into the database
     * @returns Promise To be notified when user is inserted into the database
     */
    async createUser(user: User): Promise<User> {
       return await UserModel.create(user);
    }
    /**
     * Removes user from the users collection.
     * @param {string} uid Primary key of user to be removed
     * @returns Promise To be notified when user is removed from the database
     */
    async deleteUser(uid: string):  Promise<any> {
        return await UserModel.deleteOne({_id: uid});
    }
    /**
     * Updates user with id: uid with new values in users collection.
     * @param {string} uid Primary key of user to be modified
     * @param {User} user User object containing properties and their new values
     * @returns Promise To be notified when user is updated in the database
     */
    async updateUser(uid: string, user: User): Promise<any> {
        return await UserModel.updateOne({_id: uid}, {$set: user});
    }

    /**
      * Removes all users from the database. Useful for testing
      * @returns Promise To be notified when all users are removed from the
      * database
      */
     deleteAllUsers = async (): Promise<any> =>
         UserModel.deleteMany({});
     
     deleteUsersByUsername = async (username: string): Promise<any> =>
        UserModel.deleteMany({username});
     
     findUserByCredentials = async (username: string, password: string): Promise<any> =>
        UserModel.findOne({username: username, password: password});
    
     findUserByUsername = async (username: string): Promise<any> =>
        UserModel.findOne({username});
}
