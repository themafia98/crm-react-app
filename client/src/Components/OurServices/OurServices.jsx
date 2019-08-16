import React from 'react';
import List from '../List/List';
import './ourServices.scss';
import data from './data.json';
const OurServices = () => {

    return (
        <section className = 'ourServices'>
            <div className = 'container'>
                <h2>Наши услуги</h2>
                    <List 
                        data = {data.dataServices} 
                        key = 'listIndex' 
                        mode = 'index' 
                    />
            </div>
        </section>
    )
}


export default OurServices;