'use client'
import React, { useEffect, Suspense, useState } from "react";
import LeftSideComponent from "./LeftSideComponent";
import RightSideComponent from "./RightSideComponent";
import Script from "next/script";
import Datafeed from "../../datafeed.js"
// const LazyRightSideComponent = React.lazy(() => import('./RightSideComponent'));
const AppCharts = () => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    if (typeof window != 'undefined') {
      // alert("window")
      setTimeout(() => {
        window?.myFunction()
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
              {!isClient && <div style={{ color: "white" }}>
                {isClient}
              </div>}
            </div>
            <div className="md:w-[57%] lg:w-[66%] xl:w-[73%] w-full">
              <div className="h-[650px]  md:my-[100px] max-[767px]:px-4 "  >


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
