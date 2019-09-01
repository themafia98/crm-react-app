import React from 'react';
import './content.scss';

const PriceContent = ({mode}) => {
    
    switch (mode) {
        case 'auto':
            return <div className = 'PriceContent auto_price'></div>
        case 'amoCRM':
                return <div className = 'PriceContent amoCRM_price'></div>
        case 'retailCRM':
                return <div className = 'PriceContent retailCRM_price'></div>
        default:
             return <div className = 'PriceContent'>Контент в разработке!</div>
    }
};
export default PriceContent;