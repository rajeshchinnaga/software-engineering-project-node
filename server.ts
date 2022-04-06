/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 * </ul>
 * 
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
 import express, {Request, Response} from 'express';
 import UserController from "./controllers/UserController";
 import TuitController from "./controllers/TuitController";
 import LikeController from "./controllers/LikeController";
 import mongoose from "mongoose";
 import BookmarkController from "./controllers/BookmarkController";
 import FollowController from "./controllers/FollowController";
 import MessageController from './controllers/MessageController';
 import DislikeController from './controllers/DislikeController';
 import AuthenticationController from "./controllers/AuthenticationController";
 var cors = require('cors')
 const session = require("express-session");
 
 // build the connection string
 const DB_USERNAME = "rajeshchinnaga" || process.env.DB_USERNAME;
const DB_PASSWORD = "Lokesh$2919" || process.env.DB_PASSWORD;

const connectionString = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@fse.xeh0y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

 // connect to the database
 mongoose.connect(connectionString);
 
 const app = express();
 
 app.use(cors({
     credentials: true,
     origin: ["http://localhost:3000","https://zealous-euclid-23cde4.netlify.app"]
 }));
 const SECRET = 'process.env.SECRET';
 let sess = {
     secret: SECRET,
     saveUninitialized: true,
     resave: true,
     cookie: {
         secure: false
     }
 }
 if (process.env.ENV === 'PRODUCTION') {
     app.set('trust proxy', 1) // trust first proxy
     sess.cookie.secure = true // serve secure cookies
 }
 app.use(session(sess))
 app.use(express.json());
 
 app.get('/', (req: Request, res: Response) =>
     res.send('Welcome!'));
 
 app.get('/add/:a/:b', (req: Request, res: Response) =>
     res.send(req.params.a + req.params.b));
 
 
 // create RESTful Web service API
 const userController = UserController.getInstance(app);
 const tuitController = TuitController.getInstance(app);
 const likesController = LikeController.getInstance(app);
 const bookmarkController = BookmarkController.getInstance(app);
 const followController = FollowController.getInstance(app);
 const messageController = MessageController.getInstance(app);
 const dislikeController = DislikeController.getInstance(app);
 AuthenticationController(app);
 /**
  * Start a server listening at port 4000 locally
  * but use environment variable PORT on Heroku if available.
  */
 const PORT = 4000;
 app.listen(process.env.PORT || PORT);