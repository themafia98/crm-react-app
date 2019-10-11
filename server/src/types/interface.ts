import {SendMailOptions} from 'nodemailer';
import { Request, } from "express";
export interface Send {
    sendMail():void,
    createMailOptions(from:string,name:string, number:string, to:string, subject:string):void
    createFeedBackMailOptions(from:string,name:string,number:string, to:string, 
                                subject:string, text:string):void
    getMailOptions():SendMailOptions
}

export interface RequestParam extends Request {
    origin: string,
    type?: string,
    priceType?:string,
    serviceType?: string,
    files?:any,
    session?: any,
}

export interface Card {
    _id:string,
    type:string, 
    name:string,
     content:string, 
     price:string,
     save?:Function
}

export interface updateCard {
    _id?:string,
    type:string, 
    name:string,
    content:string, 
    price:string
}
