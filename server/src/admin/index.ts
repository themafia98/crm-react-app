import {Request, Response, Application, NextFunction} from 'express';
import {RequestParam} from '../configs/interface';
import {errorSender} from '../utils/mainUtils';
import Database from '../api/DataBase';
import multer from 'multer';

export default (app:Application, corsPublic?:Object):void|Function => { 

    const upload = multer(); // form-data

    app.get('/admin', (req:RequestParam, res:Response) => {
       if (req.cookies['sid'] && req['session'] && req['session'].login){
            return res.redirect('/admin/cabinet');
        }
        else return res.render('index');
     });

     
    app.post('/admin/api/login',upload.none(), (req:RequestParam, res:Response) => {
        if (req.body.login && req.body.password){
            let currentUser = null;
            Database.getUser(req.body.login, req.body.password)
            .then(user => { 
                if (user){
                    res.setHeader("Content-Type", "text/html");
                    req['session'].login = user.login;
                    return res.redirect(200, '/admin/cabinet');
                }  else return void errorSender(res, 403);
            });
        }  else return void errorSender(res, 403);
    });

     app.use((req:Request, res:Response, next:NextFunction) => {
        if (req['session'].login && req.cookies['sid']){
            next();
        } else return res.redirect('/admin');
    });

     app.get('/admin/cabinet',(req:RequestParam, res:Response):void => {
        Database.getUser(req['session'].login)
        .then(user => {
            console.log(user);
            if (user) return void res.render('cabinet');
            else return void res.redirect('/admin');
        });
     });

    app.get('/admin/api/logout', (req:Request, res:Response) => {
        res.clearCookie('sid');
        res.setHeader("Content-Type", "text/html");
        return res.redirect(200, '/admin');
    });

};

