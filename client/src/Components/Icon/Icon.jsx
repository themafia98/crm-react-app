import React from 'react';
import PropTypes from 'prop-types';
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
Icon.propTypes = {
    path: PropTypes.string.isRequired,
    go: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.bool.isRequired
    ]),
    newClass: PropTypes.string,
    cbRedirectHome: PropTypes.func

}
export default Icon;