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

    function linkPathActive(link){
        try {
            link.classList.toggle('active_link');
        }
        catch(error){
            console.error(error.message);
        }
    }

    function buildMenu(){

        let node = document.createElement('div');
        node.classList.add('col');

        let main = document.createElement('a');
        main.classList.add('cabinetAction__link');
        main.setAttribute('data-type', 'main');
        main.href = '#test';
        main.innerHTML = 'Main';

        if (location.hash === '') linkPathActive(main);

        node.appendChild(main);
        return node;
    };

    function buildMain(view){
        if (!view.root) {
            let app = root.querySelector('.cabinet');
            let root = root.createElement('div');
            root.classList.add('cabinetAction');
            app.appendChild(root);
            view.root = root.querySelector('.cabinetAction');
        }

        view.root.appendChild(buildMenu());
    };

    function controllerMenuBuild(){

    };

    function viewBuild(viewObj, controller){
        let view = viewObj;
        return (path) => {
            view.setPath(path);
            if (path === '/') return buildMain(view);
        };
    };

    function controllersBuild(controllerObj){
        let controller = controllerObj;
        return () => {
            controller.setListeners('router', window || globalThis, 'hashchange', (event) => {
                let path = location.hash;

                if (history && history.pushState)
                if (!/\#/.event.newURL.test(event.newURL))
                    history.pushState('', document.title, window.location.pathname + path);
                else history.pushState('', document.title, window.location.pathname);
            });

            if (!controller.isMenu()){
                controllerMenuBuild();
                controller.setMenu(true);
            };

        };
    }

    function main(){
        viewBuild(view, controller)('/');
        controllersBuild(controller)('');
    };

    let init = () => {
        controller = new Controller(document);
        view = new View(controller.root);
        main();
    };

    init();
})();