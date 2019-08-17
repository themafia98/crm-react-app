import React,{useState} from 'react';
import './form.scss';
const Form = ({mode}) => {

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');
    const refForm = React.createRef();
    
    const sendRequest = event => {
        const form = refForm.current;
        const isFull = form.email.value && form.name.value  && form.number.value;
        if (!isFull) {
            console.warn('Fail,isFull - false');
            return setError('Не все поля заполнены!');
        } 
        setDisabled(true);
        let adress = 'http://localhost:3001/mail/sendMailConsultation';
        if (process.env.NODE_ENV === 'production')
        adress = process.env.REACT_APP_CONSUL;
        fetch(adress, {
            method: 'POST',
            body: new FormData(refForm.current),
        })
        .then(res => { 
            if (res.status === 200) {
                setDisabled(false);
                setError('');
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

    return (
        <section className = 'feedBack container'>
            <form ref = {refForm}>
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
                {error && <span className = 'error'>{error}</span>}
            </form>
        </section>
    )
};
export default Form;