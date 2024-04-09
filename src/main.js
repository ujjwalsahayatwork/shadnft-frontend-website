// Datafeed implementation that you will add later
import Datafeed from './datafeed.js';
// import f from '../src/charting_library/charting_library_copy.js'

window.tvWidget = new TradingView.widget({
    symbol: 'Bitfinex:BTC/USD',            // Default symbol pair
    interval: '1D',                        // Default interval
    fullscreen: true,                      // Displays the chart in the fullscreen mode
    container: 'tv_chart_container',       // Reference to an attribute of a DOM element
    datafeed: Datafeed,
    library_path: 'http://127.0.0.1:5501/charting_library/charting_library.js',
    theme: "dark",
    overrides: {
        "paneProperties.background": "black",
        "paneProperties.backgroundType": "solid"
    },
});