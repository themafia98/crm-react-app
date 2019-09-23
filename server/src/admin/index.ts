import {Request, Response, Application, NextFunction} from 'express';
import {RequestParam} from '../configs/interface';
import {errorSender} from '../utils/mainUtils';
import AppNamespace from '../app';
import multer from 'multer';

export default (app:Application, corsPublic?:Object):void|Function => { 

    const upload = multer(); // form-data

    app.get('/admin', (req:RequestParam, res:Response) => {
       if (req.cookies['sid'] && req['session'].login){
            return res.redirect('/admin/cabinet');
        }
        else return res.render('index');
     });

     
    app.post('/admin/api/login',upload.none(), (req:RequestParam, res:Response) => {
        if (req.body.login && req.body.password){
            const currentUser = AppNamespace.getUsers()
            .find(user => user.login === req.body.login && user.password === req.body.password);
            console.log(currentUser);
            if (<number|{login:string, password:string}>currentUser){
                res.setHeader("Content-Type", "text/html");
                req['session'].login = currentUser.login;
                return res.redirect(200, '/admin/cabinet');
            }
            else return void errorSender(res, 403);
        } else return void errorSender(res, 403);
    });

     app.use((req:Request, res:Response, next:NextFunction) => {
        if (req['session'].login && req.cookies['sid']){
            next();
        } else return res.redirect('/admin');
    });

     app.get('/admin/cabinet',(req:RequestParam, res:Response):void => {
        const currentUser = AppNamespace.getUsers()
            .find(user => user.login === req['session'].login);
            if (currentUser) return void res.render('cabinet');
            else return void res.redirect('/admin');
     });

    app.get('/admin/api/logout', (req:Request, res:Response) => {
        res.clearCookie('sid');
        res.setHeader("Content-Type", "text/html");
        return res.redirect(200, '/admin');
    });

};

