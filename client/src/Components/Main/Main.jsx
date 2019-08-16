import React,{Fragment} from 'react';

import './main.scss';
const Main = ({title}) => {

    return (
        <Fragment>
            <section className = 'main'>
            <div className = 'blackout'></div>
                <p className = 'main__title'>
                    {title}
                </p>
            </section>
        </Fragment>
    )

}

export default Main;