/**
 * Mongo User schema
 */

import { IUser } from '../interfaces/IUser';
import * as mongoose from 'mongoose';
import { Promise } from 'es6-promise';

interface IUserModel extends IUser, mongoose.Document {}

let userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String
});

let User = mongoose.model<IUserModel>("User", userSchema);

export default User;

// see documentation here for better comprehension : https://github.com/Appsilon/styleguide/wiki/mongoose-typescript-models