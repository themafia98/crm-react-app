(function(){

    let formLogin = document.querySelector('.loginForm');
    let logout = document.querySelector('.logout');

    if (formLogin)
    formLogin.addEventListener('submit', event => {
        event.preventDefault();

        new Promise((resolve, reject) => {
            let AJAX = new XMLHttpRequest();
            AJAX.open('POST', "/admin/api/login");

            AJAX.onload = function(){
                if (this.status === 200)
                    resolve(this.response);
                else {
                    let error = new Error(this.statusText);
                    reject(error);
                }       
            };
            
            AJAX.onerror = () => reject(new Error('Requst send error'));
            AJAX.send(new FormData(document.forms.loginForm));

        })
        .then(res => {
            res = res.split(' ');
            if (res && !/OK/.test(res[0]) && res[res.length-1].test(/admin\/cabinet/i)) 
            throw new Error('Error redirect')
            else return  location.replace(res[res.length-1]);
        })
        .catch(error => console.error(error));
    }, false);

    if (logout)
    logout.addEventListener('click', event => {
        event.preventDefault();

        new Promise((resolve, reject) => {
            const LOGOUT_REQUEST = new XMLHttpRequest();
            LOGOUT_REQUEST.open('GET', "/admin/api/logout");
            LOGOUT_REQUEST.onload = function(){
                if (this.status === 200)
                resolve(this.response);
                else {
                    let error = new Error(this.statusText);
                    reject(error);
                }       
            };
            LOGOUT_REQUEST.onerror = () => reject(new Error('Requst send error'));
            LOGOUT_REQUEST.send();
        })
        .then(res => {
            res = res.split(' ');
            debugger;
            if (res && !/OK/.test(res[0]) && res[res.length-1].test(/admin/ig)) 
            throw new Error('Error redirect')
            else return location.replace(res[res.length-1]);
        })
        .catch(error => console.error(error));
    }, false);
})();