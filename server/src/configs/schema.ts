import {Schema, model} from 'mongoose';

export const userScheme = new Schema({
    login: String,
    password: String,
});

export const UserModel = model("User", userScheme);