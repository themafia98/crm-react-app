import React,{Fragment} from 'react';
import PropTypes from 'prop-types';

import PriceContent from './PriceContent';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

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

    render(){
        console.log(this.props);
        return (
            <Fragment>
                <Header go = {true} />
                {
                    <PriceContent mode = {this.state.mode} />
                }
                <Footer footerTitle = 'CRM© 2019 All rights reserved' />
            </Fragment>
        )

    }
}
export default Price;