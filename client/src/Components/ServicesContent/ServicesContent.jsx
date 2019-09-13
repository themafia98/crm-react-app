import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader/Loader';
import eventEmitter from '../../EventEmitter';
import './servicesContent.scss';
class ServicesContent extends React.PureComponent {

    static propTypes = {
        mode: PropTypes.oneOfType([
            PropTypes.string.isRequired, PropTypes.object.isRequired // null
        ]),
    }

    state = {
        redirect: {to: '', action: false},
    }

    goPrice = event => {
        const target = event.target;

        if (target === this.auto)
        eventEmitter.emit("EventRedirectPrice",{action: 'auto'});
        else if (target === this.amoCRM)
        eventEmitter.emit("EventRedirectPrice",{action: 'amoCRM'});
        else if (target === this.retailCRM)
        eventEmitter.emit("EventRedirectPrice",{action: 'retailCRM'});

        event.stopPropagation();
    };

    auto = null;
    amoCRM = null;
    retailCRM = null;

    refAuto = node => this.auto = node;
    refAmoCRM = node => this.amoCRM = node;
    refRetailCRM = node => this.retailCRM = node;

    render(){
        const {content, mode} = this.props;
        const {load} = this.props;

        if (load) return <Loader loaderClass = 'loaderServicesList' />

        switch (mode){
            case 'auto': return (
                            <div key = 'ServicesContentAuto' className = 'ServicesContent'>
                                <h3 className = 'servicesContent__title'>Автоматизация продаж</h3>
                                    <input
                                        ref = {this.refAuto}
                                        onClick = {this.goPrice}
                                        type = 'button' 
                                        className = 'servicesContent__priceButton' 
                                        value = 'Прайс-лист по автоматизации'
                                    />
                                {content}
                            </div>
                        )
            case 'amoCRM': return (
                            <div key = 'ServicesContentAmo' className = 'ServicesContent'>
                                <h3 className = 'servicesContent__title '>amoCRM</h3>
                                    <input
                                        ref = {this.refAmoCRM}
                                        onClick = {this.goPrice}
                                        type = 'button' 
                                        className = 'servicesContent__priceButton' 
                                        value = 'Все цены на внедрение amoCRM'
                                    />
                                {content}
                            </div>
                        )  
            case 'retailCRM': return (
                            <div key = 'ServicesContentRetail' className = 'ServicesContent'>
                                <h3 className = 'servicesContent__title '>retailCRM</h3>
                                    <input
                                        ref = {this.refRetailCRM}
                                        onClick = {this.goPrice}
                                        type = 'button' 
                                        className = 'servicesContent__priceButton' 
                                        value = 'Все цены на внедрение retailCRM'
                                    />
                                {content}
                            </div>
                        )   
            default: return (
                <div className = 'FailLoadData'>
                    <p>Server is not responding</p>
                </div>
            )
        }
    }

    componentDidUpdate = (prevProps) => {

        if (prevProps !== this.props)
            this.setState({
                ...this.state,
                mode: this.props.mode,
                content: this.props.content
            });
    }
}
export default ServicesContent;