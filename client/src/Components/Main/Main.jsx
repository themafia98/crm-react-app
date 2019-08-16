import React,{Fragment} from 'react';

import './main.scss';
const Main = ({title}) => {

    return (
        <Fragment>
            <div className = 'blackout'></div>
            <section className = 'main'>
                <p className = 'main__title'>
                    {title}
                </p>
            </section>
        </Fragment>
    )

}

export default Main;