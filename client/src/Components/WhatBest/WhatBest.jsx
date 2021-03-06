import React from 'react';
import List from '../List/List';
import data from '../../data.json';
import './wecan.scss';
const WhatBest = props => {

    return (
        <section key = 'WhatBest' className = 'WhatBest'>
            <div className = 'container'>
                <h2>Почему стоит выбрать нас</h2>
                    <List 
                        data = {data.weCan} 
                        key = 'listIndex' 
                        mode = 'index'
                        type = 'weCan'
                    />
            </div>
        </section>
    )
};
export default WhatBest;