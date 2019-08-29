import React,{Fragment} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import eventEmitter from '../../EventEmitter';
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

        this.props.history.push(`Services/Price/${action}`);
    };

    render(){
        return (
            <Fragment>
                <Header go = {true} />
                <section className = 'Services'>
                    <p className = 'Services__title'>Услуги</p>
                    <ServicesList />
                </section>
                <Footer footerTitle = 'CRM© 2019 All rights reserved' />
            </Fragment>
        )
    }

    componentDidMount = () => {
        eventEmitter.on('EventRedirectPrice', this.showPriceList);
    }

    componentWillUnmount = () => {
        eventEmitter.off('EventRedirectPrice', this.showPriceList);
    }
}

export default withScroll(withRouter(Services));