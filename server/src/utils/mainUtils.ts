import {FORBIDDEN, NOTFOUND, SERVERERROR, BADREQUEST, AUNAUTHORIZED, SERVICEUNAVAILABLE} from './const';
import {Response} from 'express';

export function errorSender(res:Response, status:number, message?:string):Response{
    return res.status(status).send(`${getError(status)}. ${message ? message : ''}`);
};

export function getError(error:number):string|void{
    if (error === 401) return AUNAUTHORIZED;
    else if (error === 403 ) return FORBIDDEN;
    else if (error === 404) return NOTFOUND;
    else if (error === 500) return SERVERERROR;
    else if (error === 503) return SERVICEUNAVAILABLE;
    else return BADREQUEST;
};
