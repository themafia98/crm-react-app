import AppNamespace from '../app';
const {app} = AppNamespace;
export default {
    origin: function (origin:string, callback:(error:object, result?:boolean) => void) {
        if (app.locals.frontend.origin === origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    methods: ['GET', 'POST'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};