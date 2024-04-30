// TradingViewWidget.jsx
import { useUserContext } from "@/components/userContext/UserContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, memo, useState } from "react";
// import {image} from '../../../../public/Screenshot 2024-04-30 at 3.32.55 PM.png'
const TradingViewWidget: React.FC<{ setLoading:any }> = ({
  setLoading
}) =>{

  const container: any = useRef();
  const [symbolChange, setSymbolChange] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  console.log("inside new pary poor");
  const router = useRouter();
  const { label, setLabel } = useUserContext();
const handleScript=()=>{
    console.log(label, "symbol");
    if(label){
      
       console.log(container?.current,"<<<<<outer")
    //    container.current.innerHTML="<h1> </h1>"
            // while (container?.current?.firstChild) {
            //     console.log("inner","<<<<<outer")
            //     container?.current.removeChild(container?.current.firstChild);
            // }
            console.log(container?.current,"<<<<<outer after")
            
        
       

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
          "width": "100%",
          "height": 800,
          "theme": "dark",
          "style": "1",
          "locale": "in",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;

        setTimeout(() => {
            if(container.current.firstChild){
                container.current.innerHTML="<div> </div>"
                container?.current?.appendChild(script);
            }else{
                container?.current?.appendChild(script);
            }
        }, 1);
    }
   
}

  useEffect(() => {
    setisLoading(true);

    setTimeout(() => {
      setisLoading(false)
        handleScript()
      
    }, 1000);

  
  }, [label]);
  const LoaderElement=()=>{
    return  <div className="absolute z-50 flex top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-50 justify-center items-center ">
    <div className="text-center flex justify-center items-center">
      <div role="status">
        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>    
  </div>
  }

  return isLoading? <LoaderElement/>:(
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
