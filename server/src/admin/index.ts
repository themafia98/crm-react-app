import {Request, Response, Application, NextFunction} from 'express';
import fileUpload from 'express-fileupload';
import { Binary, MongoClient } from 'mongodb';
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
        if (!req.files || !req.body || !req.body.nameFile) return void errorSender(res, 404);
        const files = req.files.upload.data;
        Database.saveFile({fileName: <string>req.body.nameFile, binary: new Binary(files)})
        .then(response => {
            if (response) res.sendStatus(200);
            else return void errorSender(res,404);
        })
        .catch(err => void errorSender(res,403));
    });

    app.get('/admin/api/download',(req:RequestParam, res:Response) => {
        // if (!req.body || !req.body.nameFile) return void errorSender(res, 404);
        // const { nameFile } = req.body;
        res.setHeader('Content-disposition', 'attachment; filename=' + 'uploadFile');
        const nameFile = 'uploadFile'; /**  @file for test */
        if (nameFile){
            Database.getFile(nameFile)
            .then(response => {
                if (response['status']) {
                    const buffFile:Buffer = response['fileArray'][0]['file']; 
                    const stream = fs.createWriteStream('binaryFile');
                    stream.on('open', () => {
                        console.log(buffFile);
                        stream.write(buffFile);
                    }).on('end', () => {
                        stream.end();
                        let read = fs.createReadStream('binaryFile');
                        read.pipe(res);
                    });
                }
                else return void errorSender(res, 404);
            });
        } else return void errorSender(res, 403);
    });
};

    // app.get('/admin/api/download',(req:any, res:any) => {


        
    //     // MongoClient.connect(process.env.MONGO_DB_CONNECT, { useNewUrlParser: true}, (err, client) => {
    //     //     if (err) return void errorSender(res, 403);

    //     //     let db = client.db('CrmData');
    //     //     let collection = db.collection('files');
    //     //     collection.find({}).toArray((err, doc) => {
    //     //         if (err) return void errorSender(res, 403);
    //     //         let buffer = doc[0].file.buffer;
    //     //         fs.writeFileSync(__dirname + '/upload.xlsx', buffer);
    //     //     });
    //     //     client.close();
    //     //     res.sendStatus(200);
    //     // });
    // });

