import React,{useState} from 'react';
import isFetch from 'isomorphic-fetch';
import './contactComponents.scss';
const ContactForm = props => {

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');
    const refForm = React.createRef();

    const sendRequestQuestion = event => {
        const form = refForm.current;
        const isFull = form.email.value && form.name.value  && form.number.value && form.text.value;
        if (!isFull) {
            console.warn('Fail,isFull - false');
            return setError('Не все поля заполнены!');
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
        <form ref = {refForm}>
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
            {error && <span className = 'error'>{error}</span>}
            <input
                onClick = {sendRequestQuestion}
                disabled = {disabled}
                type = 'button' 
                value = 'Отправить' 
            />
            <p className = 'policy'>
                Нажимая на кнопку, вы даете согласие 
                на обработку персональных данных 
                и соглашаетесь c политикой конфиденциальности
            </p>
        </form>
    )
}
export default ContactForm;