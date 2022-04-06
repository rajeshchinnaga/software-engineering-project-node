/**
 * @file exports a  mongoose Tuit model to perfrom CRUD operations to the 
 * documents in the tuits collection.
 */
import mongoose from 'mongoose';
import TuitSchema from "./TuitSchema";

const TuitModel = mongoose.model('TuitModel',TuitSchema);

export default TuitModel;