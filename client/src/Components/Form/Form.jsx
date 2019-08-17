import React from 'react';
import './form.scss';
const Form = ({mode}) => {

    const refForm = React.createRef();
    
    const sendRequest = event => {
       const dataBody = new FormData(refForm.current);
       console.log(dataBody);
        fetch('http://localhost:3001/sendMail', {
            method: 'POST',
            body: dataBody,
        })
    }

    return (
        <section className = 'feedBack container'>
            <form ref = {refForm}>
                <input name = 'email'  className = 'form__textInput' type = 'text' placeholder = 'E-mail' />
                <input name = 'name'  className = 'form__textInput' type = 'text' placeholder = 'Имя' />
                <input name = 'number' className = 'form__textInput' type = 'tel' placeholder = 'Телефон' />
                <input
                    onClick = {sendRequest}
                    className = 'form__textInput form__submit' 
                    type = 'button' 
                    value = 'Бесплатная консультация' 
                />
            </form>
        </section>
    )
};
export default Form;