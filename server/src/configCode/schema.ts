import {Schema, model} from 'mongoose';

export const userScheme = new Schema({
    login: String,
    password: String,
});

export const fileScheme = new Schema({
    fileName: String,
    format: String,
    file: Buffer
})

export const sessionScheme = new Schema({
    login: String,
});

export const cardsScheme = new Schema({
    type: String,
    name: String,
    content: String,
    price: String,
});

export const UserModel = model("Admin", userScheme);
export const SessionModel = model("Session", sessionScheme);
export const FileModel = model('Files', fileScheme);
export const CardsModel = model('Cards', cardsScheme);