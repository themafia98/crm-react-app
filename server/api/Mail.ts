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

        createMailOptions(from:string, number:string, to:string, subject:string):void{
            this.mailOptions = {
                from: from, // sender address
                to: to, // list of receivers
                subject: subject, // Subject line
                html:`
                <h3>Запрос на консультацию</h3>
                <p>E-mail клиента: ${from}</p>
                <p>Номер клиента: ${number}</p>
                `
            };
        }

        getMailOptions():SendMailOptions{
            return this.mailOptions;
        }

        async sendMail():Promise<boolean>{
            let isDone = false;
                await this.hosting.sendMail(this.getMailOptions())
                .then((res) => {
                    if (/OK/ig.test(res.response))
                    isDone = true;
                    else isDone = false;
                })
            return isDone;
        }
    }
}



export default namespaceMail;