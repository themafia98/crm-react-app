import React,{Fragment} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import eventEmitter from '../../EventEmitter';
import {
    loadMiddlewareServices, 
    loadMiddlewarePriceCardsServices
} from '../../Redux/middleware/middlewareServices';

import ServicesList from '../../Components/ServicesList/ServicesList';
import withScroll from '../../Components/withScroll';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import './services.scss';

class Services extends React.PureComponent {

    static propTypes = {
        location: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    }

    showPriceList = ({action}) => {
        const {loadCards,cards} = this.props;
        if (cards.type !== action)
        loadCards(action)
        .then(res => {
            if (res)
            this.props.history.push(`Services/Price/${action}`);
        })
        .catch(error => console.error(error.message));
        else this.props.history.push(`Services/Price/${action}`);
    };


    setContent = ({action}) => { /** @eventEmitter */

        const {servicesType, loadServices} = this.props;
        if (servicesType === action) return;
        eventEmitter.emit('EventLoadingServicesChunks',true);
        loadServices(action).then(res => {
            if (res) 
            eventEmitter.emit('EventLoadingServicesChunks',false);
        })
        .catch(errror => console.error(errror));
    };

    render(){
        return (
            <Fragment>
                <Header go = {true} />
                <section className = 'Services'>
                    <p className = 'Services__title'>Услуги</p>
                    <ServicesList 
                        servicesType = {this.props.servicesType} 
                        content = {this.props.content}
                        />
                </section>
                <Footer footerTitle = 'CRM© 2019 All rights reserved' />
            </Fragment>
        )
    }

    componentDidMount = () => {
        eventEmitter.on('EventRedirectPrice', this.showPriceList);
        eventEmitter.on('EventSetContent', this.setContent);
    };

    componentWillUnmount = () => {
        eventEmitter.off('EventRedirectPrice', this.showPriceList);
        eventEmitter.off('EventSetContent', this.setContent);
    };
}

const mapStateFromProps = ({services}) => {
    return { 
        servicesType: services.servicesType,
        content: services.content ? services.content.map((item,index) => {
            return <p key = {index}>{item}</p>
        }) : services.content,
        cards: services.cards,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadServices: action => dispatch(loadMiddlewareServices(action)),
        loadCards: action => dispatch(loadMiddlewarePriceCardsServices(action))
    }
}

export default connect(
    mapStateFromProps,
    mapDispatchToProps
    )(withScroll(withRouter(Services)));