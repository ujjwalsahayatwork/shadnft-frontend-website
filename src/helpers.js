import { API_CALL } from './API/Routes.js';
import bars from './datafeed.js'
import { URL } from './API/baseCall.js';
import Cookies from 'js-cookie'


// Makes requests to CryptoCompare API
export async function makeApiRequest(path) {
    try {
        const user = localStorage.getItem('UserLogin');
        const loggedIn = Cookies.get('loggedIn')
        let response;
        response = user && loggedIn ? await API_CALL.MagicEidenCollection.get():await API_CALL.MagicEidenData.get();
        if(response) {
            return response;
           }
    } catch(error) {
        console.log(error)
        throw new Error(`Collections request error: ${error.status}`);
    }
}
export async function makeApiRequestLocal() {
   
    try {
        // let seacrchSymbol = text?text:'Runestone';
       let seacrchSymbol = localStorage.getItem('key')
        seacrchSymbol = seacrchSymbol?seacrchSymbol:'runestone'
        const response = await fetch(`${URL}/ordinals/charts-data/${seacrchSymbol}`);
        const data=await response.json()
        console.log(data,"<<<<insidemakeapirequestlocal");
        // bars.getBars(data);
        return data
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