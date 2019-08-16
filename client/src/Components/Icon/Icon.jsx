import React from 'react';
import './Icon.scss';
const Icon = ({path, go, newClass, cbRedirectHome}) => {
    return (
        <div 
            onClick = {go && cbRedirectHome}  
            className = {!newClass ? 'Icon' : 'Icon ' + newClass}>
            <img       
                className = {go ? 'go' : null} 
                src = {process.env.PUBLIC_URL + path} 
                alt = 'Icon' 
            />
        </div>
    )
};
export default Icon;