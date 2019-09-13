import {Response, Request, NextFunction, Application} from 'express';
import {RequestParam} from '../configs/interface';
import fs from 'fs';
import path from 'path';

import {log} from '../logger/logModule';
import {errorSender} from '../Utils/mainUtils';

export default (app:Application) => {

    app.param('priceType', (req:RequestParam, res:Response, next:NextFunction, priceType:string):void => {
        req.priceType = priceType;
        next(priceType);
    });

    app.post('price/:priceType', (req:RequestParam, res:Response):void => {

        const {priceType} = req;
        let pipe = null;

        if (typeof priceType === 'string'){
            if (priceType === 'CardsAuto'){
                pipe = fs.createReadStream(path.join(__dirname, '../', 'CardsAuto.txt'));
            } else if (priceType === 'CardsAmoCRM'){
                pipe = fs.createReadStream(path.join(__dirname, '../', 'CardsAmoCRM.txt'));
            } else if (priceType === 'CardsRetailCRM'){
                pipe = fs.createReadStream(path.join(__dirname, '../', 'CardsRetailCRM.txt'));
            }

            pipe.on('open', () => {
                res.setHeader('Content-Type','text/html; charset=utf-8');
                pipe.pipe(res);
            });

            pipe.on('error', (error:Error) =>{
                log.error(error.message);
                errorSender(res, 404);
            });
        }
        else return void errorSender(res, 404);
    });

};
