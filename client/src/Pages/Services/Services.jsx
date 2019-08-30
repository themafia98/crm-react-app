import React,{Fragment} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import isFetch from 'isomorphic-fetch';

import eventEmitter from '../../EventEmitter';
import {updateServicesType} from '../../Redux/actions/servicesActions';

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


    setContent = ({action}) => { /** @eventEmitter */

        const {dispatch, servicesType} = this.props;
        if (servicesType === action) return;
        if (action === 'default') action = 'auto';

        let address = null;
        if (process.env.NODE_ENV === 'production')
        address = `${process.env.REACT_APP_SERVICES}${action}`;
        else address = `http://localhost:3001/services/${action}`;
        
            isFetch(address)
            .then(res => res.text())
            .then(res => {
                return res.split('\n');
            })
            .then(content =>{
                dispatch(updateServicesType({
                    content: content,
                    servicesType: action
                }))
            })
            .catch(error => console.error(error));
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
    }
};

export default connect(mapStateFromProps)(withScroll(withRouter(Services)));