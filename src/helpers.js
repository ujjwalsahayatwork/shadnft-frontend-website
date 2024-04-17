import bars from './datafeed.js'

// Makes requests to CryptoCompare API
export async function makeApiRequest(path) {
    try {
        const response = await fetch(`https://min-api.cryptocompare.com/${path}`);
        return response.json();
    } catch(error) {
        throw new Error(`CryptoCompare request error: ${error.status}`);
    }
}
export async function makeApiRequestLocal() {
    try {
        // let seacrchSymbol = text?text:'Runestone';
       let seacrchSymbol = localStorage.getItem('key')
        seacrchSymbol = seacrchSymbol?seacrchSymbol:'Runestone'
        const response = await fetch(`http://localhost:5001/api/ordinals/charts-data/${seacrchSymbol}`);
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