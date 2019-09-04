import React from 'react';
import eventEmitter from '../../EventEmitter';
import ErrorPage from './ErrorPage';

class ErrorBoundary extends React.PureComponent {

    state = {
        isError: false,
        error: null
    };

    static getDerivedStateFromError(error) {
        return { isError: true, error: error };
    };

    componentDidCatch = (error, errorInfo) => {
        console.error(errorInfo);
    };

    clearErrorState = eventItem => {
        this.setState({
            ...this.state,
            isError: eventItem.isError,
            error: eventItem.error
        })
    };

    render(){

        if (this.state.isError) return <ErrorPage error = {this.state.error.message} />
        return this.props.children;
    };

    componentDidMount = () => {
        eventEmitter.on('EventRestoreError', this.clearErrorState);
    }

    componentWillUnmount = () => {
        eventEmitter.off('EventRestoreError', this.clearErrorState);
    }
};

export default ErrorBoundary;