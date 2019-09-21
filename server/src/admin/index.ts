import express,{Request, Response, Application} from 'express';
import {errorSender} from '../utils/mainUtils';
import AppNamespace from '../app';
import multer from 'multer';

export default (app:Application, corsPublic?:Object):void|Function => { 

    const upload = multer(); // form-data

    app.get('/', (req:Request, res:Response) => {
        console.log(req.cookies);
        res.sendStatus(403);
    });

    app.get('/admin', (req:Request, res:Response) => {
        console.log(req.cookies);
        res.render('index');
     });

     app.get('/admin/cabinet',(req:Request, res:Response):void => {
         const currentUser = AppNamespace.getUsers()
            .find(user => user.login === req['session'].login && 
                        user.password === req['session'].password);
        if (currentUser) return void res.render('cabinet');
        else return void errorSender(res, 403);
     });

    app.post('/admin/api/login',upload.none(), (req:Request, res:Response) => {
        console.log(req.body);
        if (req.body.login && req.body.password){
            const currentUser = AppNamespace.getUsers()
            .find(user => user.login === req.body.login && user.password === req.body.password);
            console.log(currentUser);
            if (<number|{login:string, password:string}>currentUser){
                res.setHeader("Content-Type", "text/html");
                req['session'].login = currentUser.login;
                req['session'].password = currentUser.password;
                return res.redirect(200, '/admin/cabinet');
            }
            else return void errorSender(res, 403);
        } else return void errorSender(res, 403);
    });
};

