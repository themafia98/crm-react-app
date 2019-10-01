
function State(initialState, nameStore = 'store'){
    this.nameStore = nameStore;
    this.state = initialState;
};

State.prototype.getState = function(){
    return this.state;
};

 State.prototype.setStateProp = function(type, action, nameStore = this.nameStore){
    switch (type){
        case 'SET_PATH':{
            this.state[nameStore]['path'] = action.payload;
            break;
        }
    }
};

State.prototype.action = function(typeAction){
    switch (typeAction){
        case 'SET_PATH': return State.locationReplacePath();
    }
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