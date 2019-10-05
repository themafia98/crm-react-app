import nodemailer,{SendMailOptions, Transporter} from 'nodemailer';
import Security from './security';
import AppNamespace from '../app';
import namespaceLogger from '../logger/logger';
import {Send} from '../configCode/interface';
import {transOptions} from '../configCode/types';

namespace MailNamespace {

    const log = namespaceLogger.loggerError();
    const eventEmitter = AppNamespace.eventEmitter;

    abstract class MailTransporter {
        private transporter:Transporter;

        constructor(transOptions:transOptions){
            Security.checkToken(process.env.TOKEN_YANDEX_PASSWORD, process.env.TOKEN_YANDEX_USER)
            .then(res => {
                if (res){
                    this.transporter = nodemailer.createTransport(transOptions);
                    this.transporter.verify()
                    .then(res => {
                        if (res) {
                        console.log("Server is ready to take messages");
                        eventEmitter.emit('EventSetTransporter');
                        } else throw new Error('Server error to take messages');
                    })
                    .catch(error => {
                        log.error(error.message + ` / ${Date.now()}`);
                    });
            }
            })
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
            eventEmitter.on('EventSetTransporter', () => {
                this.hosting = super.getTransporter();
            });
        }

        createMailOptions(from:string,name:string, number:string, 
                            to:string, subject:string):void{
            Security.checkToken(process.env.TOKEN_YANDEX_PASSWORD, to)
            .then(res => {
                if (res){
                    this.mailOptions = {
                        from: to, /**  sender addres @to for yandex @from for gmail */
                        to: to, // list of receivers
                        subject: subject, // Subject line
                        html:`
                        <h3>Запрос на консультацию</h3>
                        <p>Имя:${name}</p>
                        <p>E-mail клиента: ${from}</p>
                        <p>Номер клиента: ${number}</p>
                        `
                    };
                } else throw new Error ('Access error');
            })
            .catch(error => void log.error(error.message + ` / ${Date.now()}`));
        }

        createFeedBackMailOptions(from:string,name:string,
                                  text:string, number:string, 
                                  to:string, subject:string):void{
        
            Security.checkToken(process.env.TOKEN_YANDEX_PASSWORD, to)
            .then(res => {
                if (res){
                    this.mailOptions = {
                        from: to, /**  sender addres @to for yandex @from for gmail */
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
                } else throw new Error ('Access error');
            }).catch(error => void log.error(error.message + ` / ${Date.now()}`));
        }

        getMailOptions():SendMailOptions{
            return this.mailOptions;
        }

        async sendMail():Promise<boolean>{
            let isDone = false;
            const self = this;
            return Security.checkToken(process.env.TOKEN_YANDEX_PASSWORD, process.env.TOKEN_YANDEX_USER)
            .then(async res => {
                if (res && self.hosting) {
                    try {
                        const semdRes = await self.hosting.sendMail(self.getMailOptions());
                        if (/OK/ig.test(semdRes.response))
                            return isDone = true;
                        else
                            return isDone = false;
                    }
                    catch (error) {
                        return log.error(error.message + ` / ${Date.now()}`);
                    }
                }
            })
            .catch(error => void log.error(error.message + ` / ${Date.now()}`));
        }
    }
}
export default MailNamespace;