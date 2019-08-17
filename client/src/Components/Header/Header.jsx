import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter  } from 'react-router-dom';

import Icon from '../Icon/Icon';

import './header.scss';

const Header = ({go, history}) => {

    const redirectHome = () => {
        history.push('/');
    };

    return (
        <header className = 'container'>
            <Icon cbRedirectHome = {go && redirectHome} go = {go} path = '/img/logo.png' />
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
        </header>
    )
}

Header.propTypes = {
    go: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.bool.isRequired
    ]),
    history: PropTypes.object.isRequired,
}

export default withRouter(Header);