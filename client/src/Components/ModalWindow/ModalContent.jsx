import React,{Fragment} from 'react';
import './modalWindow.scss';

const ModalContent = ({mode}) => {

    if (mode === 'policy'){
        return (
            <div className = 'Modal__policy'>
            
            </div>
        )
    } else return <Fragment></Fragment>
};
export default ModalContent;