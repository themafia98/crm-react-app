import React,{Fragment} from 'react';
import AJAX from '../../Utils/Utils';
import Loader from '../../Components/Loader/Loader';
import withScroll from '../../Components/withScroll';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import ContentAbout from '../../Components/AboutComponents/ContentAbout';
import RoadCareer from '../../Components/AboutComponents/RoadCareer';
import './about.scss';
class About extends React.PureComponent {

    state = {
        failLoadData: false,
        load: true,
        road: null,
        aboutMe: null,
    }

    serverErrorResponse = () => {
        this.setState({
            ...this.state,
            failLoadData: true,
            load: false,
        });
    };

    componentDidMount = async () => {
        const { road, aboutMe } = this.state;

        if (!road && !aboutMe){

            let road = null;
            let aboutMe = null;

            let address = null;

            if (process.env.NODE_ENV === 'production') address = process.env.REACT_APP_ABOUT;
            else address = 'http://localhost:3001/api/aboutData/main';

            await AJAX.reset().send(address).then(res => {
                    debugger;
                if (res.statusSend && res.statusSend === 'wait')
                    throw new Error ('Wait');
                if (res.ok) return res.text();
                else throw new Error ('Fail fetch');
            }).then(res => road = res)
            .then(async res => {
                if (process.env.NODE_ENV === 'production') address = process.env.REACT_APP_ABOUT_ME;
                else address = 'http://localhost:3001/api/aboutData/aboutMe';
                await AJAX.reset().send(address).then(res => {
                    debugger;
                    if (res.statusSend && res.statusSend === 'wait')
                        throw new Error ('Wait');
                    if (res.ok) return res.text();
                    else throw new Error ('Fail fetch');

                }).then(res => aboutMe = res)
                .then(() => {    
                    this.setState({
                        road: road,
                        aboutMe: aboutMe,
                    })
                });
            })
            .catch(error => { 
                console.error(error.message);
                if (error.message === 'Fail fetch'){
                    return this.serverErrorResponse();
                }
            });
        }
    };

    render(){
        const { road, aboutMe, failLoadData, load } = this.state;
        return (
            <Fragment>
                <Header go = {true} />
                <section key = 'About' className = 'About container'>
                    <p className = 'About__title'>О нас</p>
                    {(!road || !aboutMe) && load  ? (
                        <Loader 
                           loaderClass = 'Loader'
                        /> )
                    : null}
                    <ContentAbout   
                        photoUrl = {process.env.PUBLIC_URL + '/img/demo__about.jpg'}
                        content = {!failLoadData ? aboutMe : 'Server not response'}
                    />
                    <RoadCareer content = {!failLoadData ? road : 'Server not response'} />
                </section>
                    <Footer footerTitle = 'CRM© 2019 All rights reserved' />
            </Fragment>
        )
    }
}

export default withScroll(About);