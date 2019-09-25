import {Schema, model} from 'mongoose';

export const userScheme = new Schema({
    login: String,
    password: String,
});

export const sessionScheme = new Schema({
    login: String,
});

export const UserModel = model("Admin", userScheme);
export const SessionModel = model("Session", sessionScheme);