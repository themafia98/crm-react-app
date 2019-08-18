import React from 'react';
import PropTypes from 'prop-types';

class ServicesContent extends React.PureComponent {

    static propTypes = {
        mode: PropTypes.string.isRequired,
    }

    render(){
        return (
            <div className = 'ServicesContent'></div>
        )

    }
}
export default ServicesContent;