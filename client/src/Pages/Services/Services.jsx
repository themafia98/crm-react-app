import React,{Fragment} from 'react';
import eventEmitter from '../../EventEmitter';
import ServicesList from '../../Components/ServicesList/ServicesList';
import withScroll from '../../Components/withScroll';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import './services.scss';
class Services extends React.PureComponent {

    state = {
        priceList: ''
    };

    showPriceList = ({action}) => {
        if (this.state.priceList !== action)
        this.setState({
            ...this.state,
            priceList: action
        })
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

export default withScroll(Services);