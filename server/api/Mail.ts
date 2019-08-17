import nodemailer,{SendMailOptions, Transporter, SentMessageInfo} from 'nodemailer';
import {Send} from '../settings/interface';
import {transOptions} from '../types';
namespace namespaceMail {

    class Mail {
        private transporter:Transporter;

        constructor(transOptions:transOptions){
            this.transporter = nodemailer.createTransport(transOptions);
        }

        getTransporter():Transporter{
            return this.transporter;
        }

    }

    export class Sender implements Send {
        private hosting:Mail;
        private mailOptions:SendMailOptions;

        constructor(transOptions:transOptions){
            this.hosting = new Mail(transOptions);
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
            const trans = this.hosting.getTransporter();
                trans.sendMail(this.getMailOptions(), (err:any, info:SentMessageInfo) => {
                    if(err)
                    console.log(err)
                    else
                    console.log(info);
                });
        }
    }
}



export default namespaceMail;