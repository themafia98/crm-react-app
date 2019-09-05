import React from 'react';
import PropTypes from 'prop-types';

import './card.scss';

const Card = ({mode}) => {
    return (
        <div key = 'Card' className = 'Card'>
            <p className ='Card__title'>SIP Install</p>
            <p className = 'Card__content'>
                Подключение SIP телефонии и настройка виртуальной АТС под задачу клиента
            </p>
            <p className = 'Card__priceName'>
                Цена:&nbsp;
                <span key = {`price${mode}`} className = 'Card__priceCard'> 
                    999999 $
                </span>
            </p>
        </div>
    )
};

Card.propTypes = {
    mode: PropTypes.string.isRequired,
}

export default Card;