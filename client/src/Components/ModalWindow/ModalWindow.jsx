import React from 'react';
import PropTypes from 'prop-types';
import './modalWindow.scss';

import eventEmitter from '../../EventEmitter';
import ModalContent from './ModalContent';

class ModalWindow extends React.PureComponent {

    static propTypes = {
        mode: PropTypes.string.isRequired,
    }

    state = {
        mode: this.props.mode,
    }

    closeModal = event => {
        if (event.target === this.modalWrapper)
        eventEmitter.emit('EventOpenModal',{action: null, active: false});
        event.stopPropagation();
    }

    modalWrapper = null;
    modalWrapperRef = node => this.modalWrapper = node;


    render(){
        
        return (
        <div 
            ref = {this.modalWrapperRef} 
            onClick = {this.closeModal} 
            className = 'ModalWrapper'
        >
            <div className = 'Modal'>
                <ModalContent mode = {this.props.mode} />
            </div>
        </div>
        ) 
    }
}
export default ModalWindow;