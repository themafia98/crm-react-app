import React,{Fragment} from 'react';
import Header from '../../Components/Header/Header';
import './contact.scss';
class Contact extends React.PureComponent {

    render(){

        return (
            <Fragment>
                <Header go = {true} />
                <section className = 'Contanct'>
                    <p>Contact</p>
                </section>
            </Fragment>
        )
    }
}

export default Contact;