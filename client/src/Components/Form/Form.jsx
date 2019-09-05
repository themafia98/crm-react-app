import React,{useState,Fragment} from 'react';
import PropTypes from 'prop-types';
import eventEmitter from '../../EventEmitter';
import isFetch from 'isomorphic-fetch';
import './form.scss';
const Form = ({mode}) => {

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');
    const [done, setDone] = useState(false);
    const refForm = React.createRef();

    
    const validate = (data) => {
        const isEmail = /\w{1,18}@\w{1,18}\.\w{1,10}/.test(data.email);
        const isName = /^\D+$/g.test(data.name);
        const isNumber = /^\+?\d{3,10}(\(\d+\))?\d{3,10}$/.test(data.number);

        if (isEmail && isName && isNumber) return true;
        else return false;
    };

    const openModalPolicy = event => {

        eventEmitter.emit('EventOpenModal', {action: 'policy', active: true});
        event.stopPropagation();
    }
    
    const sendRequest = event => {

        setDone(false);

        const form = refForm.current;

        if (!form) return;
        
        const isFull = form.email.value && form.name.value  && form.number.value;

        const isValid = validate({
            email:  form.email.value,
            name: form.name.value,
            number: form.number.value,
        });

        if (!isFull) {
            return setError('Не все поля заполнены!');
        } else if (!isValid){
            return setError('Формат формы не соблюден!');
        }

        setDisabled(true);
        let adress = 'http://localhost:3001/mail/sendMailConsultation';
        if (process.env.NODE_ENV === 'production')
        adress = process.env.REACT_APP_CONSUL;
        isFetch(adress, {
            method: 'POST',
            body: new FormData(refForm.current),
        })
        .then(res => { 
            if (res.status === 200) {
                setDisabled(false);
                setError('');
                setDone(true);
            }
            else if (res.status === 400) 
                throw new Error('Ошибка отправки запроса!');
        })
        .catch(error => {
            setDisabled(false);
            console.error(error.message);
            setError(error.message);
        });
    }

    const sendRequestQuestion = event => {

        setDone(false);

        const form = refForm.current;
        const isFull = form.email.value && form.name.value  && form.number.value && form.text.value;
        
        const isValid = validate({
            email:  form.email.value,
            name: form.name.value,
            number: form.number.value,
        });

        if (!isFull) {
            return setError('Не все поля заполнены!');
        } else if (!isValid){
            return setError('Формат формы не соблюден!');
        }
        setDisabled(true);
        let adress = 'http://localhost:3001/mail/sendMailQuestion';
        if (process.env.NODE_ENV === 'production')
        adress = process.env.REACT_APP_QUESTION;
        isFetch(adress, {
            method: 'POST',
            body: new FormData(refForm.current),
        })
        .then(res => { 
            if (res.status === 200) {
                setDisabled(false);
                setError('');
                setDone(true);
                console.log('Request send!');
            }
            else if (res.status === 400) 
                throw new Error('Ошибка отправки запроса!');
        })
        .catch(error => {
            setDisabled(false);
            console.error(error.message);
            setError(error.message);
        });
    }

    if (mode === 'index'){
        return (
            <section key = 'fromFeedBack' className = 'feedBack container'>
                <form className = {mode} ref = {refForm}>
                    <input 
                        name = 'email'  
                        className = 'form__textInput' 
                        type = 'email' 
                        placeholder = 'E-mail' 
                    />
                    <input 
                        name = 'name'  
                        className = 'form__textInput' 
                        type = 'text' 
                        placeholder = 'Имя' 
                    />
                    <input 
                        name = 'number' 
                        className = 'form__textInput' 
                        type = 'tel' 
                        placeholder = 'Телефон' 
                    />
                    <input
                        onClick = {sendRequest}
                        disabled = {disabled}
                        className = 'form__textInput form__submit' 
                        type = 'button' 
                        value = 'Бесплатная консультация' 
                    />
                    {done && <span className = 'done'>Письмо отправлено, мы скоро ответим!</span>}
                    {error && <span className = 'error'>{error}</span>}
                </form>
            </section>
        )
    } else if (mode === 'contact'){
        return (
            <form key = 'formContact' className = {mode} ref = {refForm}>
                <input 
                    name = 'name' 
                    type = 'text' 
                    placeholder = 'Имя' 
                />
                <input 
                    name = 'email' 
                    type = 'text' 
                    placeholder = 'E-mail' 
                />
                <input 
                    name = 'number' 
                    type = 'text' 
                    placeholder = 'Телефон' 
                />
                <textarea 
                    name = 'text'  
                    type = 'text'
                    placeholder = 'Ваш вопрос' 
                />
                {done && <span className = 'done'>Письмо отправлено, мы скоро ответим!</span>}
                {error && <span className = 'error'>{error}</span>}
                <input
                    onClick = {sendRequestQuestion}
                    disabled = {disabled}
                    type = 'button' 
                    value = 'Отправить' 
                />
                <p className = 'policy contact-text--center'>
                    Нажимая на кнопку, вы даете согласие 
                    на обработку персональных данных 
                    и соглашаетесь c <span
                        onClick = {openModalPolicy} 
                        className = 'policy'>
                         политикой конфиденциальности
                    </span>
                </p>
            </form>
        )
    } else return <Fragment></Fragment>
};

Form.propTypes = {
    mode: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.bool.isRequired
    ])
};

export default Form;