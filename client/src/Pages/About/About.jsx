import React,{Fragment} from 'react';
import Header from '../../Components/Header/Header';
import './about.scss';
class About extends React.PureComponent {

    render(){

        return (
            <Fragment>
                <Header go = {true} />
                <section className = 'About'>
                    <p>About</p>
                </section>
            </Fragment>
        )
    }
}

export default About;