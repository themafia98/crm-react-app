import nodemailer,{SendMailOptions, Transporter, SentMessageInfo} from 'nodemailer';
import {Send} from '../settings/interface';
import {transOptions} from '../types';
namespace namespaceMail {

    abstract class Mail {
        private transporter:Transporter;

        constructor(transOptions:transOptions){
            this.transporter = nodemailer.createTransport(transOptions);
        }

        getTransporter():Transporter{
            return this.transporter;
        }

    }

    export class Sender extends Mail implements Send {
        private hosting:Transporter;
        private mailOptions:SendMailOptions;

        constructor(transOptions:transOptions){
            super(transOptions);
            this.hosting = super.getTransporter();
        }

        createMailOptions(from:string, to:string, subject:string):void{
            this.mailOptions = {
                from: from, // sender address
                to: to, // list of receivers
                subject: subject, // Subject line
                html: '<h1>HI BRO!</h1>'// plain text body
            };
        }

        getMailOptions():SendMailOptions{
            return this.mailOptions;
        }

        sendMail():void{
            this.hosting.sendMail(this.getMailOptions(), (err:any, info:SentMessageInfo) => {
                    if(err)
                    console.log(err)
                    else
                    console.log(info);
                });
        }
    }
}



export default namespaceMail;