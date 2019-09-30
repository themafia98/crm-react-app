import Controller from './controller/index.js';
import namespace from './store/namespace.js';
import State from './store/state.js';
import View from './view/index.js';
    
    function viewBuild(state, newView, newController){
        let view = namespace.view || newView;
        let controller = namespace.controller || newController;
        return (path) => {
            view.setPath(path);
            view.clear();

            if (path === '/' || path === '/main') 
                return  View.buildMain(view, controller.root);
            else if (path === '/about') 
                return  View.buildAbout(view, controller.root);
            else if (path === '/services') 
                return  View.buildServices(view, controller.root);
            else {
                state.action('SET_PATH');
                View.buildMain(view, controller.root);
            }
        };
    };

    function main(){
        let view = namespace.view;
        let controller = namespace.controller;
        viewBuild(namespace.state)(State.locationReplacePath());
        Controller.controllersBuild(controller)('');
    };

    let init = (document) => {
        namespace.state = new State({
            path: '/main'
        });
        namespace.controller = new Controller(document);
        namespace.view = new View(namespace.controller.root, namespace.state);
        namespace.controller.setConnectView(namespace.view );

        namespace.view.loaderHTML = new Image();
        namespace.view.loaderHTML.src = '/loader.gif';
        namespace.view.loaderHTML.onload = () => {
            main();
        };
    };

    if (/\/admin\/cabinet/.test(location.pathname)) init(document);

export {viewBuild};
