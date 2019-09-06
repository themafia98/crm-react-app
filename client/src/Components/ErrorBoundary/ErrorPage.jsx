import React from 'react';
import eventEmitter from '../../EventEmitter';
import './ErrorBoundary.scss';

const ErrorPage = ({error}) => {
    
    const restore = event => {
        eventEmitter.emit('EventRestoreError', {isError: false, error: null});
        event.stopPropagation();
    }

    return (
        <div className = 'ErrorBoundary'>
            <h1>Error page</h1>
            <p className = 'ErrorInfo'>{error}</p>
            <input onClick = {restore} type = 'button' value = 'Восстановить' />
        </div>
    )
};

export default ErrorPage;