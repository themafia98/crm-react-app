import React from 'react';
import {withRouter} from 'react-router-dom';
import Icon from '../Icon/Icon';
const ListItem = ({content, type, url, title, newClass, icon, history}) => {
    const go = event => {
        console.log(url);
        history.push(url);
        event.stopPropagation();
    };

    return (
        <div className = {newClass ? 'ListItem ' + newClass : 'ListItem'} >
            <div className = 'ListItem__titleWrapper'>
                {icon && <Icon newClass = 'ListItem__icon' path = {icon} />}
                <p className = 'ListItem__title'>{title}</p>
            </div>
            <p className = 'ListItem__content'>{content}</p>
            {url && 
                <div className = 'ListItem__controller'>
                <input
                    onClick = {go}
                    className = 'ListItem__controller__button' 
                    type = 'button' 
                    value = 'Подробнее' />
                </div>
            }
        </div>
    )

}
export default withRouter(ListItem);