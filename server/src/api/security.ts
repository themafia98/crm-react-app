import bcrypt from 'bcrypt';
import {log} from '../logger/logModule';

namespace security {

    export const crypt = async (password:string):Promise<boolean> => {
        let result = false;
        await bcrypt.genSalt(10, (error:Error, salt:string|number) => {
            if (error) return log.error(error.message + ` / ${Date.now()}`);
            bcrypt.hash(password, salt, (error:Error, encrypted:string) => {
                if (error) return log.error(error.message + ` / ${Date.now()}`);
                if (encrypted === password) result = true;
            });
        });
        return result;
    };

    export const createCryptPassword = async (password:string|number):Promise<boolean> => {
        let isSave = false;
        await bcrypt.genSalt(10, (error:Error, salt:string|number) => {
            if (error) return log.error(error.message + ` / ${Date.now()}`);
            bcrypt.hash(password, salt, (error:Error, encrypted:string) => {
                if (error) return log.error(error.message + ` / ${Date.now()}`);
                isSave = true;
            });
        });
        return isSave;
    }

}
export default security;