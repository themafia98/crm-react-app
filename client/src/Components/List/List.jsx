import React from 'react';
import ListItem from './ListItem';
import './list.scss';
const List = ({mode, data, type}) => {
    console.log(mode);
    const makeItems = data => {
        if (data)
        return data.map((item,index) => {
            return (
                <ListItem
                    key = {index}
                    title = {item.title}
                    icon = {item.icon ? item.icon : null}
                    content = {item.content}
                    type = {item.type}
                    url = {item.url}
                    newClass = {item.class}
                />
            );
        });
        return <div>List item not build</div>
    };

    switch(mode){
        case 'index': return (
            <div className = {!type ? 'list' : 'list list--marginLeft--10'}>
                {makeItems(data)}
            </div>
        )
        default: return <div>List not found</div>
    }

};
export default List;