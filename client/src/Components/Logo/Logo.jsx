import React from 'react';
import './logo.scss';
const Logo = ({path, go, cbRedirectHome}) => {
    return (
        <div 
            onClick = {go && cbRedirectHome}  
            className = 'logo'>
            <img       
                className = {go ? 'go' : null} 
                src = {process.env.PUBLIC_URL + path} 
                alt = 'logo' 
            />
        </div>
    )
};
export default Logo;