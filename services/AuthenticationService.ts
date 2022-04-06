import UserDao from "../daos/UserDao";
import mongoose from "mongoose";

const userDao: UserDao = UserDao.getInstance();
//const DB_USERNAME = "admin" || process.env.DB_USERNAME;
//const DB_PASSWORD = "admin" || process.env.DB_PASSWORD;
//const connectionString = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.r5rhk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const PROTOCOL = "mongodb+srv";
const DB_USERNAME = "rajeshchinnaga";//process.env.DB_USERNAME;
const DB_PASSWORD = "Lokesh$2919";//process.env.DB_PASSWORD;
const HOST = "https://zealous-euclid-23cde4.netlify.app";
const DB_NAME = "myFirstDatabase";
const DB_QUERY = "retryWrites=true&w=majority";
const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;
// connect to the database
mongoose.connect(connectionString);


export const login = (u: string, p: string) =>
  userDao.findUserByCredentials(u, p)
    .then(user => {
      if (user) {
        return user;
      } else {
        throw "Unknown user"
      }
    })
    .then(user => user)
    .catch(e => e)

export const register = (u: string, p: string, e: string) =>
  userDao.findUserByUsername(u)
    .then(user => {
      if (user) {
        throw 'User already exists';
      } else {
        return userDao.createUser({
            username: u, password: p, email: e
        });
      }
    })
    .then(newUser => newUser)
    .catch(e => e);

// giveRaise(50)
//   .then(results => console.log(results));
//
// initializeSalaries(50000)
//   .then(results => console.log(results));
//
// register('alice008', 'alice234', 'alice234@gmail.com')
//   .then(user => console.log(user))
//
login('alice008', 'alice234')
  .then(user => console.log(user))

// userDao.findAllUsers()
//   .then(users => console.log(users));