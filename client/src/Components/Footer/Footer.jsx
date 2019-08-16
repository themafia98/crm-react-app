import React from 'react';
import './footer.scss';
const Footer = ({footerTitle}) => {
    return (
        <footer>
            <p className = 'footer__title'>{footerTitle}</p>
        </footer>
    )
};
export default Footer;