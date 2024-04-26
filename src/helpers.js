import { API_CALL } from './ApiRoutes/Routes.js';
import bars from './datafeed.js'
import { URL } from './ApiRoutes/baseCall.js';
import Cookies from 'js-cookie'


// Makes requests to CryptoCompare API
export async function makeApiRequest(path) {
    try {
        const user = localStorage.getItem('UserLogin');
        const loggedIn = localStorage.getItem('token')
        const subscription_status = localStorage.getItem('subscription_status');
        let response;
        response = user && loggedIn && subscription_status =='true' ? await API_CALL.MagicEidenCollection.get():await API_CALL.MagicEidenData.get();
        if(response) {
            return response;
           }
    } catch(error) {
        console.log(error)
        // throw new Error(`Collections request error: ${error.status}`);
    }
}
export async function makeApiRequestLocal(from,to) {
    
    try {
       
       
       let seacrchSymbol = localStorage.getItem('key')
        seacrchSymbol = seacrchSymbol?seacrchSymbol:'runestone'
       
        const response = await API_CALL.GetSingleMagicEden.get(seacrchSymbol);
        const data=await response.data.data;
        let bars = [];
            data.forEach(bar => {
                if (bar.time / 1000 >= from && bar.time / 1000 < to) {
                    bars = [...bars, {
                        time: bar.time,
                        low: bar.low,
                        high: bar.high,
                        open: bar.open,
                        close: bar.close
                    }];
                }
            });
        // bars.getBars(data);
        return bars
    } catch(error) {
        throw new Error(`CryptoCompare request error: ${error.status}`);
    }
}

// Generates a symbol ID from a pair of the coins
export function generateSymbol(exchange, fromSymbol, toSymbol) {
    const short = `${fromSymbol}/${toSymbol}`;
    return {
        short,
        full: `${exchange}:${short}`,
    };
}

export function parseFullSymbol(fullSymbol) {
    const match = fullSymbol.match(/^(\w+):(\w+)\/(\w+)$/);
    if (!match) {
        return null;
    }
    return { exchange: match[1], fromSymbol: match[2], toSymbol: match[3] };
}