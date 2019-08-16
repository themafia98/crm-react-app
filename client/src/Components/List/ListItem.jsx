import React from 'react';

const ListItem = ({content, type, url, title, newClass}) => {
    return (
        <div className = {newClass ? 'ListItem' + newClass : 'ListItem'} >
            <p className = 'ListItem__title'>{title}</p>
            <p className = 'ListItem__content'>{content}</p>
            {url && 
                <div className = 'ListItem__controller'>
                <input 
                    className = 'ListItem__controller__button' 
                    type = 'button' 
                    value = 'Подробнее' />
                </div>
            }
        </div>
    )

}
export default ListItem;