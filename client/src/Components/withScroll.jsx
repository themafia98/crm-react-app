import React,{useState, useEffect} from 'react';
import mainStreamEvents from '../EventEmitter';

const withScroll = Component => props => {

    const [isBefore, setBefore] = useState(false);
    
    const scrollEvent = event => {
        if (event.nativeEvent.view.pageYOffset > 0)
        mainStreamEvents.emit("EventMenu", {
            action: 'fixed',
        });
        else if (event.nativeEvent.view.pageYOffset <= 0)
        mainStreamEvents.emit("EventMenu", {
            action: null,
        });

        setBefore(event.nativeEvent.view.pageYOffset > 0);
    };

    const didMount = () => {
        if (global.pageYOffset > 0)
        mainStreamEvents.emit("EventMenu", {
            action: 'fixed',
        });

    };
    
    useEffect(didMount, []);

    return (
        <div onWheel = {scrollEvent} 
             className = {!isBefore ? 'scroller' : 'scroller'}>
            <Component {...props} />
        </div>
    )
};
export default withScroll;