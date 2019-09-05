import React,{Fragment} from 'react';
import withScroll from '../../Components/withScroll';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import InformationContact from '../../Components/ContactComponents/InformationContact';
import Form from '../../Components/Form/Form';

import './contact.scss';
import ModalWindow from '../../Components/ModalWindow/ModalWindow';
import eventEmitter from '../../EventEmitter';

class Contact extends React.PureComponent {

    state = {
        modalPolicyActive: false,
        modalMode: null,
    }

    openModal = eventItem => {
        const {active, action} = eventItem;
        this.setState({
            ...this.state,
            modalPolicyActive: active,
            modalMode: action
        });
    };

    render(){ 
        const {modalMode,modalPolicyActive} = this.state;
        return (
            <Fragment>
                <Header go = {true} />
                {modalPolicyActive && <ModalWindow mode = {modalMode} />}
                <section key = 'Contact' className = 'Contact container'>
                <div className = 'Contact__info'>
                    <h3 className = 'Contact__info__title'>Напишите нам</h3>
                    <p className = 'Contact__info__content'>
                        Пишите, звоните, стучитесь в скайп. 
                        У нас все консультации по проекту - бесплатны!
                    </p>
                </div>
                <div className = 'Contact__content'>
                    <div className = 'col-6 col-mobile contact-text--center'>
                        <InformationContact />
                    </div>
                    <div className = 'col-6 col-mobile'>
                       <Form mode = 'contact' />
                    </div>
                </div>
                </section>
            <Footer footerTitle = 'CRM© 2019 All rights reserved' />
            </Fragment>
        )
    }

    componentDidMount = () => {
        eventEmitter.on('EventOpenModal', this.openModal);
    }

    componentWillUnmount = () => {
        eventEmitter.off('EventOpenModal', this.openModal);
    }
}

export default withScroll(Contact);