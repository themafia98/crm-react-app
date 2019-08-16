import React from 'react';
import { NavLink, withRouter  } from 'react-router-dom';

import Logo from '../Logo/Logo';

import './header.scss';

const Header = ({go, location, history, to}) => {

    const redirectHome = () => {
        history.push('/');
    };

    return (
        <header className = 'container'>
            <Logo cbRedirectHome = {go && redirectHome} go = {go} path = '/img/logo.png' />
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
                    to = '/Service'>
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

export default withRouter(Header);