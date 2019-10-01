import Controller from './controller/index.js';
import namespace from './store/namespace.js';
import State from './store/state.js';
import View from './view/index.js';
    
    function viewBuild(state, newView, newController){
        let view = namespace.view || newView;
        let controller = namespace.controller || newController;

        return (path) => {
            namespace.state.action('SET_PATH');
            view.clear();
            if (path === '/' || path === '/main') 
                return  View.buildMain(view, controller.root);
            else if (path === '/about') 
                return  View.buildAbout(view, controller.root);
            else if (path === '/services') 
                return  View.buildServices(view, controller.root);
            else {
                namespace.state.action('SET_PATH');
                View.buildMain(view, controller.root);
            }

            if (view.firstRender) view.firstRender = false;
        };
    };

    function main(){
        let view = namespace.view;
        let controller = namespace.controller;
        viewBuild(namespace.state)(namespace.state.action('SET_PATH'));
        Controller.controllersBuild(controller)('');
    };

    let init = (document) => {
        namespace.state = new State({
            path: State.locationReplacePath()
        });
        namespace.controller = new Controller(document);
        namespace.view = new View(namespace.controller.root, namespace.state);
        namespace.controller.setConnectView(namespace.view );

        namespace.view.loaderHTML = new Image();
        namespace.view.loaderHTML.src = '/loader.gif';
        namespace.view.loaderHTML.onload = () => {
            main();
        };

        namespace.view.loaderHTML.onerror = () => {
            console.error('loader not found');
            main();
        };
    };

    if (/\/admin\/cabinet/.test(location.pathname)) init(document);

export {viewBuild};
