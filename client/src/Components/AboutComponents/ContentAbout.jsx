import React from 'react';
import PropTypes from 'prop-types';
import './content.scss';
const ContentAbout = ({photoUrl, content}) => {

    return (
        <div className = 'About__Content'>
            <div className = 'col-6'>
                <img className = 'myPhoto' 
                    src = {photoUrl}
                    alt = 'myPhoto' 
                />
            </div>
            <div className = 'col-6 About__Content__contentMain'>
                <h3>100 лет опыта в бизнесе и ИТ технологиях</h3>
                <p>{content}</p>
            </div>
        </div>
    )

};

ContentAbout.propsTypes = {
    photoUrl: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.array.isRequired
    ])
};

export default ContentAbout;