import React from 'react';
import './loader.scss';
const Loader = ({loaderClass}) => {
    return (
        <img 
            className = {loaderClass ? loaderClass : null} 
            src = {process.env.PUBLIC_URL + '/img/loader.gif'} 
            alt = 'loader' 
        />
    )
};
export default Loader;