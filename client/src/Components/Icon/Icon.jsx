import React from 'react';
import PropTypes from 'prop-types';
import './Icon.scss';
const Icon = ({path, go, className,alt, cbRedirectHome}) => {
    return (
        <div 
            onClick = {go && cbRedirectHome}  
            className = {!className ? 'Icon' : 'Icon ' + className}>
            <img       
                className = {go ? 'go' : null} 
                src = {path} 
                alt = {alt ? alt : 'icon'}
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