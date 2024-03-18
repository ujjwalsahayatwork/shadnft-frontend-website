import React, { useEffect, useRef, useState } from "react";
//import Datafeeds from "../Commonfile/datafeed";

const RightSideComponent = () => {
  let tvScriptLoadingPromise;
  const onLoadScriptRef = useRef();

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        document.getElementById("tradingview_0396b") &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          width: "100%",
          height: "100%",
          symbol: "BITSTAMP:BTCUSD",

          interval: "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "in",
          // toolbar_bg: "#1B1C1E",
          // hide_legend: true,

          backgroundColor: "#0E0E0E",
         // enable_publishing: false,
          // hide_side_toolbar: false,
          //allow_symbol_change: true,
          container_id: "tradingview_0396b",
        });
      }
    }
  }, []);
  return (
    <div className="tradingview-widget-container custom-class">
      <div id="tradingview_0396b" />
    </div>
  );
};

export default RightSideComponent;
