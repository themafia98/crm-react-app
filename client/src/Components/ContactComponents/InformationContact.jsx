import React,{Fragment} from 'react';
import './contactComponents.scss';
const InformationContact = props => {


    return (
        <Fragment>
            <p className = 'Contact__content__skype'>
            skype:<a className = 'skype' href="skype:Test">Test</a>
            </p>
            <p className = 'Contact__content__telegram'>
            telegram:
            <a rel="noopener noreferrer" 
                target = "_blank" 
                href = "https://telegram.me/holykilla" 
                className = 'telegram'>
                Test
            </a>
            </p>
            <a href = 'tel:+222222222222' className = 'Contact__content__tel'>
            +22 (222) 222 22 22
            </a>
            <p className = 'Contact__content__country'>
                Минск, Беларусь.
            </p>
        </Fragment>
    )
};
export default InformationContact;