import State from '../store/state.js';
import namespace from '../store/namespace.js';
import {viewBuild} from '../cabinet.js';

function Controller(doc){
    this.root = doc;
    this.connectionView = null;
    this.onceMenu = null;
    this.listenersList = [];
};

Controller.prototype.setConnectView = function(view){
    this.connectionView = view;
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

Controller.createLinks = function(listArray, list){
   const { view, controller, controller: { root } } = namespace;
    listArray.forEach((item,i) => {
        let menuItem = root.createElement('li');
        let path = '/' + item;

       if (view.getPathContext() === path){
           menuItem.classList.add('isSelect');
       }
        menuItem.innerHTML = item;
        controller.setListeners(i, menuItem, 'click',
        function(event){
            view.setContentPath(event.target.innerHTML);
            viewBuild(view, controller)(view.path);
        }, false);
        list.appendChild(menuItem);
    });
};

Controller.controllersBuild = function(controllerObj){
    const controller = controllerObj;
    const view = controller.connectionView;
    return () => {
        controller.setListeners('router', window || globalThis, 'hashchange', (event) => {
            ;
            if (view && event.newURL !== event.oldURL){
                viewBuild(view, controller)(State.locationReplacePath());
            }
        });

        if (!controller.isMenu()){
            controller.setMenu(true);
        };

    };
};


export default Controller;