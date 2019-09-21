(() => {
    let formLogin = document.querySelector('.loginForm');

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

        }).catch(error => console.error(error));
    });
})();