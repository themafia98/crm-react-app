import React from 'react';
import Card from '../Card/Card';
import './content.scss';


class PriceContent extends React.PureComponent {

    buildCard(cards){
        const { errorServer } = this.props;
        if (cards.type){
            return cards.storeCards.map((it,i) => {
                return (
                <Card 
                    key = {i + it['_id']} 
                    _id = {it['_id']}
                    mode = {cards.type ? cards.type : null}
                    content = {it.content ? it.content : null}
                    name = {it.name ? it.name : null}
                    price = {it.price ? it.price : null}

                />
                )
            });
        } else return (
            <div 
                key = 'nonePrice' 
                className = 'PriceContent nonePrice'>
                    Прайс-лист не найден. {/* {errorServer ? `Ошибка: ${errorServer}` : null} */}
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