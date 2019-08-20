import React from 'react';
import PropTypes from 'prop-types';
import './servicesContent.scss';
class ServicesContent extends React.PureComponent {

    static propTypes = {
        mode: PropTypes.string.isRequired,
    }

    render(){

        switch (this.props.mode){
            case 'auto': return (
                            <div className = 'ServicesContent'>
                                <p>auto</p>
                                <p>Testdddddddddddddddddddddddddddddddddddddd</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                            </div>
                        )
            case 'amoCRM': return (
                            <div className = 'ServicesContent'>
                                <p>amoCRM</p>
                                <p>Testdddddddddddddddddddddddddddddddddddddd</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                            </div>
                        )  
            case 'retailCRM': return (
                            <div className = 'ServicesContent'>
                                <p>retailCRM</p>
                                <p>Testdddddddddddddddddddddddddddddddddddddd</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                                <p>Test</p>
                            </div>
                        )   
            default: return <div className = 'notFound'><p>Content not found</p></div>     
        }
    }
}
export default ServicesContent;