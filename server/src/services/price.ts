import {Response, Request, NextFunction, Application} from 'express';
import {RequestParam} from '../configs/interface';
import fs from 'fs';
import path from 'path';

import {errorSender} from '../utils/mainUtils';

export default (app:Application) => {

    app.param('priceType', (req:RequestParam, res:Response, next:NextFunction, priceType:string):void => {
        req.priceType = priceType;
        next(priceType);
    });

    app.post('price/:priceType', (req:RequestParam, res:Response):void => {
        const {priceType} = req;
        if (typeof priceType === 'string'){
            if (priceType === 'CardsAuto'){

            }
            else if (priceType === 'CardsAmoCRM'){

            }
            else if (priceType ===)
        }
        else return void errorSender(res, 404);
    });

};
