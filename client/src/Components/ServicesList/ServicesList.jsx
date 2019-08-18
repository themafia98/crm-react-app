import React from 'react';
import './servicesList.scss';
import ServicesContent from '../ServicesContent/ServicesContent';
class ServicesList extends React.PureComponent {

    state = {
        active: 'auto'
    };

    autoMode = event => this.setState({...this.state, active: 'auto'});
    amoCRRMode = event => this.setState({...this.state, active: 'amoCRM'});
    retailCRMode = event => this.setState({...this.state, active: 'retailCRM'});
    
    render(){
        const {active} = this.state;
        return (
            <div className = 'ServicesList container'>
                <div className = 'col-6 services_controllers'>
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
                <div className = 'col-6'>
                    <ServicesContent mode = {active} />
                </div>
            </div>
        )
    }
};
export default ServicesList;