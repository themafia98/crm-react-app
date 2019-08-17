import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import Icon from '../Icon/Icon';
const ListItem = ({content, url, title, newClass, icon, history}) => {

    const go = event => {
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
ListItem.propTypes = {
    content: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    url: PropTypes.string,
    newClass: PropTypes.string,
    icon: PropTypes.string,
};
export default withRouter(ListItem);