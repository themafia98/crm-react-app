import React from 'react';
import PropTypes from 'prop-types';
import './content.scss';

const RoadCareer = ({content}) => {
    return (
        <p className = 'roadCareer__content'>
            {content}
        </p>
    );
};

RoadCareer.propTypes = {
    content: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.array.isRequired
    ])
};

export default RoadCareer;