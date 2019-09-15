import React from 'react';
import Card from '../Card/Card';
import './content.scss';


class PriceContent extends React.PureComponent {

    buildCard(cards){
        if (cards.type){
            return cards.storeCards.map((it,i) => {
                return (
                <Card 
                    key = {i} 
                    mode = {cards.type}
                    content = {it}
                />
                )
            });
        } else return (
            <div 
                key = 'nonePrice' 
                className = 'PriceContent nonePrice'>
                    Прайс-лист не найден.
            </div>
        )
    }

    render(){
        const {cards, mode} = this.props;
        if (cards){
            return (
            <div key = {mode} className = 'PriceContent'> 
                {this.buildCard(cards)}
            </div>
            )
        }
    }
};

export default PriceContent;