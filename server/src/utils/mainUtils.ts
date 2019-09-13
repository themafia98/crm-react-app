import {FORBIDDEN, NOTFOUND, SERVERERROR, BADREQUEST} from './const';
import {Response} from './node_modules/express';

export function errorSender(res:Response, status:number, message?:string):Response{
    return res.status(status).send(`${getError(status)}. ${message ? message : ''}`);
};

export function getError(error:number):string|void{
    if (error === 400) return BADREQUEST;
    else if (error === 403 ) return FORBIDDEN;
    else if (error === 404) return NOTFOUND;
    else if (error === 500) return SERVERERROR;
};
