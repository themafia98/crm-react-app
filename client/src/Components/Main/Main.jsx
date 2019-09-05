import React,{Fragment} from 'react';
import PropTypes from 'prop-types';
import './main.scss';

const Main = ({title}) => {

    return (
        <Fragment>
            <section key = 'main' className = 'main'>
            <div className = 'blackout'></div>
                <p className = 'main__title'>
                    {title}
                </p>
            </section>
        </Fragment>
    )
};
Main.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Main;