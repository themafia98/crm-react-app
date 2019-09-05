import React from 'react';
import List from '../List/List';
import './ourServices.scss';
import data from '../../data.json';
const OurServices = props => {

    return (
        <section key = 'OurServices' className = 'OurServices'>
            <div className = 'container'>
                <h2>Наши услуги</h2>
                    <List 
                        data = {data.dataServicess} 
                        key = 'listIndex' 
                        mode = 'index' 
                    />
            </div>
        </section>
    )
}


export default OurServices;