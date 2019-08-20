import React from 'react';
import PropTypes from 'prop-types';
import './servicesContent.scss';
class ServicesContent extends React.PureComponent {

    static propTypes = {
        mode: PropTypes.oneOfType([
            PropTypes.string.isRequired, PropTypes.object.isRequired // null
        ]),
    }

    render(){
        const {content, mode} = this.props;
        switch (mode){
            case 'auto': return (
                            <div className = 'ServicesContent'>
                                <h3 className = 'servicesContent__title'>Автоматизация продаж</h3>
                                {content}
                            </div>
                        )
            case 'amoCRM': return (
                            <div className = 'ServicesContent'>
                                <h3 className = 'servicesContent__title '>amoCRM</h3>
                                {content}
                            </div>
                        )  
            case 'retailCRM': return (
                            <div className = 'ServicesContent'>
                                <h3 className = 'servicesContent__title '>retailCRM</h3>
                                {content}
                            </div>
                        )   
            default: return <div className = 'notFound'><p>Content not found</p></div>     
        }
    }
}
export default ServicesContent;