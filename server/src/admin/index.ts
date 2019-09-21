import express,{Request, Response, Application} from 'express';
import multer from 'multer';

export default (app:Application, corsPublic?:Object):void|Function => { 

    const upload = multer(); // form-data

    app.get('/', (req:Request, res:Response) => {
        res.sendStatus(403);
    });

    app.get('/admin', (req:Request, res:Response) => {
        res.render('index');
     });

    app.post('/admin/api/login',upload.none(), (req:Request, res:Response) => {
        console.log(req.body);
        res.sendStatus(200);
    });
 
     app.get('/admin/login', (req:Request, res:Response) => {
         res.send(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <title>Admin panel</title>
          </head>
          <body>
          <h1 style = 'text-align: center;'>Admin  login</h1>
          <a  style = 'display: block; text-align: center;' href = '/admin'>Go back</a>
          </body>
         `);
     })
};

