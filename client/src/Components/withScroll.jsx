import React,{createRef, useState, useEffect} from 'react';
import eventEmitter from '../EventEmitter';


// in progress (fixed and finish this component)

const withScroll = Component => props => {

    const [buffer,setBuffer] = useState(false);
    const scrollerRef = createRef();
    
    const scrollEvent = event => {  
        const isMobile = event.currentTarget.innerWidth < 650;

        if ((event.currentTarget.pageYOffset <= 0) ||
            (buffer && event.currentTarget.pageYOffset <= 100)){
            isMobile && setBuffer(false);
            eventEmitter.emit("EventMenu", {
                action: null,
            });
        }
        else if ((event.currentTarget.pageYOffset > 0) ||
            (buffer && event.currentTarget.pageYOffset > 100)){
            isMobile && setBuffer(true);
            eventEmitter.emit("EventMenu", {
                action: 'fixed',
            });
        }
    };

    const didMount = () => {
        window.addEventListener('scroll',scrollEvent,false);
        if (global.pageYOffset > 0)
        eventEmitter.emit("EventMenu", {
            action: 'fixed',
        });

        return () => {
            window.removeEventListener('scroll',scrollEvent,false);
        }

    };
    
    useEffect(didMount, []);

    return (
        <div
             ref = {scrollerRef}
             className = {!buffer ? 'scroller' : 'scroller buffer'}>
            <Component {...props} />
        </div>
    )


};
export default withScroll;