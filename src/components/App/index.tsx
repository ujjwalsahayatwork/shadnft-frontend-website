'use client'
import React, { useEffect, Suspense, useState } from "react";
import LeftSideComponent from "./LeftSideComponent";
import RightSideComponent from "./RightSideComponent";
import Script from "next/script";
import Datafeed from "../../datafeed.js"
// const LazyRightSideComponent = React.lazy(() => import('./RightSideComponent'));

interface TradingView {
  widget(options: TradingViewOptions): any; // Adjust 'any' if you know the exact return type
}

interface TradingViewOptions {
  symbol: string;
  interval: IntervalType;
  fullscreen: boolean;
  container: string;
  datafeed: any; // Adjust this type according to your datafeed implementation
  library_path: string;
  theme: "dark" | "light"; // Assuming only two themes are possible
  overrides?: {
    [key: string]: string;
  };
}

type IntervalType = '1' | '3' | '5' | '15' | '30' | '60' | '120' | '240' | '1D' | '1W' | '1M';

declare let window: {
  tvWidget: any; // Adjust 'any' if you know the exact type
};

declare let TradingView: {
  widget: any; // Adjust 'any' if you know the exact type
};


const AppCharts = () => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    if (typeof window != 'undefined') {
      // alert("window")
      setTimeout(() => {
        
        // window?.myFunction()
        window.tvWidget = new TradingView.widget({
          symbol: 'Bitfinex:BTC/USD',            // Default symbol pair
          interval: '1D', 
          width:'100%',
          height: '100%',                       // Default interval
         // fullscreen: true,                      // Displays the chart in the fullscreen mode
          container: 'tv_chart_container',       // Reference to an attribute of a DOM element
          datafeed: Datafeed,
          library_path: 'http://127.0.0.1:5501/charting_library/charting_library.js',
          theme: "dark",
          overrides: {
            "paneProperties.background": "black",
            "paneProperties.backgroundType": "solid"
          },
        });
      }, 1000);
      setIsClient(true);
    }
  }, [])

  console.log('inside window', isClient);
  return (
    <>
      <Script src="http://127.0.0.1:5501/charting_library/charting_library.js" />
      <section className="">
        <div className="container mx-auto">
          <div className="flex md:flex-row flex-col justify-between gap-5 w-full">
            <div className="md:w-[43%]  lg:w-[34%] xl:w-[27%]   w-full">
              <LeftSideComponent />
            </div>
            <div className="md:w-[57%] lg:w-[66%] xl:w-[73%] w-full  md:my-[50px]">
              <div className="h-[100%]  md:my-[80px] max-[767px]:px-4 "  >


                {isClient && (
                  <>

                    <RightSideComponent />
                  </>

                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AppCharts;
