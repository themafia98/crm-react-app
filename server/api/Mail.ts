namespace NameSpaceMailer {

   export class MailHosting  {
    
        private nodemailder:object;
        private name:string;
        private password:string;
        private transporter:object;

        constructor(nodemailder:object, env:object){
            this.nodemailder = nodemailder;
            this.name = env.GMAIL_USER;
            this.password = env.GMAIL_PASSWORD;
        }
    
        getMailder():object{
            return this.nodemailder;
        }

        getMailUser():string{
            return this.name;
        }

        getPassword():string{
            return this.password;
        }

        createSender():object{
            return new Sender(this.getMailder(), this.getMailUser(), this.getPassword());
        }

        createTransporter():void{
            this.transporter = this.getMailder()
                .createTransport({
                    service: 'gmail',
                    auth: {
                        user: this.getMailUser(),
                        pass: this.getPassword()
                    }
               });

            return this.transporter;
        }
    }

    class Sender {


        private hosting:object;
        private name:string;
        private password:string;
        private transporter:object;


        constructor(hosting:MailHosting, name, pass){
            this.hosting = hosting;
            this.name = name;
            this.password = pass;
        }

        getHosting():object{
            console.log(this.hosting);
            return this.hosting;
        }

        sendMail():void{
            const name = this.name;
            console.log(name);
            console.log(typeof name);
            const pass = this.password;
           const  mailOptions = {
                from:  name, // sender address
                to:  name, // list of receivers
                subject: 'Subject of your email', // Subject line
                html: '<p>Your html here</p>'// plain text body
              };
            this.hosting.createTransport({
                service: 'Gmail',
            auth: {
                user: name,
                pass: pass
            }
            })
                .sendMail(mailOptions, function (err, info) {
                    if(err)
                    console.log(err)
                    else
                    console.log(info);
                });
        }
    }
}

export {};
module.exports = NameSpaceMailer;