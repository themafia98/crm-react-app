import {updateServicesType, loadPriceCards, errorSetter} from '../actions/servicesActions';
import AJAX from '../../Utils/Utils';

const loadMiddlewareServices = (action) => async (dispatch) => {

    if (action === 'default') action = 'auto';

    let address = null;
    if (process.env.NODE_ENV === 'production')
    address = `${process.env.REACT_APP_SERVICES}${action}`;
    else address = `http://localhost:3001/services/${action}`;
    
    AJAX.reset().send(address)
    .then(res => {
        if (res.statusSend && res.statusSend === 'wait')
            throw new Error ('Wait');
        if (res.ok) return res.text();
        else throw new Error ('Fail fetch');
    }).then(res =>  res.split('\n'))
        .then(content =>{
            dispatch(updateServicesType({
                content: content,
                servicesType: action
            }));
        })
        .catch(error => console.error(error.message));

        return true;
};

const loadMiddlewarePriceCardsServices = (action) => async (dispatch) => {

    if (action === 'default') action = 'auto';
    let address = null;
    if (process.env.NODE_ENV === 'production')
    address = `${process.env.REACT_APP_PRICELIST}${action}`;
    else address = `http://localhost:3001/price/cards/${action}`;
    
    await AJAX.reset().send(address)
    .then(res => {
        if (res.statusSend && res.statusSend === 'wait')
            throw new Error ('Wait');
        if (res.ok) return res.json();
        else throw new Error ('Fail fetch');
    })
        .then(cards =>{
            dispatch(loadPriceCards({
                type: action,
                cards: [...cards]
            }));
        })
        .catch(error => { console.error(error.message); return dispatch(errorSetter(error.message)) });
        return true;
};

export {loadMiddlewareServices, loadMiddlewarePriceCardsServices};