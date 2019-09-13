import isFetch from 'isomorphic-fetch';
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';

class Requst {

    constructor(count = 0){
       this.reconnectCouter = count;
       this.controllers = [];
    }

    reset() { this.reconnectCouter = 0; return this; }

    send = async (adress, config = null) => {
        if (this.reconnectCouter > 10){

            if (this.controllers.length > 1)
            this.controllers.forEach(signal => {
                signal.abort();
            })
            else if (this.controllers[0])
            this.controllers[0].abort();

          return {ok: false};
        }

        const controller = new AbortController();
        const signal = controller.signal;

        this.controllers.push(controller);

        let promise = await isFetch(adress, config, {signal})
        .then(res => res)
        .catch(async error => {
            let response = null;
            console.error(error); 
            if (error.message === 'Failed to fetch'){
                this.reconnectCouter = this.reconnectCouter += 1;
                await this.send(adress, config)
                .then(res => response = res);
            }
            return response;
        }); 
        
        return promise;
    };
};

const AJAX = new Requst();

export {Requst};
export default AJAX;
