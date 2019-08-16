import React from 'react';
import { NavLink, withRouter  } from 'react-router-dom';

import Logo from '../Logo/Logo';

import './header.scss';

const Header = ({go, location, history}) => {

    const redirectHome = () => {
        history.push('/');
    };

    return (
        <header>
            <Logo cbRedirectHome = {go && redirectHome} go = {go} path = '/img/logo.png' />
            <ul className = 'menu'>
                <NavLink  to = {'/'}>
                    <li>Главная</li>
                </NavLink >
                <NavLink  to = '/Service'>
                    <li>Услуги</li>
                </NavLink >
                <NavLink  to = '/About'>
                    <li>О нас</li>
                </NavLink >
                <NavLink  to = '/Contact'>
                    <li>Контакты</li>
                </NavLink >
            </ul>
        </header>
    )
}

export default withRouter(Header);