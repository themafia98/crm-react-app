import {SendMailOptions} from 'nodemailer';

export interface Send {
    sendMail():void,
    createMailOptions(from:string, to:string, subject:string):void
    getMailOptions():SendMailOptions
}