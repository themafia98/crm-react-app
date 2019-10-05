import bcrypt from 'bcrypt';
import AppNamespace from '../app';
import {log} from '../logger/logModule';

namespace Security {

    const app = AppNamespace.app;

    export const checkToken = async (password:string|number, name:string|number):Promise<boolean> => {
       try {
            const match = await bcrypt.compare(password, app.locals.token);
            if (match) {
                return bcrypt.compare(name, app.locals.tokenName)
                    .then(match_1 => {
                        if (match_1)
                            return true;
                        else
                            throw Error('Access error password');
                    })
                    .catch(error => void log.error(error.message + ` / ${Date.now()}`));
            }
            else
                throw Error('Access error password');
        }
        catch (error_1) {
            return void log.error(error_1.message + ` / ${Date.now()}`);
        }
    };

    export const createCryptPassword = async (password:string|number):Promise<object> => {

        let isSave:boolean = false;
        let encryptedSave:string|null = null;

        await bcrypt.genSalt(10).then(async salt => {
            try {
                const hash = await bcrypt.hash(password, salt);
                isSave = true;
                encryptedSave = hash;
            }
            catch (error) {
                return log.error(error.message + ` / ${Date.now()}`);
            }
        })
        .catch(error => log.error(error.message + ` / ${Date.now()}`));

        let result:{isSave:boolean, encrypted:string|null} = {
            isSave: isSave,
            encrypted: encryptedSave,
        };
        return result;
    };


    export async function create(tokenPassword:string, tokenUser:string):Promise<boolean> {
       await Security.createCryptPassword(tokenPassword)
        .then(async token => {
          if (token['isSave'])
            app.locals.token = token['encrypted'];
          else app.locals.token = null;
          try {
                const token_1 = await Security.createCryptPassword(tokenUser);
                console.log(token_1);
                if (token_1['isSave'])
                    app.locals.tokenName = token_1['encrypted'];
                else
                    app.locals.tokenName = null;
            }
            catch (error) {
                return log.error(error.message + ` / ${Date.now()}`);
            }
        }).catch((error: { message: string; }) => log.error(error.message + ` / ${Date.now()}`));

        return true;
    };

}
export default Security;