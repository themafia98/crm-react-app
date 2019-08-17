import React,{Fragment} from 'react';
import Header from '../../Components/Header/Header';
import './contact.scss';
import InformationContact from '../../Components/ContactComponents/InformationContact';
import Form from '../../Components/Form/Form';
class Contact extends React.PureComponent {

    render(){

        return (
            <Fragment>
                <Header go = {true} />
                <section className = 'Contact container'>
                <div className = 'Contact__info'>
                    <h3 className = 'Contact__info__title'>Напишите нам</h3>
                    <p className = 'Contact__info__content'>
                        Пишите, звоните, стучитесь в скайп. 
                        У нас все консультации по проекту - бесплатны!
                    </p>
                </div>
                <div className = 'Contact__content'>
                    <div className = 'col-6'>
                        <InformationContact />
                    </div>
                    <div className = 'col-6'>
                       <Form mode = 'contact' />
                    </div>
                </div>
                </section>
            </Fragment>
        )
    }
}

export default Contact;