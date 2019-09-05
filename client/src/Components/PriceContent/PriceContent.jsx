import React from 'react';
import Card from '../Card/Card';
import './content.scss';

const PriceContent = ({mode}) => {
        console.log(mode);
    switch (mode) { /** In propress */
        case 'auto':
            return <div key = 'auto' className = 'PriceContent auto_price'> 
            <Card mode = {mode} />
            <Card mode = {mode} />
            <Card mode = {mode} />
            </div>
        case 'amoCRM':
                return <div key = 'amoCRM' className = 'PriceContent amoCRM_price'>
                <Card mode = {mode} />
                <Card mode = {mode} />
                <Card mode = {mode} />
                </div>
        case 'retailCRM':
                return <div key = 'retailCRM' className = 'PriceContent retailCRM_price'>
                <Card mode = {mode} />
                <Card mode = {mode} />
                <Card mode = {mode} />
                </div>
        default:
             return <div key = 'nonePrice' className = 'PriceContent'>Цен еще нету!</div>
    }
};
export default PriceContent;