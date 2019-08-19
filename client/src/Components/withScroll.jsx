import React,{createRef, useState, useEffect} from 'react';
import eventEmitter from '../EventEmitter';

const withScroll = Component => props => {

    const [buffer,setBuffer] = useState(false);
    const scrollerRef = createRef();
    
    const scrollEvent = event => {  
        const isMobile = scrollerRef.current.clientWidth < 650;

        if ((event.nativeEvent.view.pageYOffset <= 0) ||
            (buffer && event.nativeEvent.view.pageYOffset <= 100)){
            isMobile && setBuffer(false);
            eventEmitter.emit("EventMenu", {
                action: null,
            });
        }
        else if ((event.nativeEvent.view.pageYOffset > 0) ||
            (buffer && event.nativeEvent.view.pageYOffset > 100)){
            isMobile && setBuffer(true);
            eventEmitter.emit("EventMenu", {
                action: 'fixed',
            });
        }
    };

    const didMount = () => {
        if (global.pageYOffset > 0)
        eventEmitter.emit("EventMenu", {
            action: 'fixed',
        });

    };
    
    useEffect(didMount, []);

    return (
        <div onWheel = {scrollEvent} 
             ref = {scrollerRef}
             className = {!buffer ? 'scroller' : 'scroller buffer'}>
            <Component {...props} />
        </div>
    )
};
export default withScroll;