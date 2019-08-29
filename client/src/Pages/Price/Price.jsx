import React,{Fragment} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

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

    state = {
        mode: this.props.match.params.mode,
    }

    goBack = event => {
        this.props.history.goBack();
    }

    render(){
        console.log(this.props);
        return (
            <Fragment>
                <Header go = {true} />
                <section className = 'Price'>
                    <div className = 'container'>
                        <input type = 'button' value = 'назад' onClick = {this.goBack} />
                        {
                            <PriceContent mode = {this.state.mode} />
                        }
                    </div>
                </section>
                <Footer footerTitle = 'CRM© 2019 All rights reserved' />
            </Fragment>
        )

    }
}
export default withRouter(Price);