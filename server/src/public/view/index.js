import namespace from '../store/namespace.js';
import {getMenu, getDataServices} from '../rest.js';
import Controller from '../controller/index.js';
import State from '../store/state.js';

function View(doc){
    this.listArrayMenu = [];
    this.pathContent = '/auto';
    this.needUpdate = true;
    this.firstRender = true;
    this.mainContentNode = null;
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

View.prototype.clear = function(mode = 'part'){
    if (mode === 'all' && this.root) 
        this.root.innerHTML = '';
    else if (mode === 'part' && this.mainContentNode)
    this.mainContentNode.innerHTML = '';
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

View.linkPathActive = function(link, mode){
    const { view } = namespace;
    if (!mode) link.classList.toggle('active_link');
    else {
        const parent = view.root.querySelector('.cabinet_navigator');
        if (parent){
            const listLinks = Array.from(parent.childNodes);
            listLinks.forEach(linkFromList => {
                if (link === linkFromList)
                link.classList.toggle('active_link');
                else linkFromList.classList.remove('active_link');
            });
        }
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

    const menuBlock = View.buildMenu(root);
    const contentAbout = View.buildContentAbout(root);

    if (menuBlock) view.root.appendChild(menuBlock);
    if (contentAbout) view.root.appendChild(contentAbout);
};

View.buildServices =  async (view, root) => {
    ;
    if (!view.root) {
        let app = root.querySelector('.cabinet');
        let root = root.createElement('div');
        root.classList.add('cabinetAction');
        app.appendChild(root);
        view.root = root.querySelector('.cabinetAction');
    }
    const contentNode = await View.buildContentServices(root);
    const menuBlock = View.buildMenu(root);

    if (menuBlock) view.root.appendChild(menuBlock);
    if (contentNode) view.root.appendChild(contentNode);
};

View.buildMain = function(view, root){
    if (!view.root) {
        let app = root.querySelector('.cabinet');
        let root = root.createElement('div');
        root.classList.add('cabinetAction');
        app.appendChild(root);
        view.root = root.querySelector('.cabinetAction');
    }

    const menuBlock = View.buildMenu(root);
    if (menuBlock) view.root.appendChild(menuBlock);

    const mainContent = View.buildContentMain(root);
    if (mainContent) view.root.appendChild(mainContent);


};

View.buildContentMain = function(root){
    const { view } = namespace;
    const contentBox = root.querySelector('.contentBox');
    if (!contentBox){
        let node = root.createElement('div');
        let contentContainer = root.createElement('div');

        node.classList.add('col');
        node.classList.add('contentBox');

        contentContainer.innerHTML = location.hash;

        node.appendChild(contentContainer);
        view.mainContentNode = node.querySelector('.contentBox');
        return node;
    } else {
        contentBox.innerHTML = location.hash;
    }
};

View.buildContentAbout = function(root){
    const { view } = namespace;
    const contentBox = root.querySelector('.contentBox');
    if (!contentBox){
        let node = root.createElement('div');
        let contentContainer = root.createElement('div');

        node.classList.add('col');
        node.classList.add('contentBox');

        contentContainer.innerHTML = location.hash;

        node.appendChild(contentContainer);
        view.mainContentNode = node.querySelector('.contentBox');
        return node;
    } else {
        contentBox.innerHTML = location.hash;
    }
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

    const { view, state } = namespace;
    const path = state.getState().path;
    const node = root.createElement('div');
    const contentContainer = root.createElement('div');
    const contentBox = root.querySelector('.contentBox');


    if (!contentBox){

        node.classList.add('col');
        node.classList.add('contentBox');

        let servicesInformationBlock = root.createElement('div');
        servicesInformationBlock.classList.add('servicesInformationBlock');
        let menu = await View.createContentMenu(path);
        let data =  await View.createDataServices(view.getPathContext());

        let textArea = root.createElement('textarea');
        textArea.classList.add('servicesTextArea');
        textArea.innerHTML = data || '';


        menu ? node.appendChild(menu) : null;
        textArea ? node.appendChild(textArea) : null;
        contentContainer ? node.appendChild(contentContainer) : null;

        view.mainContentNode = node.querySelector('.contentBox');
        return node;
    } else {
        contentBox.innerHTML = '';

        
        let menu = await View.createContentMenu(path);
        let data =  await View.createDataServices(view.getPathContext());

        let textArea = root.createElement('textarea');
        textArea.classList.add('servicesTextArea');
        textArea.innerHTML = data || '';


        menu ? contentBox.appendChild(menu) : null;
        textArea ? contentBox.appendChild(textArea) : null;
        contentContainer ? contentBox.appendChild(contentContainer) : null;
    }
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

    const { view, state } = namespace;
    const isMain = location.hash === '#/main';
    const isServices = location.hash === '#/services';
    const isAbout = location.hash === '#/about';

    if (!root.querySelector('.cabinet_navigator')) {
        let node = root.createElement('div');
        let nav = root.createElement('nav');
        nav.classList.add('cabinet_navigator');
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

        ;
        if (!view.needUpdate && !view.firstRender && state.checkPath()) return;


        if (isMain) View.linkPathActive(main);
        if (isServices) View.linkPathActive(services);
        if (isAbout) View.linkPathActive(about);
        
        nav.appendChild(main); 
        nav.appendChild(about);
        nav.appendChild(services);
    
        node.appendChild(nav);
        return node;
    } else {
        if (state.checkPath()) return;

        let linkServices = root.querySelector('[data-type="services"]');
        let linkMain = root.querySelector('[data-type="main"]');
        let linkAbout = root.querySelector('[data-type="about"]');


        if (isMain) View.linkPathActive(linkMain, 'use');
        if (isServices) View.linkPathActive(linkServices, 'use');
        if (isAbout) View.linkPathActive(linkAbout, 'use');
    }
};

export default View;