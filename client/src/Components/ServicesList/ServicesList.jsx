import React from 'react';
import isFetch from 'isomorphic-fetch';
import './servicesList.scss';
import ServicesContent from '../ServicesContent/ServicesContent';
class ServicesList extends React.PureComponent {

    state = {
        active: null,
        content: null,
    };

    autoMode = event => { 

        if (process.env.NODE_ENV === 'production')
        isFetch('')
        else isFetch('http://localhost:3001/services/auto')
        .then(res => res.text())
        .then(res => {
            return res.split('\n');
        })
        .then(content =>{
            this.setState({
                ...this.state, 
                active: 'auto', 
                content: content.map((item,index) => {
                    return <p key = {index}>{item}</p>
                })
            });
        })
        .catch(error => console.error(error));

    };
    amoCRRMode = event => {  
        if (process.env.NODE_ENV === 'production')
        isFetch('')
        else isFetch('http://localhost:3001/services/amoCRM')
            .then(res => res.text())
            .then(res => {
                return res.split('\n');
            })
            .then(content =>{
                this.setState({
                    ...this.state, 
                    active: 'amoCRM', 
                    content: content.map((item,index) => {
                        return <p key = {index}>{item}</p>
                    })
                });
            })
        .catch(error => console.error(error));
    };

    retailCRMode  = event => {  
        if (process.env.NODE_ENV === 'production')
        isFetch('')
        else isFetch('http://localhost:3001/services/retailCRM')
            .then(res => res.text())
            .then(content =>{
                this.setState({
                    ...this.state, 
                    active: 'retailCRM', 
                    content: <p>{content}</p>
                });
            })
        .catch(error => console.error(error));
    };
    
    render(){
        const {active, content} = this.state;
        return (
            <div className = 'ServicesList container'>
                <div className = 'col-2 col-4  services_controllers'>
                    <input
                        onClick = {this.autoMode}
                        className = {active === 'auto' ? 'controller_auto active':
                                                                'controller_auto'} 
                        type = 'button' 
                        value = 'Автоматизация продаж' 
                    />
                    <input
                        onClick = {this.amoCRRMode}
                        className = {active === 'amoCRM' ? 'controller_amoCRM active': 
                                                                'controller_amoCRM'} 
                        type = 'button' 
                        value = 'Внедрнение amoCRM' 
                    />
                    <input 
                        onClick = {this.retailCRMode}
                        className = {active === 'retailCRM' ? 'controller_retailCRM active':
                                                                'controller_retailCRM'} 
                        type = 'button' 
                        value = 'Внедрнение retailCRM' 
                    />
                </div>
                <div className = 'col-10 col-7 services_content'>
                    <ServicesContent content = {content} mode = {active} />
                </div>
            </div>
        )
    }

    componentDidMount = () => {
        if (!this.state.active){
            if (process.env.NODE_ENV === 'production')
                isFetch('')
            else isFetch('http://localhost:3001/services/auto')
                .then(res => res.text())
                .then(res => {
                    return res.split('\n');
                })
                .then(content =>{
                    this.setState({
                        ...this.state, 
                        active: 'auto', 
                        content: content.map((item,index) => {
                            return <p key = {index}>{item}</p>
                        })
                    });
                })
            .catch(error => console.error(error));
        };
    }
};
export default ServicesList;