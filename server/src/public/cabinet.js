import Controller from './controller/index.js';
import namespace from './store/namespace.js';
import State from './store/state.js';
import View from './view/index.js';
    
    function viewBuild(state, newView, newController){
        let view = namespace.view || newView;
        let storeState = namespace.state;
        let controller = namespace.controller || newController;

        return (path, modeLink = false) => {
    
            namespace.state.setStateProps({
                type: 'SET_PAYLOAD',
                payload: State.locationReplacePath(),
            },'path');


            if (modeLink !== storeState.getState().modeLink)
            namespace.state.setStateProps({
                type: 'SET_MODE_LINK',
                payload: modeLink,
            },'modeLink');

            view.clear();
            controller.removeListeners('full');
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
            path: State.locationReplacePath(),
            modeLink: false,
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
