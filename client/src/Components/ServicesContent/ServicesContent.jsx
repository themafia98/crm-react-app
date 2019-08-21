import React from 'react';
import PropTypes from 'prop-types';
import eventEmitter from '../../EventEmitter';
import './servicesContent.scss';
class ServicesContent extends React.PureComponent {

    static propTypes = {
        mode: PropTypes.oneOfType([
            PropTypes.string.isRequired, PropTypes.object.isRequired // null
        ]),
    }

    goPriceAuto = event => {
        eventEmitter.emit("EventRedirectPrice",{action: 'auto', type: 'redirect'});
        event.stopPropagation();
    };

    goPriceAmoCRM = event => {
        eventEmitter.emit("EventRedirectPrice",{action: 'amoCRM', type: 'redirect'});
        event.stopPropagation();
    };

    goPriceRetailCRM = event => {
        eventEmitter.emit("EventRedirectPrice",{action: 'retailCRM', type: 'redirect'});
        event.stopPropagation();
    };

    render(){
        const {content, mode} = this.props;

        switch (mode){
            case 'auto': return (
                            <div className = 'ServicesContent'>
                                <h3 className = 'servicesContent__title'>Автоматизация продаж</h3>
                                <input
                                    onClick = {this.goPriceAuto}
                                    type = 'button' 
                                    className = 'servicesContent__priceButton' 
                                    value = 'Прайс-лист по автоматизации'
                                />
                                {content}
                            </div>
                        )
            case 'amoCRM': return (
                            <div className = 'ServicesContent'>
                                <h3 className = 'servicesContent__title '>amoCRM</h3>
                                <input
                                    onClick = {this.goPriceAmoCRM}
                                    type = 'button' 
                                    className = 'servicesContent__priceButton' 
                                    value = 'Все цены на внедрение amoCRM'
                                />
                                {content}
                            </div>
                        )  
            case 'retailCRM': return (
                            <div className = 'ServicesContent'>
                                <h3 className = 'servicesContent__title '>retailCRM</h3>
                                <input 
                                    onClick = {this.goPriceRetailCRM}
                                    type = 'button' 
                                    className = 'servicesContent__priceButton' 
                                    value = 'Все цены на внедрение retailCRM'
                                />
                                {content}
                            </div>
                        )   
            default: return <div className = 'notFound'><p>Content not found</p></div>     
        }
    }
}
export default ServicesContent;