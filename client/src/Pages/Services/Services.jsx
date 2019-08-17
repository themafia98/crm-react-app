import React,{Fragment} from 'react';
import Header from '../../Components/Header/Header';
import './services.scss';
class Services extends React.PureComponent {

    render(){

        return (
            <Fragment>
                <Header go = {true} />
                <section className = 'Services'>
                    <p className = 'Services__title'>Услуги</p>
                </section>
            </Fragment>
        )
    }
}

export default Services;