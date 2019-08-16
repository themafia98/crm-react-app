import React from 'react';
import ListItem from './ListItem';
import './list.scss';
const List = ({mode, data}) => {
    console.log(mode);
    const makeItems = data => {
        if (data)
        return data.map((item,index) => {
            return (
                <ListItem
                    key = {index}
                    title = {item.title}
                    content = {item.content}
                    type = {item.type}
                    url = {item.url}
                    newClass = {null}
                />
            );
        });
        return <div>List item not build</div>
    };

    switch(mode){
        case 'index': return (
            <div className = 'list'>
                {makeItems(data)}
            </div>
        )
        default: return <div>List not found</div>
    }

};
export default List;