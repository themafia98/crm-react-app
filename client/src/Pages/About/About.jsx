import React,{Fragment} from 'react';
import withScroll from '../../Components/withScroll';
import dataAbout from '../../dataAbout.json';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import ContentAbout from '../../Components/AboutComponents/ContentAbout';
import RoadCareer from '../../Components/AboutComponents/RoadCareer';
import './about.scss';
class About extends React.PureComponent {

    state = {
        "road": dataAbout.road,
        "aboutMe": dataAbout.aboutMe,
    }

    render(){

        return (
            <Fragment>
                <Header go = {true} />
                <section className = 'About container'>
                    <p className = 'About__title'>О нас</p>
                    <ContentAbout   
                        photoUrl = {'/img/demo__about.jpg'}
                        content = {this.state.aboutMe}
                    />
                    <RoadCareer content = {this.state.road} />
                </section>
                    <Footer footerTitle = 'CRM© 2019 All rights reserved' />
            </Fragment>
        )
    }
}

export default withScroll(About);