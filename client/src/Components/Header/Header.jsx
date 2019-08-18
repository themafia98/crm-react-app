import React from 'react';
import PropTypes from 'prop-types';
import mainStreamEvents from '../../EventEmitter';
import { NavLink, withRouter  } from 'react-router-dom';

import Icon from '../Icon/Icon';

import './header.scss';

class Header extends React.PureComponent {

    static propTypes = {
        go: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.bool.isRequired
        ]),
        history: PropTypes.object.isRequired,
    }

    state = {
        fixed: null
    }

    fixed = eventItem => {
       if (this.state.fixed !== eventItem.action){
           this.setState({
               ...this.state,
               fixed: eventItem.action
           });
       }
    };


    redirectHome = () => {
        const {history} = this.props;
        history.push('/');
    };

    render(){
        const {go} = this.props;
        const {fixed} = this.state;
        return (
            <header className = {!fixed ? null : 'fixed'}>
                <div className = 'container header-flex'>
                    <Icon cbRedirectHome = {go && this.redirectHome} go = {go} path = '/img/logo.png' />
                    <ul className = 'menu'>
                        <NavLink 
                            exact
                            activeClassName="selected"  
                            to = {'/'}
                        >
                            <li>Главная</li>
                        </NavLink >
                        <NavLink  
                            activeClassName="selected"  
                            to = '/Services'>
                            <li>Услуги</li>
                        </NavLink>
                        <NavLink 
                            activeClassName="selected"  
                            to = '/About'
                        >
                            <li>О нас</li>
                        </NavLink >
                        <NavLink 
                            activeClassName="selected"
                            to = '/Contact'
                        >
                            <li>Контакты</li>
                        </NavLink >
                    </ul>
                </div>
            </header>
        )
    }

    componentDidMount = () => {
        mainStreamEvents.on('EventMenu',this.fixed);
    };

    componentWillUnmount = () => {
        mainStreamEvents.off('EventMenu',this.fixed);
    };
}

export default withRouter(Header);