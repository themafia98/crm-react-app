export const getDataServices = async (path) => {
    if (path == '/') {
        view.setDeaultContetPath();
        path = view.getPathContext();
    }
    return new Promise(function(resolve, reject){
        let AJAX = new XMLHttpRequest();
        AJAX.open('GET', `/admin/api/services${path}`);
        AJAX.setRequestHeader('Content-Type', "application/json");
        AJAX.onload = function(){
            if (this.status === 200)
                resolve(this.response);
            else {
                let error = new Error(this.statusText);
                reject(error);
            }       
        };
        
        AJAX.onerror = () => reject(new Error('Requst send error'));
        AJAX.send();
    });
};

export const getMenu = async (path) => {
    return new Promise(function(resolve, reject){
        let AJAX = new XMLHttpRequest();
        AJAX.open('POST', "/admin/api/list");
        AJAX.setRequestHeader('Content-Type', "application/json");
        AJAX.onload = function(){
            if (this.status === 200)
                resolve(JSON.parse(this.response));
            else {
                let error = new Error(this.statusText);
                reject(error);
            }       
        };
        
        AJAX.onerror = () => reject(new Error('Requst send error'));
        AJAX.send(JSON.stringify({path: path}));
    });
};