const nodemailder = require('nodemailer');


class Mail {
    constructor(private nodemailder:object){}

    getMailder():object{
        return this.nodemailder;
    }
}


export {};
module.exports = Mail;