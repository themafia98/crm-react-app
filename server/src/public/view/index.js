import namespace from '../store/namespace.js';
import {getMenu, getDataServices} from '../rest.js';
import Controller from '../controller/index.js';

function View(doc, state){
    this.path = state && state.path ? state.path : '/';
    this.listArrayMenu = [];
    this.pathContent = '/auto';
    this.needUpdate = true;
    this.root = doc.querySelector('.cabinetAction') || null;
    this.loaderHTML = null;
    this.loader = null;
};

View.prototype.setUpdate = function(update = true){
    this.needUpdate = update;
};

View.prototype.getPathContext = function(){
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

View.prototype.setListMenu = function(list){
    this.listArrayMenu = [...list];
}

View.prototype.getListMenu = function (path){
    return new Promise((resolve, reject) => {
       getMenu(path)
       .then(list => {
        if (typeof list === 'object')
        resolve(list);
        else reject(new Error('Bad get list menu'));
       })
       .catch(error => console.error(error.message));
    })
    .catch(error => console.error(error.message));
};

View.linkPathActive = function(link){
    try {
        link.classList.toggle('active_link');
    }
    catch(error){
        console.error(error.message);
    }
};

View.buildAbout = function(view, root){
    if (!view.root) {
        let app = root.querySelector('.cabinet');
        let root = root.createElement('div');
        root.classList.add('cabinetAction');
        app.appendChild(root);
        view.root = root.querySelector('.cabinetAction');
    }

    view.root.appendChild(View.buildMenu(root));
    view.root.appendChild(View.buildContentAbout(root));
};

View.buildServices =  async (view, root) => {
    if (!view.root) {
        let app = root.querySelector('.cabinet');
        let root = root.createElement('div');
        root.classList.add('cabinetAction');
        app.appendChild(root);
        view.root = root.querySelector('.cabinetAction');
    }
    let contentNode = await View.buildContentServices(root);
    view.root.appendChild(View.buildMenu(root));
    view.root.appendChild(contentNode);
};

View.buildMain = function(view, root){
    if (!view.root) {
        let app = root.querySelector('.cabinet');
        let root = root.createElement('div');
        root.classList.add('cabinetAction');
        app.appendChild(root);
        view.root = root.querySelector('.cabinetAction');
    }

    view.root.appendChild(View.buildMenu(root));
    view.root.appendChild(View.buildContentMain(root));
};

View.buildContentMain = function(root){
    let node = root.createElement('div');
    let contentContainer = root.createElement('div');

    node.classList.add('col');

    contentContainer.innerHTML = location.hash;

    node.appendChild(contentContainer);
    return node;
};

View.buildContentAbout = function(root){
    let node = root.createElement('div');
    let contentContainer = root.createElement('div');

    node.classList.add('col');

    contentContainer.innerHTML = location.hash;

    node.appendChild(contentContainer);
    return node;
};

View.createDataServices = async (path) => {
    const { view } = namespace;

    view.renderLoader();
    const data = await getDataServices(path)
    .catch(error => console.error(error.message));
    view.loader.remove();
    return data;
};

View.buildContentServices = async (root) =>{

    const { view } = namespace;
    const node = root.createElement('div');
    const contentContainer = root.createElement('div');

    node.classList.add('col');

    let servicesInformationBlock = root.createElement('div');
    servicesInformationBlock.classList.add('servicesInformationBlock');

    let menu = await View.createContentMenu(view.getPath());
    let data =  await View.createDataServices(view.getPathContext());
    ;

    let textArea = root.createElement('textarea');
    textArea.classList.add('servicesTextArea');
    textArea.innerHTML = data || '';


    menu ? node.appendChild(menu) : null;
    textArea ? node.appendChild(textArea) : null;
    contentContainer ? node.appendChild(contentContainer) : null;
    return node;
};

View.prototype.parseMenu = function(root){

    const { view } = namespace;

    let menuContentBlock = root.createElement('div');
    menuContentBlock.classList.add('menuContentBlock');
    let list = root.createElement('ul');
    list.classList.add('listMenu');
    if (!view.listArrayMenu) return false;
    else Controller.createLinks(view.listArrayMenu, list);
        menuContentBlock.appendChild(list);
    return menuContentBlock;
};

View.prototype.renderLoader = function(){

    if (this.loaderHTML){
        this.loaderHTML.classList.add('loader');
        this.root.appendChild(this.loaderHTML);
        debugger;
        this.loader = this.root.querySelector('.loader');
    } else {
        const loader = namespace.controller.root.createElement('p');
        loader.innerHTML = 'loading...';
        loader.classList.add('loader');
        root.appendChild(loader);
        loader = this.root.querySelector('.loader');
    }
};

View.prototype.removeLoader = function(){
    if (this.loader) this.loader.remove();
    else {
        const loaderHTML =  this.root.querySelector('.loader');
        if (loaderHTML) loaderHTML.remove();
    }
};


View.createContentMenu = async (path) => {
    let _list = null;
    const { view, controller } = namespace;

    if (view.needUpdate){
    view.renderLoader();
    await view.getListMenu(path)
    .then(response => {
    let listArray = response ? response.list : null;
    let root = view.root;
    ;
        if (path === '/services'){
            if (listArray) view.setListMenu(listArray);
            else throw new Error('not found menu');
            _list = view.parseMenu(controller.root);
        }
        return _list;
    })
    .catch(error => console.error(error.message));
    }
    else return void view.renderLoader();

    view.loader.remove();
    return _list;
};

View.buildMenu = function(root){
    ;
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

    if (location.hash === '#/main') View.linkPathActive(main);
    if (location.hash === '#/services') View.linkPathActive(services);
    if (location.hash === '#/about') View.linkPathActive(about);
    
    nav.appendChild(main); 
    nav.appendChild(about);
    nav.appendChild(services);
   
    node.appendChild(nav);
    return node;
};

export default View;