import namespace from '../store/namespace.js';
import {getMenu, getDataServices, getCardsList} from '../rest.js';
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

View.prototype.buildFormsFile = async (root, domNode) =>{

    let node = null;

    !domNode ? node = root.createElement('div') : node = domNode;

    let contentContainer = root.createElement('div');
    contentContainer.classList.add('flex-wrapper');
    contentContainer.classList.add('formsFile');

    let formBox1 = root.createElement('div');
    formBox1.classList.add('flex-box');
    let formBox2 = root.createElement('div');
    formBox2.classList.add('flex-box');

    if (!domNode){
        node.classList.add('col');
        node.classList.add('contentBox');
    }

    const form = root.createElement('form');
    form.classList.add('uploadForm');
    form.setAttribute('action', '/admin/api/upload');
    form.setAttribute('method','POST');
    form.setAttribute('enctype','multipart/form-data');

    let name = root.createElement('input');
    name.setAttribute('type','text');
    name.setAttribute('placeholder', 'file name');
    name.setAttribute('required', true);
    name.setAttribute('name', 'nameFile');

    let input = root.createElement('input');
    input.setAttribute('type','file');
    input.setAttribute('name', 'upload');

    form.appendChild(name);
    form.appendChild(input);

    let submit = root.createElement('input');
    submit.setAttribute('type', 'submit');

    form.appendChild(submit);

    formBox1.appendChild(form);
    contentContainer.appendChild(formBox1);


    const form2 = root.createElement('form');
    form2.classList.add('downloadForm');
    form2.setAttribute('action', '/admin/api/download');
    form2.setAttribute('method','GET');

    let name2 = root.createElement('input');
    name2.setAttribute('type','text');
    name2.setAttribute('placeholder', 'file name');
    name2.setAttribute('required', true);
    name2.setAttribute('name', 'nameFile');

    let submit2 = root.createElement('input');
    submit2.setAttribute('type', 'submit');
    submit2.value = 'получить';

    form2.appendChild(name2);
    form2.appendChild(submit2);

    formBox2.appendChild(form2);
    contentContainer.appendChild(formBox2);

    node.appendChild(contentContainer);

    return node;
}

View.prototype.fill = async (component, type, root) => {
    if (!component || !type) return;
    const list = await getCardsList(type);
    if (list && list.length > 1) {
       await list.forEach(item => {

            let itemCard = root.createElement('li');
            itemCard.setAttribute('data-id', item._id);

            let name = root.createElement('p');
            name.classList.add('nameCard');
            name.innerHTML = item.name;
            let contentCard = root.createElement('p');
            contentCard.classList.add('contentCard');
            contentCard.innerHTML = item.content;
            let priceCard = root.createElement('p');
            priceCard.classList.add('priceCard');
            priceCard.innerHTML = item.price;


            let controllersCardWrapper = root.createElement('div');
            controllersCardWrapper.classList.add('controllersCardWrapper');

            let editButton = root.createElement('input');
            editButton.setAttribute('type', 'button');
            editButton.setAttribute('value', 'Edit');
            editButton.classList.add('editButton_card');

            let deleteButton = root.createElement('input');
            deleteButton.setAttribute('type', 'button');
            deleteButton.setAttribute('value', 'Delete');
            deleteButton.classList.add('deleteButton_card');

            controllersCardWrapper.appendChild(editButton);
            controllersCardWrapper.appendChild(deleteButton);

            itemCard.appendChild(name);
            itemCard.appendChild(contentCard);
            itemCard.appendChild(priceCard);
            itemCard.appendChild(controllersCardWrapper);

            component.appendChild(itemCard);
        });
        return true;
    }
    else if (list.length === 1) { 

        let itemCard = root.createElement('li');

        let name = root.createElement('p');
        name.classList.add('nameCard');
        let contentCard = root.createElement('p');
        contentCard.classList.add('contentCard');
        let priceCard = root.createElement('p');
        priceCard.classList.add('priceCard');

        itemCard.appendChild(name);
        itemCard.appendChild(contentCard);
        itemCard.appendChild(priceCard);

        component.appendChild(itemCard);
        return true;
    } else return false;
};

View.linkPathActive = function(link, mode){
        ;
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
        const node = view.buildFormsFile(root);
        view.mainContentNode = node.querySelector('.contentBox');
        return node;
    } else  {
        view.mainContentNode = contentBox;
        view.clear(); /** @param default = part */
        view.buildFormsFile(root, contentBox);
    }
};

View.createDataServices = async (path) => {
    const { view } = namespace;

    view.renderLoader();
    const data = await getDataServices(path)
    .catch(error => console.error(error.message));
    return data;
};

