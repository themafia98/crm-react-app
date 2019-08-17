import React,{useState} from 'react';
import './form.scss';
const Form = ({mode}) => {

    
    const [disabled, setDisabled] = useState(false);
    const refForm = React.createRef();
    
    const sendRequest = event => {
        setDisabled(true);
        fetch('http://localhost:3001/sendMail', {
            method: 'POST',
            body: new FormData(refForm.current),
        })
        .then(res => { 
            if (res.status === 200 || res.status === 400) setDisabled(false);
            if (res.status === 400) throw new Error('request invalid');
            else console.log('Request send!');
        })
        .catch(error => {
            console.error(error);
        });
    }

    return (
        <section className = 'feedBack container'>
            <form ref = {refForm}>
                <input 
                    required 
                    name = 'email'  
                    className = 'form__textInput' 
                    type = 'email' 
                    placeholder = 'E-mail' 
                />
                <input 
                    required 
                    name = 'name'  
                    className = 'form__textInput' 
                    type = 'text' 
                    placeholder = 'Имя' 
                />
                <input 
                    required 
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
            </form>
        </section>
    )
};
export default Form;