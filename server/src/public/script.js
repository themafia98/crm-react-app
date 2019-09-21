(() => {

    let formLogin = document.querySelector('.loginForm');

    if (formLogin)
    formLogin.addEventListener('submit', event => {
        event.preventDefault();

        new Promise((resole, reject) => {
            let AJAX = new XMLHttpRequest();
            AJAX.open('POST', "/admin/api/login");

            AJAX.onload = function(){
                if (this.status === 200)
                    resole(this.response);
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
            else return location.replace(res[res.length-1]);
        })
        .catch(error => console.error(error));
    });
})();