View.buildContentServices = async (root) =>{

    const { view, state, controller } = namespace;
    const path = state.getState().path;
    const node = root.createElement('div');
    const contentContainer = root.createElement('div');
    const contentBox = root.querySelector('.contentBox');


    if (!contentBox){

        node.classList.add('col');
        node.classList.add('contentBox');
        view.mainContentNode = node.querySelector('.contentBox');

        let servicesInformationBlock = root.createElement('div');
        servicesInformationBlock.classList.add('servicesInformationBlock');
        let menu = await View.createContentMenu(path);
        let data =  await View.createDataServices(view.getPathContext());

        let title = root.createElement('p');
        title.classList.add('titleContent');
        title.innerHTML = 'Main content';

        let titleCard = root.createElement('p');
        titleCard.classList.add('titleContent');
        titleCard.innerHTML = 'Cards';

        let textArea = root.createElement('textarea');
        textArea.classList.add('servicesTextArea');
        textArea.innerHTML = data || '';

        let inputChange = root.createElement('input');
        inputChange.classList.add('sendChangeServices');
        inputChange.setAttribute('type', 'button');
        inputChange.value = 'Принять изменения';

        let cardsList = root.createElement('ul');
        cardsList.classList.add('cardsList');


        const statusMountCards = await view.fill(cardsList, view.getPathContext(), root)
        .then((status) => { view.removeLoader(); return status; });

        menu ? node.appendChild(menu) : null;
        node.appendChild(title);
        textArea ? node.appendChild(textArea) : null;
        contentContainer ? node.appendChild(contentContainer) : null;
        inputChange && textArea ? node.appendChild(inputChange) : null;

        if (statusMountCards){
            node.appendChild(titleCard);
            node.appendChild(cardsList);
        }

        await view.buildFormsFile(root, node);

        view.mainContentNode = node.querySelector('.contentBox');

        const button = node.querySelector('.sendChangeServices');

        if (button && !controller.getListener('sendChangeServices')){

            controller.setListeners('sendChangeServices', 
            button, 'click', (event) => {
                debugger;
            });
        }
        return node;
    } else {

        view.mainContentNode = root.querySelector('.contentBox');
        view.clear();

        let menu = await View.createContentMenu(path);
        let data =  await View.createDataServices(view.getPathContext());

        let title = root.createElement('p');
        title.classList.add('titleContent');
        title.innerHTML = 'Main content';

        let titleCard = root.createElement('p');
        titleCard.classList.add('titleContent');
        titleCard.innerHTML = 'Cards';

        let textArea = root.createElement('textarea');
        textArea.classList.add('servicesTextArea');
        textArea.innerHTML = data || '';
        let inputChange = root.createElement('input');
        inputChange.setAttribute('type', 'button');
        inputChange.classList.add('sendChangeServices');
        inputChange.value = 'Принять изменения';

        
        let cardsList = root.createElement('ul');
        cardsList.classList.add('cardsList');


        const statusMountCards = await view.fill(cardsList, view.getPathContext(), root)
        .then((status) => { view.removeLoader(); return status; });


        menu ? contentBox.appendChild(menu) : null;
        contentBox.appendChild(title);
        textArea ? contentBox.appendChild(textArea) : null;
        contentContainer ? contentBox.appendChild(contentContainer) : null;
        inputChange && textArea ? contentBox.appendChild(inputChange) : null;

        if (statusMountCards){
            contentBox.appendChild(titleCard);
            contentBox.appendChild(cardsList);
        }

        await view.buildFormsFile(root, contentBox)
        .then(() => view.removeLoader())
        
        const button = contentBox.querySelector('.sendChangeServices');
        if (button){

            if (controller.getListener('sendChangeServices'))
                controller.removeListeners('sendChangeServices');

            controller.setListeners('sendChangeServices', 
            button, 'click', (event) => {
                debugger;
            });
        }
    }
};

View.prototype.parseMenu = function(root){

    const { view } = namespace;

    let menuContentBlock = root.createElement('div');
    menuContentBlock.classList.add('menuContentBlock');
    let list = root.createElement('ul');
    list.classList.add('listMenu');
    if (!view.listArrayMenu) return false;
    else Controller.createLinks(view.listArrayMenu, list, 'once');
        menuContentBlock.appendChild(list);
    return menuContentBlock;
};

View.prototype.renderLoader = function(loc = this.root){

    if (this.loaderHTML){
        this.loaderHTML.classList.add('loader');
        loc.appendChild(this.loaderHTML);
        this.loader = this.root.querySelector('.loader');
    } else {
        const loader = namespace.controller.root.createElement('p');
        loader.innerHTML = 'loading...';
        loader.classList.add('loader');
        loc.appendChild(loader);
        loader = this.root.querySelector('.loader');
    }
};

View.prototype.removeLoader = function(loc){
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
        node.classList.add('col-menu');

        let main = root.createElement('a');
        main.classList.add('cabinetAction__link');
        main.setAttribute('data-type', 'main');
        main.dataset.mode = 'nav';
        main.href = '#/main';
        main.innerHTML = 'Main';

        let services = root.createElement('a');
        services.classList.add('cabinetAction__link');
        services.setAttribute('data-type', 'services');
        services.dataset.mode = 'nav';
        services.href = '#/services';
        services.innerHTML = 'Services';

        let about = root.createElement('a');
        about.classList.add('cabinetAction__link');
        about.setAttribute('data-type', 'about');
        about.dataset.mode = 'nav';
        about.href = '#/about';
        about.innerHTML = 'About';

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

        if (state.getState().modeLink) return;

        let linkServices = root.querySelector('[data-type="services"]');
        let linkMain = root.querySelector('[data-type="main"]');
        let linkAbout = root.querySelector('[data-type="about"]');


        if (isMain) View.linkPathActive(linkMain, 'use');
        if (isServices) View.linkPathActive(linkServices, 'use');
        if (isAbout) View.linkPathActive(linkAbout, 'use');
    }
};

export default View;