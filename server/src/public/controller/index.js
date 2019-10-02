import State from '../store/state.js';
import namespace from '../store/namespace.js';
import {viewBuild} from '../cabinet.js';

function Controller(doc){
    this.root = doc;
    this.connectionView = null;
    this.onceMenu = null;
    this.countOnceMenuEvents = 0;
    this.listenersList = [];
};

Controller.prototype.setConnectView = function(view){
    this.connectionView = view;
};

Controller.prototype.setListeners = function(id, target, event, callback, bubble = false, mode = false){
    if (mode === 'once' && this.countOnceMenuEvents > 0) return false;
    target.addEventListener(event, callback, bubble);
   return this.listenersList.push({
        id: id,
        target: target,
        callback: callback,
        bubble: bubble,
        event: event,
        mode: mode,
    });
};

Controller.prototype.isMenu = function(){
    if (!this.onceMenu) return false;
    else return true;
};

Controller.prototype.setMenu = function(action){
    this.onceMenu = action;
};

Controller.prototype.removeListeners = function(id = 'full', mode = false){
    if (typeof name !== 'string') return null;
    this.listenersList = this.listenersList.map (item => {
        let isDelete = false;
        if (item.mode === 'once' || item.id === 'router') return item;
        if (id !== 'full' && item.id === id){
            isDelete = true;
            item.target.removeEventListener(
                item.event, item.callback, item.bubble
            );
        }
        else if (id === 'full'){
            item.target.removeEventListener(
                item.event, item.callback, item.bubble
            );
        }
        if (!isDelete) return item;
    });

    this.listenersList = this.listenersList.filter(item => item !== undefined);
};

Controller.prototype.getListener = function(id){
    ;
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

Controller.createLinks = function(listArray, list, mode = false){
   const { view, state, controller, controller: { root } } = namespace;
   ;
    listArray.forEach((item,i) => {
        let menuItem = root.createElement('li');
        let path = '/' + item;

       if (view.getPathContext() === path){
           menuItem.classList.add('isSelect');
       }
        menuItem.innerHTML = item;

        if (controller.getListener(i))
        controller.removeListeners(i);

        controller.setListeners(i, menuItem, 'click',
        function(event){
            const target = event.target;
 
            view.setContentPath(event.target.innerHTML);
            viewBuild(view, controller)(state.getState().path, 
            target.dataset.mode !== 'nav');
        }, false);
        list.appendChild(menuItem);
    });
};

Controller.controllersBuild = function(controllerObj){
    const controller = controllerObj;
    const view = controller.connectionView;
    return () => {
        controller.setListeners('router', window || globalThis, 'hashchange', (event) => {
            if (view && event.newURL !== event.oldURL){
                viewBuild(view, controller)(namespace.state.action('SET_PATH'));
            };
        });
        if (!controller.isMenu()){
            controller.setMenu(true);
        };

    };
};


export default Controller;