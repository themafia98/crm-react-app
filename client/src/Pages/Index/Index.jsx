import React, {Fragment} from 'react';

import Header from '../../Components/Header/Header';
import Main from '../../Components/Main/Main';
import Form from '../../Components/Form/Form';
import OurServices from '../../Components/OurServices/OurServices';
import WhatBest from '../../Components/WhatBest/WhatBest';
import Footer from '../../Components/Footer/Footer';
import './index.scss';
class Index extends React.PureComponent {

    render(){
        return (
            <Fragment>
                <Header />
                    <Main 
                        title = 'Внедрение CRM для малого и среднего бизнеса' 
                    />
                    <Form mode = 'index' />
                    <OurServices />
                    <WhatBest />
                <Footer footerTitle = 'CRM© 2019 All rights reserved' />
            </Fragment>
        )
    }
}

export default Index;