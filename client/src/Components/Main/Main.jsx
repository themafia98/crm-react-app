import React,{Fragment, useState, useEffect} from 'react';
import eventEmitter from '../../EventEmitter';
import PropTypes from 'prop-types';
import './main.scss';

const Main = ({title}) => {

    const [haveScroll, setHaveScroll] = useState(false);

    const setBufferSizeForScroller = eventItem => {
        if (eventItem === 'fixed') setHaveScroll(true);
        else setHaveScroll(false);
    };

    const didMount = () => {
        eventEmitter.on("EventSetBufferForScroller", setBufferSizeForScroller);
        return () => eventEmitter.off('EventSetBufferForScroller', setBufferSizeForScroller);
    };

    useEffect(didMount, []);

    const classNameAdditional = haveScroll ? 'mainDetectedScroller' : null; 

    return (
        <Fragment>
            <section key = 'main' className = {['main', classNameAdditional].join(' ')}>
            <div className = {['blackout', classNameAdditional].join(' ')}></div>
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