import React from 'react';
import eventEmitter from '../../EventEmitter';
import AJAX from '../../Utils/Utils';
import ServicesContent from '../ServicesContent/ServicesContent';
import './servicesList.scss';

class ServicesList extends React.PureComponent {

    state = {
        defaultContent: null,
        failLoadData: false,
        load: true,
    };

    setLoad = (action) => {

        if (action !== this.state.load)
        this.setState({
            ...this.state,
            load: action,
        });
    };

    refAuto = null;
    refAmoCRM = null;
    refRetailCRM = null;
    refFuncAuto = node => this.refAuto = node;
    refFuncAmoCRM = node => this.refAmoCRM = node; 
    refFuncRetailCRM = node => this.refRetailCRM = node;


    serverErrorResponse = () => {
        this.setState({
            ...this.state,
            failLoadData: true,
            load: false,
        });
    };

    getData = () => {
        let address = null;

        if (process.env.NODE_ENV === 'production')
        address = process.env.REACT_APP_S_AUTO;
        else address = 'http://localhost:3001/services/auto';

        AJAX.reset().send(address)
        .then(res => {
            if (res.statusSend && res.statusSend === 'wait')
                throw new Error ('Wait');
            if (res.ok) return res.text();
            else throw new Error ('Fail fetch');
        })
        .then(res => {
            return res.split('\n');
        })
        .then(content => {

            const defaultContent = content.map((item,index) => {
                return <p key = {index}>{item}</p>
            });

            this.setState({
                ...this.state, 
                defaultContent: defaultContent,
            });
            eventEmitter.emit('EventSetContent', {action: 'default'});
        })
        .catch(error => { 
                console.error(error.message);
                if (error.message === 'Fail fetch'){
                    this.serverErrorResponse();
                }
        });
    };


    setContentEmitter = event => {

        let action = null;

        if (event.target.value === this.refAuto.value)
            action = 'auto'
        else if (event.target.value === this.refAmoCRM.value)
            action = 'amoCRM'
        else if (event.target.value === this.refRetailCRM.value)
            action = 'retailCRM'

        eventEmitter.emit('EventSetContent', {action: action});

        event.stopPropagation();
    }


    render(){

        const {servicesType, content} = this.props;
        const {defaultContent, load} = this.state;

        const currentContent = content ? content : defaultContent;
 
        return (
            <div key = 'ServicesList' className = 'ServicesList container'>
                <div className = 'col-2 col-4  services_controllers'>
                    <input
                        ref = {this.refFuncAuto}
                        onClick = {this.setContentEmitter}
                        className = {servicesType === 'auto' ? 'controller_auto active':
                                                                'controller_auto'} 
                        type = 'button' 
                        value = 'Автоматизация продаж' 
                    />
                    <input
                        ref = {this.refFuncAmoCRM}
                        onClick = {this.setContentEmitter}
                        className = {servicesType === 'amoCRM' ? 'controller_amoCRM active': 
                                                                'controller_amoCRM'} 
                        type = 'button' 
                        value = 'Внедрнение amoCRM' 
                    />
                    <input 
                        ref = {this.refFuncRetailCRM}
                        onClick = {this.setContentEmitter}
                        className = {servicesType === 'retailCRM' ? 'controller_retailCRM active':
                                                                'controller_retailCRM'} 
                        type = 'button' 
                        value = 'Внедрнение retailCRM' 
                    />
                </div>
                <div className = 'col-9 col-8 col-7 services_content'>
                    <ServicesContent load = {load} content = {currentContent} mode = {servicesType} />
                </div>
            </div>
        )
    }

    componentDidMount = () => {

        const {servicesType} = this.props;
        const {failLoadData} = this.state;

        eventEmitter.on('EventLoadingServicesChunks', this.setLoad);

        if (!servicesType && !failLoadData) this.getData();
        else if (servicesType) this.setState({
            ...this.state,
            load: false,
        })
    };

    componentWillUnmount = () => {
        eventEmitter.off('EventLoadingServicesChunks', this.setLoad);
    };
};
export default ServicesList;