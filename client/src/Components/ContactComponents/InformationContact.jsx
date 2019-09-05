import React,{Fragment} from 'react';
import './contactComponents.scss';
const InformationContact = props => {


    return (
        <Fragment>
            <p className = 'Contact__content__skype'>
            skype:<a key = 'skype' className = 'skype' href="skype:Test">Test</a>
            </p>
            <p className = 'Contact__content__telegram'>
            telegram:
            <a rel="noopener noreferrer" 
                key = 'telegram'
                target = "_blank" 
                href = "https://telegram.me/holykilla" 
                className = 'telegram'>
                Test
            </a>
            </p>
            <a 
                key = 'tel' 
                href = 'tel:+222222222222' 
                className = 'Contact__content__tel'
            >
            +22 (222) 222 22 22
            </a>
            <p key = 'adress' className = 'Contact__content__country'>
                Минск, Беларусь.
            </p>
        </Fragment>
    )
};
export default InformationContact;