import React,{Fragment} from 'react';
import Loader from '../../Components/Loader/Loader';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {loadMiddlewarePriceCardsServices} from '../../Redux/middleware/middlewareServices';
import PriceContent from '../../Components/PriceContent/PriceContent';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

import './price.scss';

class Price extends React.PureComponent {
    
    static propTypes = {
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
    }

    static getDerivedStateFromProps = (props, state) => {
        if (props.match.params.type !== state.mode)
        return {mode: props.match.params.type}
        else return state;
    }

    state = {
        mode: this.props.match.params.type,
    }

    goBack = event => {
        this.props.history.goBack();
    }

    render(){
        const { cards: { storeCards } = null, errorServer } = this.props;
        return (
            <Fragment>
                <Header go = {true} />
                <section key = 'Price' className = 'Price'>
                    <div className = 'container'>
                        <div className = 'priceWrapperContent'>
                            <input className = 'goBack_button' type = 'button' value = 'назад' onClick = {this.goBack} />
                            { !errorServer && storeCards['length'] ?
                                <PriceContent cards = {this.props.cards}  mode = {this.state.mode} />
                                : !errorServer ?
                                <Loader loaderClass = 'loaderServicesList' />
                                : <PriceContent cards = {{}} errorServer = {errorServer} />
                            }
                        </div>
                    </div>
                </section>
                <Footer footerTitle = 'CRM© 2019 All rights reserved' />
            </Fragment>
        )

    }

    componentDidMount = () => {
        const {loadCards} = this.props;
        loadCards(this.state.mode);
    };
}

const mapStateFromProps = ({services}) => {
    return {
        cards: services.cards,
        errorServer: services.error,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadCards: action => dispatch(loadMiddlewarePriceCardsServices(action))
    }
}

export default connect(
    mapStateFromProps,
     mapDispatchToProps
)(withRouter(Price));