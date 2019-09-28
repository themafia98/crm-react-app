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
    session?: any,
}