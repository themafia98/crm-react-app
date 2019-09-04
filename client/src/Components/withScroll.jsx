import React,{createRef, useEffect} from 'react';
import eventEmitter from '../EventEmitter';


// in progress (I should finish this component)

const withScroll = Component => props => {

    const scrollerRef = createRef();
    
    const scrollEvent = event => {  

        if (event.currentTarget.innerWidth < 650) return;

        const unfixed = event.currentTarget.pageYOffset < 100;
        const fixed = event.currentTarget.pageYOffset > 100;

        if (fixed){

            eventEmitter.emit("EventMenu", {
                action: 'fixed',
            });

        } else if (unfixed){

            eventEmitter.emit("EventMenu", {
                action: null,
            });
        }
    };

    const didMount = () => {
        console.log(global.innerWidth);
        window.addEventListener('scroll',scrollEvent,false);
        if (global.pageYOffset > 0 && global.innerWidth)
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
             className = 'scroller'>
            <Component {...props} />
        </div>
    )


};
export default withScroll;