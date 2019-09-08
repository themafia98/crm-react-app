import nodemailer,{SendMailOptions, Transporter} from 'nodemailer';
import namespaceLogger from '../logger/logger';
import {Send} from '../configs/interface';
import {transOptions} from '../configs/types';

namespace namespaceMail {

    const log = namespaceLogger.loggerError();

    abstract class MailTransporter {
        private transporter:Transporter;

        constructor(transOptions:transOptions){
            this.transporter = nodemailer.createTransport(transOptions);
            this.transporter.verify()
            .then(res => {
                if (res)
                 console.log("Server is ready to take messages");
                 else throw new Error('Server error to take messages');
            })
            .catch(error => {
                log.error(error.message + ` / ${Date.now()}`);
            });
        }

        getTransporter():Transporter{
            return this.transporter;
        }

    }

    export class Sender extends MailTransporter implements Send {
        private hosting:Transporter;
        private mailOptions:SendMailOptions;

        constructor(transOptions:transOptions){
            super(transOptions);
            this.hosting = super.getTransporter();
        }

        createMailOptions(from:string,name:string, number:string, 
                            to:string, subject:string):void{
            this.mailOptions = {
                from: from, // sender address
                to: to, // list of receivers
                subject: subject, // Subject line
                html:`
                <h3>Запрос на консультацию</h3>
                <p>Имя:${name}</p>
                <p>E-mail клиента: ${from}</p>
                <p>Номер клиента: ${number}</p>
                `
            };
        }

        createFeedBackMailOptions(from:string,name:string,
                                  text:string, number:string, 
                                  to:string, subject:string):void{
            this.mailOptions = {
                from: from, // sender address
                to: to, // list of receivers
                subject: subject, // Subject line
                html:`
                <h3>Вопрос от клиента</h3>
                <p>Имя:${name}</p>
                <p>E-mail клиента: ${from}</p>
                <p>Номер клиента: ${number}</p>
                <p>${text}</p>
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
                .catch(error => log.error(error.message + ` / ${Date.now()}`));
            return isDone;
        }
    }
}
export default namespaceMail;