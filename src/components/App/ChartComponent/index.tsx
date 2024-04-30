// TradingViewWidget.jsx
import { useUserContext } from "@/components/userContext/UserContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, memo, useState } from "react";

function TradingViewWidget() {
  const container: any = useRef();
  const [symbolChange, setSymbolChange] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  console.log("inside new pary poor");
  const router = useRouter();
  const { label, setLabel } = useUserContext();
const handleScript=()=>{
    console.log(label, "symbol");
    if(label){
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "autosize": true,
          "symbol": "BINANCE:${label}",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "in",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
        setisLoading(false);
        setTimeout(() => {
            
            container?.current?.appendChild(script);
        }, 1);
    }
   
}

  useEffect(() => {
    setisLoading(true);
    setTimeout(() => {
        handleScript()
    }, 1);

   
  }, [label]);

  return !isLoading && (
      <div
        className="tradingview-widget-container"
        ref={container}
        style={{ height: 800, width: "100%" }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: "calc(100% - 32px)", width: "100%" }}
        ></div>
       
      </div>
    )
   
  
}

export default TradingViewWidget;
