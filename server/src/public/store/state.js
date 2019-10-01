
function State(initialState, nameStore = 'path'){
    this.nameStore = nameStore;
    this.state = initialState;
};

State.prototype.getState = function(){
    return this.state;
};

 State.prototype.setStateProps = function(action, nameStore = this.nameStore){
     ;
     if (!this.state[nameStore] === undefined) return false;
    switch (action.type){
        case 'SET_PAYLOAD':{
            this.state[nameStore] = action.payload;
            break;
        }
        case 'SET_MODE_LINK': {
            this.state[nameStore] = action.payload;
            break;
        }
    }
};

State.prototype.newReducer = function(name , defaultValue = null){
    this.state[name] = defaultValue;
};

State.prototype.action = function(typeAction){
    switch (typeAction){
        case 'SET_PATH': return State.locationReplacePath();
        case "CHECK_PATH": return State.checkPath();
    }
};

State.prototype.checkPath = function(){

    return this.getState().path === State.locationReplacePath();
};

State.locationReplacePath = function(){
    if (location.hash === "#")
        return location.hash.replace(/#/gi,'/');
    else if (!location.hash){
        location.hash = "#/main";
        return location.hash.replace(/^$/,"/main");
    }
    else if (/\#\//.test(location.hash))
        return location.hash.replace(/\#\//,"/");
};

export default State;