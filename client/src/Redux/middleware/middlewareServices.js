import {updateServicesType} from '../actions/servicesActions';
import isFetch from 'isomorphic-fetch';

const loadMiddlewareServices = (action) => (dispatch) => {

    if (action === 'default') action = 'auto';

    let address = null;
    if (process.env.NODE_ENV === 'production')
    address = `${process.env.REACT_APP_SERVICES}${action}`;
    else address = `http://localhost:3001/services/${action}`;
    
        isFetch(address)
            .then(res => res.text())
            .then(res => {
                return res.split('\n');
            })
            .then(content =>{
                dispatch(updateServicesType({
                    content: content,
                    servicesType: action
                }));
            })
        .catch(error => console.error(error));
};

export {loadMiddlewareServices};