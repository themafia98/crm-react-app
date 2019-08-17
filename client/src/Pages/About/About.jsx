import React,{Fragment} from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import ContentAbout from '../../Components/AboutComponents/ContentAbout';
import RoadCareer from '../../Components/AboutComponents/RoadCareer';
import './about.scss';
class About extends React.PureComponent {

    render(){

        return (
            <Fragment>
                <Header go = {true} />
                <section className = 'About container'>
                    <p className = 'About__title'>О нас</p>
                    <ContentAbout   
                        photoUrl = {'/img/demo__about.jpg'}
                        content = {`It is a long established fact that a reader will be 
                            distracted by the readable content of a page when looking 
                            at its layout. The point of using Lorem Ipsum 
                            is that it has a more-or-less normal distribution 
                            of letters, as opposed to using 'Content here.`}
                    />
                    <RoadCareer />
                </section>
                    <Footer footerTitle = 'CRM© 2019 All rights reserved' />
            </Fragment>
        )
    }
}

export default About;