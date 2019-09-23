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
        this.root = doc.querySelector('.cabinetAction') || null;
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

    function buildContent(root){
        let node = root.createElement('div');
        let contentContainer = root.createElement('div');

        node.classList.add('col');

        contentContainer.innerHTML = location.hash;

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
        view.root.appendChild(buildContent(root));
    };

    function controllerMenuBuild(){

    };

    function viewBuild(viewObj, controller){
        let view = viewObj;
        return (path) => {
            view.setPath(path);
            view.clear();
            if (path === '/' || '/main') return buildMain(view, controller.root);
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

    let init = () => {
        controller = new Controller(document);
        view = new View(controller.root);
        main();
    };

    init();

})();