import React from 'react';
import PropTypes from 'prop-types';

import './card.scss';

const Card = ({mode, content, name,price, _id}) => {
    if (!content, !name, !price, !_id) return null;
    return (
        <div key = {`Card ${_id}`} className = 'Card'>
            <p className ='Card__title'>{name}</p>
            <p className = 'Card__content'>
            {content}
            </p>
            <p className = 'Card__priceName'>
                Цена:&nbsp;
                <span key = {`price${mode}`} className = 'Card__priceCard'> 
                    {price}
                </span>
            </p>
        </div>
    )
};

Card.propTypes = {
    mode: PropTypes.string.isRequired,
}

export default Card;