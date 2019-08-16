import React from 'react';
import './form.scss';
const Form = ({mode}) => {

    return (
        <section className = 'feedBack container'>
            <form>
                <input className = 'form__textInput' type = 'text' placeholder = 'E-mail' />
                <input className = 'form__textInput' type = 'text' placeholder = 'Имя' />
                <input className = 'form__textInput' type = 'tel' placeholder = 'Телефон' />
                <input 
                    className = 'form__textInput form__submit' 
                    type = 'button' 
                    value = 'Бесплатная консультация' 
                />
            </form>
        </section>
    )
};
export default Form;