export const getDataServices = async (path) => {
    if (path == '/') {
        view.setDefaultContentPath();
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

export const getDataAbout = async () => {
    const getAboutMe = async () => {
            return new Promise(function(resolve, reject){
            let AJAX = new XMLHttpRequest();
            AJAX.open('GET', `/admin/api/about/aboutMe`);
            AJAX.setRequestHeader('Content-Type', "application/json");
            AJAX.onload = function(){
                if (this.status === 200){
                    resolve(this.response);
                }
                else {
                    let error = new Error(this.statusText);
                    reject(error);
                }       
            };
            
            AJAX.onerror = () => reject(new Error('Requst send error'));
            AJAX.send();
        });
    };

    return new Promise(async function(resolve, reject){
        let AJAX = new XMLHttpRequest();
        AJAX.open('GET', `/admin/api/about/main`);
        AJAX.setRequestHeader('Content-Type', "application/json");
        AJAX.onload = async function(){
            if (this.status === 200){
                const aboutMeData = await getAboutMe();
                resolve({main: this.response, aboutMe: aboutMeData});
            }
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


export const editContent = async (content, type, api = `/admin/api/edit/services`) => {
    return new Promise(function(resolve, reject){
        let AJAX = new XMLHttpRequest();

        if (api === '/admin/api/edit/services') AJAX.open('POST', `${api}${type}`);
        else AJAX.open('POST', `${api}`);
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
        AJAX.send(JSON.stringify({content: content}));
    });
};

export const putCard = async(item = {}, formData, nodeWrapper, callback) =>{
    return new Promise(function(resolve, reject){
        let AJAX = new XMLHttpRequest();
        AJAX.open('PUT', "/admin/api/putCard");
        AJAX.onload = function(){
            if (this.status === 200){
                if (nodeWrapper && callback) callback(nodeWrapper, JSON.parse(this.response));
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

export const editCard = async(item = {}, formData, nodeWrapper, callback) =>{
    return new Promise(function(resolve, reject){
        let AJAX = new XMLHttpRequest();
        AJAX.open('POST', "/admin/api/editCard");
        AJAX.onload = function(){
            if (this.status === 200){
                
                if (nodeWrapper && callback) callback(nodeWrapper, JSON.parse(this.response));
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
