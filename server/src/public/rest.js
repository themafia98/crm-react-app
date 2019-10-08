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

export const getCardsList = async (type) => {
    return new Promise(function(resolve, reject){
        let AJAX = new XMLHttpRequest();
        AJAX.open('GET', `/admin/api/services/cardsList${type}`);
        AJAX.setRequestHeader('Content-Type', "application/json");
        AJAX.onload = function(){
            if (this.status === 200){
                
                resolve(JSON.parse(this.response));
            }
            else {
                let error = new Error(this.statusText);
                reject(error);
            }       
        };
        
        AJAX.onerror = () => reject(new Error('Requst send error'));
        AJAX.send();
    })
    .catch(error => console.error(error));
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

export const putCard = async(item, formData, nodeWrapper, callback) =>{
    return new Promise(function(resolve, reject){
        let AJAX = new XMLHttpRequest();
        AJAX.open('PUT', "/admin/api/putCard");
        AJAX.onload = function(){
            if (this.status === 200){
                if (nodeWrapper) callback(nodeWrapper, item);
                resolve(this.status);
            }
            else {
                let error = new Error(this.statusText);
                reject(error);
            }       
        };
        
        AJAX.onerror = () => reject(new Error('Requst send error'));
        AJAX.send(formData);
    });
};

export const deleteCard = async(cardId, node) =>{
    return await new Promise(function(resolve, reject){
        let AJAX = new XMLHttpRequest();
        AJAX.open('DELETE', "/admin/api/deleteCard");
        AJAX.setRequestHeader('Content-Type', "application/json");
        AJAX.onload = function(){
            if (this.status === 200){
                if (node) node.remove();
                resolve(this.status);
            }
            else {
                let error = new Error(this.statusText);
                reject(error);
            }       
        };
        
        AJAX.onerror = () => reject(new Error('Requst send error'));
        AJAX.send(JSON.stringify(cardId));
    });
};
