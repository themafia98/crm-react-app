import React,{Fragment} from 'react';
import Header from '../../Components/Header/Header';
import './service.scss';
class Service extends React.PureComponent {

    render(){

        return (
            <Fragment>
                <Header go = {true} />
                <section className = 'Service'>
                    <p>Service</p>
                </section>
            </Fragment>
        )
    }
}

export default Service;