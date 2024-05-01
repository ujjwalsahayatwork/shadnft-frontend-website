import { makeApiRequest, generateSymbol, parseFullSymbol,makeApiRequestLocal  } from './helpers.js';

const configurationData = {
    // Represents the resolutions for bars supported by your datafeed
    supported_resolutions: ['60'],
    // The `exchanges` arguments are used for the `searchSymbols` method if a user selects the exchange
    exchanges: [
        { value: 'Bitfinex', name: 'Bitfinex', desc: 'Bitfinex'},
        { value: 'Kraken', name: 'Kraken', desc: 'Kraken bitcoin exchange'},
    ],
    // The `symbols_types` arguments are used for the `searchSymbols` method if a user selects this symbol type
    symbols_types: [
        { name: 'crypto', value: 'crypto'},
        { name: 'token', value: 'crypto'}
    ]
};
// DatafeedConfiguration implementation
// ...
// Obtains all symbols for all exchanges supported by CryptoCompare API
async function getAllSymbols() {
    const {data} = await makeApiRequest();
    let allSymbols = [];
 if(data){
    data.data.filter((item)=>{
        allSymbols.push(item.symbol)
    })
 }
    // for (const exchange of configurationData.exchanges) {
    //     const pairs = data.Data[exchange.value].pairs;

    //     for (const leftPairPart of Object.keys(pairs)) {
    //         const symbols = pairs[leftPairPart].map(rightPairPart => {
    //             const symbol = generateSymbol(exchange.value, leftPairPart, rightPairPart);
    //             return {
    //                 symbol: symbol.short,
    //                 ticker: symbol.full,
    //                 description: symbol.short,
    //                 exchange: exchange.value,
    //                 type: 'crypto',
    //             };
    //         });
    //         allSymbols = [...allSymbols, ...symbols];
    //     }
    // }
    // console.log(allSymbols);
    return allSymbols;
}
export default {
    onReady: (callback) => {
        console.log('[onReady]: Method call');
        setTimeout(() => callback(configurationData));
    },
    searchSymbols: async (
        userInput,
        exchange,
        symbolType,
        onResultReadyCallback
    ) => {
        console.log('[searchSymbols]: Method call');
        const {data} = await getAllSymbols();
        let allSymbols = [];
        if(data){
            data.data.filter((item)=>{
                allSymbols.push(item.symbol)
            })
         }
        onResultReadyCallback(allSymbols);
    },
    resolveSymbol: async (
        symbolName,
        onSymbolResolvedCallback,
        onResolveErrorCallback,
        extension
    ) => {
        console.log('[resolveSymbol]: Method call', symbolName);
        const symbols = await getAllSymbols();
        const symbolItem = symbols.find((ticker ) => ticker === symbolName);
        if (!symbolItem) {
            console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);
            onResolveErrorCallback('Cannot resolve symbol');
            return;
        }
        // Symbol information object
        const symbolInfo = {
            ticker: symbolItem.ticker,
            name: symbolName.toUpperCase(),
            description: symbolItem.description,
            type: symbolItem.type,
            session: '24x7',
            timezone: 'Asia/Tokyo',
            exchange: symbolItem.exchange,
            intraday_multipliers:['1','5','15','30','240'],
            minmov: 1,
            pricescale: 1000000,
            has_intraday: true,
            visible_plots_set: 'ohlc',
            has_weekly_and_monthly: false,
        
            supported_resolutions: configurationData.supported_resolutions,
            volume_precision: 2,
            data_status: 'streaming',
        };
        console.log('[resolveSymbol]: Symbol resolved', symbolName);
        onSymbolResolvedCallback(symbolInfo);
    },
    getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
        const { from , to, firstDataRequest } = periodParams;

        console.log('[getBars]: Method call'    , from, to);
        // const parsedSymbol = parseFullSymbol(symbolInfo.ticker);
        // const urlParameters = {
        //     e: parsedSymbol.exchange,
        //     fsym: parsedSymbol.fromSymbol,
        //     tsym: parsedSymbol.toSymbol,
        //     toTs: to,
        //     limit: 2000,
        // };
        // const query = Object.keys(urlParameters)
        //     .map(name => `${name}=${encodeURIComponent(urlParameters[name])}`)
        //         .join('&');
        try {
            const data = await makeApiRequestLocal(from,to);
            // console.log(res,"<<<thisisresponse")
           

            if (data.length === 0) {
                console.log("No data error")
                // "noData" should be set if there is no data in the requested period
                onHistoryCallback([], { noData: true });
                return;
            }
            
         
                 onHistoryCallback(data, { noData: false });
            
            // console.log('inside---data',data);
        } catch (error) {
            console.log('[getBars]: Get error', error);
            onErrorCallback(error);
        }
    },
    subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) => {
        console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID);
    },
    unsubscribeBars: (subscriberUID) => {
        console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
    },
};