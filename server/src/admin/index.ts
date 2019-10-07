import {Request, Response, Application, NextFunction} from 'express';
import fileUpload from 'express-fileupload';
import { Binary } from 'mongodb';
import fs, {ReadStream} from 'fs';
import path from 'path';
import {RequestParam} from '../configCode/interface';
import {errorSender} from '../utils/mainUtils';
import Database from '../api/DataBase';
import multer from 'multer';
import dotenv from 'dotenv';
import _ from 'lodash';

import {log} from '../logger/logModule';


export default (app:Application, corsPublic?:Object):void|Function => { 

    const upload = multer(); // form-data
    dotenv.config();
    
    app.get('/admin', (req:RequestParam, res:Response) => {
        console.log(process.env.NODE_ENV);
       if (req.cookies['sid'] && req['session'] && req['session'].login){
            return res.redirect('/admin/cabinet');
        }
        else return res.render('index', {process: process.env.NODE_ENV});
     });

     
    app.post('/admin/api/login',upload.none(), (req:RequestParam, res:Response) => {
        if (req.body.login && req.body.password){
            let currentUser = null;
            Database.getUser(req.body.login, req.body.password)
            .then(user => { 
                if (user){
                    req['session'].login = user.login;
                    return res.redirect(200, '/admin/cabinet');
                } else return void errorSender(res, 403);
            });
        }  else return void errorSender(res, 403);
    });

     app.use('/admin',(req:Request, res:Response, next:NextFunction) => {
        if (req['session'].login && req.cookies['sid']){
            next();
        } else return res.redirect('/admin');
    });

     app.get('/admin/cabinet',(req:RequestParam, res:Response):void => {
        if (req['session'].login) return void res.render('cabinet', {process: process.env.NODE_ENV});
        else return void res.redirect('/admin');
     });

    app.get('/admin/api/logout', (req:Request, res:Response) => {
        if (req['session']){
            req['session'].destroy((error:Error) => { 
                    if (error) {
                        log.error(error);
                        console.log(error);
                    }
            });
            res.clearCookie('sid');
            res.setHeader("Content-Type", "text/html");
            return res.redirect(200, '/admin');
        }  else return void errorSender(res, 403);
    });

    app.param('type', (req:RequestParam, res:Response, next: NextFunction, type:string):void => {
        req.type = type;
        next();
      });

    app.get('/admin/api/services/:type',(req:RequestParam, res:Response) => {
        let service:null|ReadStream = null;
    
          if (!req.type){ return void errorSender(res, 404); };

          if (req.type === 'auto')
          service = fs.createReadStream(path.join(__dirname, '../data','autoAbout.txt'));
          else if (req.type === 'amoCRM')
          service = fs.createReadStream(path.join(__dirname, '../data','amoCRMAbout.txt'));
          else if (req.type === 'retailCRM')
          service = fs.createReadStream(path.join(__dirname, '../data','retailCRMAbout.txt'));
          else  return void errorSender(res, 404);
    
          service.on('open', () => {
            res.setHeader('Content-Type','text/html; charset=utf-8');
            service.pipe(res)
          });

          service.on('error', (error:Error) => {
            log.error(error.message);
            errorSender(res, 404);
          });

      });

    app.post('/admin/api/list',(req:Request, res:Response) => {
       if (!_.isEmpty(req.body.path)){
           if (req.body.path === '/services'){
               return res.send(JSON.stringify({list: ['auto', 'amoCRM', 'retailCRM']}));
           };
       } else return void errorSender(res, 404);
    });


    app.use(fileUpload());
    app.post('/admin/api/upload',(req:any, res:any) => {
        if (!req.files || !req.body || !req.body.nameFile || !req.body.format) return void errorSender(res, 404);
        const files = req.files.upload.data;
        Database.saveFile({fileName: <string>req.body.nameFile,format: <string>req.body.format, binary: new Binary(files)})
        .then(response => {
            if (response) res.sendStatus(200);
            else return void errorSender(res,404);
        })
        .catch(err => void errorSender(res,403));
    });

    app.post('/admin/api/download',(req:RequestParam, res:Response) => {
        const { nameFile } = req.body;
        //const nameFile = 'uploadFile'; /**  @file for test */
        if (!req.body || !nameFile) return void errorSender(res, 404);

        if (nameFile){
            Database.getFile(nameFile, 'xlsx' /** @param for format, for test @param = xlsx (excel) */)
            .then(response => {
                if (response['status']) {
                    const format = response['format'];
                    // res.setHeader('Content-disposition', `attachment; filename="uploadFile.${format}"`);
                    const buffFile:Buffer|Array<Object> =  response['fileArray'].length === 1 ? 
                                            response['fileArray'][0]['file'] : null;
                    let arrayFiles:Array<Object>|null = null;

                    if (!buffFile){
                        arrayFiles = response['fileArray'].map(fileObg => {
                            return {name: fileObg.name, file: fileObg.file};
                        });
                        return void res.json({format: format, list: arrayFiles});
                    } else return void res.json({format: format, list: arrayFiles});

                }
                else return void errorSender(res, 404);
            });
        } else return void errorSender(res, 403);
    });

    app.param('typeCard', (req:RequestParam, res:Response, next:NextFunction, typeCard:string) =>{
        req.type = typeCard;
        next();
    });
    app.get('/admin/api/services/cardsList/:typeCard',(req:RequestParam, res:Response) => {
        if (!req.type) return void errorSender(res,403);

        Database.getCards(req['type'])
        .then(list => {
            if (list && list.length > 0){
              return res.json(list);
            } else return void errorSender(res, 404);
        })
          .catch(err =>  { log.error(err); return void errorSender(res, 404); });
    });
};


