import React from 'react';
import PropTypes from 'prop-types';
import './modalWindow.scss';

import ModalContent from './ModalContent';

class ModalWindow extends React.PureComponent {

    static propTypes = {
        mode: PropTypes.string.isRequired,
    }

    state = {
        mode: this.props.mode,
    }

    
    render(){
        return (
            <div className = 'Modal'>
                <ModalContent mode = {this.props.mode} />
            </div>
        ) 
    }
}
export default ModalWindow;