import React, {Fragment} from 'react';

import Header from '../../Components/Header/Header';
import Main from '../../Components/Main/Main';

import './index.scss';
class Index extends React.PureComponent {

    render(){

        return (
            <Fragment>
                <Header />
                   <Main title = 'Внедрение ZOHO CRM для малого и среднего бизнеса' />
            </Fragment>
        )
    }
}

export default Index;