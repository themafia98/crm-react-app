(function(){

    let controller = null;
    let view = null;

    function Controller(doc){
        this.root = doc;
        this.onceMenu = null;
        this.listenersList = [];
    };

    Controller.prototype.setListeners = function(id, target, event, callback, bubble){
        let bubbleEvent = false;
       if (bubble) bubbleEvent = true;
        target.addEventListener(event, callback, bubbleEvent);
       return this.listenersList.push({
            id: id,
            target: target,
            event: event,
        });
    };

    Controller.prototype.isMenu = function(){
        if (!this.onceMenu) return false;
        else return true;
    };

    Controller.prototype.setMenu = function(action){
        this.onceMenu = action;
    };

    Controller.prototype.removeListeners = function(id){
        if (typeof name !== 'string') return null;
        for (let i = 0; i < this.listenersList.length; i++){
            if (this.listenersList[i].id === id){
                this.listenersList[i].target.removeEventListener();
                break;
            }
        };
    };

    Controller.prototype.getListener = function(id){
        if (typeof name !== 'string') return null;
        let listener = null;
        for (let i = 0; i < this.listenersList.length; i++){
            if (this.listenersList[i].id === id){
                listener = this.listenersList[i];
                break;
            }
        }
        return listener;
    };

    function View(doc){
        this.path = '/';
        this.pathContent = '/auto';
        this.root = doc.querySelector('.cabinetAction') || null;
    };

    View.prototype.getPathContet = function(){
        return this.pathContent;
    };

    View.prototype.setDeaultContetPath = function(){
        this.pathContent = '/auto';
    };

    View.prototype.setContentPath = function(path){
        this.pathContent = '/' + path;
    };

    View.prototype.getPath = function(){
        return this.path;
    };

    View.prototype.setPath = function(path){
        this.path = path;
    };

    View.prototype.clear = function(){
        if (this.root) this.root.innerHTML = '';
    };

    function linkPathActive(link){
        try {
            link.classList.toggle('active_link');
        }
        catch(error){
            console.error(error.message);
        }
    };

    function buildMenu(root){

        let node = root.createElement('div');
        let nav = root.createElement('nav');

        node.classList.add('col');

        let main = root.createElement('a');
        main.classList.add('cabinetAction__link');
        main.setAttribute('data-type', 'main');
        main.href = '#/main';
        main.innerHTML = 'Main';

        let services = root.createElement('a');
        services.classList.add('cabinetAction__link');
        services.setAttribute('data-type', 'services');
        services.href = '#/services';
        services.innerHTML = 'Services';

        let about = root.createElement('a');
        about.classList.add('cabinetAction__link');
        about.setAttribute('data-type', 'about');
        about.href = '#/about';
        about.innerHTML = 'About';

        if (location.hash === '#/main') linkPathActive(main);
        if (location.hash === '#/services') linkPathActive(services);
        if (location.hash === '#/about') linkPathActive(about);
        
        nav.appendChild(main); 
        nav.appendChild(about);
        nav.appendChild(services);
       
        node.appendChild(nav);
        return node;
    };

    const createContetMenu = async (path) => {
        let _list = null;
        await getMenu(path)
        .then(response => {
        let listArray = response ? response.list : null;
        let root = controller.root;
        if (path === '/services'){
            let menuContentBlock = root.createElement('div');
            menuContentBlock.classList.add('menuContentBlock');
            let list = root.createElement('ul');
            list.classList.add('listMenu');
    
            if (!listArray) return;
            else {
                listArray.forEach((item,i) => {
                    let menuItem = root.createElement('li');
                    let path = '/' + item;
                    console.log(view.getPathContet());
                   if (view.getPathContet() === path){
                       menuItem.classList.add('isSelect');
                   }
                    menuItem.innerHTML = item;
                    controller.setListeners(i, menuItem, 'click',
                    function(event){
                        debugger
                        view.setContentPath(event.target.innerHTML);
                        viewBuild(view, controller)(view.path);
                    }, false);
                    list.appendChild(menuItem);
                });

                menuContentBlock.appendChild(list);
                _list = menuContentBlock;
                return _list;
            }
        }
        });
        return _list;
    }

    function buildContentMain(root){
        let node = root.createElement('div');
        let contentContainer = root.createElement('div');

        node.classList.add('col');

        contentContainer.innerHTML = location.hash;

        node.appendChild(contentContainer);
        return node;
    };

    function buildContentAbout(root){
        let node = root.createElement('div');
        let contentContainer = root.createElement('div');

        node.classList.add('col');

        contentContainer.innerHTML = location.hash;

        node.appendChild(contentContainer);
        return node;
    };


    const buildContentServices = async (root) =>{
        let node = root.createElement('div');
        let contentContainer = root.createElement('div');

        node.classList.add('col');

        let servicesInformationBlock = root.createElement('div');
        servicesInformationBlock.classList.add('servicesInformationBlock');
        let menu = await createContetMenu(view.getPath());
        let data = await getDataServices(view.getPathContet());

        let textArea = root.createElement('textarea');
        textArea.classList.add('servicesTextArea');
        textArea.innerHTML = data;


        node.appendChild(menu);
        node.appendChild(textArea);
        node.appendChild(contentContainer);
        return node;
    };



    function buildMain(view, root){
        if (!view.root) {
            let app = root.querySelector('.cabinet');
            let root = root.createElement('div');
            root.classList.add('cabinetAction');
            app.appendChild(root);
            view.root = root.querySelector('.cabinetAction');
        }

        view.root.appendChild(buildMenu(root));
        view.root.appendChild(buildContentMain(root));
    };

    function buildAbout(view, root){
        if (!view.root) {
            let app = root.querySelector('.cabinet');
            let root = root.createElement('div');
            root.classList.add('cabinetAction');
            app.appendChild(root);
            view.root = root.querySelector('.cabinetAction');
        }

        view.root.appendChild(buildMenu(root));
        view.root.appendChild(buildContentAbout(root));
    };

    const buildServices =  async (view, root) => {
        if (!view.root) {
            let app = root.querySelector('.cabinet');
            let root = root.createElement('div');
            root.classList.add('cabinetAction');
            app.appendChild(root);
            view.root = root.querySelector('.cabinetAction');
        }
        let contentNode = await buildContentServices(root);
        view.root.appendChild(buildMenu(root));
        view.root.appendChild(contentNode);
    };

    function controllerMenuBuild(){

    };

    function viewBuild(viewObj, controller){
        let view = viewObj;
        return (path) => {
            view.setPath(path);
            view.clear();

            if (path === '/' || path === '/main') 
                return buildMain(view, controller.root);
            else if (path === '/about') 
                return buildAbout(view, controller.root);
            else if (path === '/services') 
                return buildServices(view, controller.root);
            else {
                view.setPath('/');
                buildMain(view, controller.root);
            }
        };
    };

    function locationReplacePath(){
        if (location.hash === "#")
        return location.hash.replace(/#/gi,'/');
        else if (!location.hash){
            location.hash = "#/main";
        return location.hash.replace(/^$/,"/main");
        }
        else if (/\#\//.test(location.hash))
        return location.hash.replace(/\#\//,"/");
    };

    function controllersBuild(controllerObj){
        let controller = controllerObj;
        return () => {
            controller.setListeners('router', window || globalThis, 'hashchange', (event) => {
                if (event.newURL !== event.oldURL){
                    viewBuild(view, controller)(locationReplacePath());
                }
            });

            if (!controller.isMenu()){
                controllerMenuBuild();
                controller.setMenu(true);
            };

        };
    };

    function main(){
        viewBuild(view, controller)(locationReplacePath());
        controllersBuild(controller)('');
    };

    const getDataServices = async (path) => {
        if (path == '/') {
            view.setDeaultContetPath();
            path = view.getPathContet();
        }
        return new Promise(function(resolve, reject){
            let AJAX = new XMLHttpRequest();
            debugger;
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

    const getMenu = async (path) => {
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
    }

    let init = (document) => {
        controller = new Controller(document);
        view = new View(controller.root);
        main();
    };

    init(document);

})();