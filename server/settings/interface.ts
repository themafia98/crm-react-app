import {SendMailOptions} from 'nodemailer';

export interface Send {
    sendMail():void,
    createMailOptions(from:string, number:string, to:string, subject:string):void
    getMailOptions():SendMailOptions
}