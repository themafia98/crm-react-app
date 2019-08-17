import React,{Fragment} from 'react';
import './contactComponents.scss';
const InformationContact = () => {


    return (
        <Fragment>
            <p className = 'Contact__content__skype'>
            skype:<span className = 'skype'>Test</span>
            </p>
            <p className = 'Contact__content__telegram'>
            telegram:<span className = 'telegram'>Test</span>
            </p>
            <p className = 'Contact__content__tel'>
            +22 (222) 222 22 22
            </p>
            <p className = 'Contact__content__country'>
                Минск, Беларусь.
            </p>
        </Fragment>
    )
};
export default InformationContact;