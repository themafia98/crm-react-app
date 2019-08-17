import React from 'react';
import PropTypes from 'prop-types';
import './footer.scss';
const Footer = ({footerTitle}) => {
    return (
        <footer>
            <p className = 'footer__title'>{footerTitle}</p>
        </footer>
    )
};
Footer.propTypes = {
    footerTitle: PropTypes.string.isRequired
}
export default Footer;