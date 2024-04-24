'use client'
import React, { useEffect, Suspense, useState } from "react";
import LeftSideComponent from "./LeftSideComponent";
import RightSideComponent from "./RightSideComponent";
import Script from "next/script";
import Datafeed from "../../datafeed.js"
import { makeApiRequestLocal } from "@/helpers.js";
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
  const [isClient, setIsClient] = useState(false);
  const [clicked,setClicked] = useState(false);

  useEffect(() => {
  if (typeof window !== 'undefined') {
    let newSymbol = localStorage.getItem('key');
    // console.log(window.tvWidget,clicked,'window');
    
    setTimeout(() => {
      // if (window.tvWidget && clicked) {
      // // if (false) {
      //   // alert("herer")

      //   // Update only the symbol without recreating the widget
      //   window.tvWidget.chart().setSymbol(newSymbol);
      // } else {
        window.tvWidget = new TradingView.widget({
          symbol: newSymbol,
          interval: '60', 
          width: '100%',
          height: 800,
          fullscreen: false,
          container: 'tv_chart_container',
          datafeed: Datafeed,
          library_path: 'https://illuminals.io/chart/charting_library.js',
          theme: "dark",
          overrides: {
            "paneProperties.background": "black",
            "paneProperties.backgroundType": "solid",
          },
        });
      // }
    }, 1000);
    
    setIsClient(true);
  }
}, []);

// useEffect(()=>{

//   if (typeof window !== 'undefined') {
//   let newSymbol = localStorage.getItem('key');
//   console.log(window.tvWidget,clicked,'windowmyr');

//   setTimeout(() => {
//      if (window.tvWidget && clicked) {
//       // if (false) {
//         alert("herer")

//         // Update only the symbol without recreating the widget
//         window.tvWidget.chart().setSymbol(newSymbol);
//      }
//   },1000)
//   setClicked(false);
//   }
// },[clicked])


  const handleDataFetch = () => {
    // setClicked(!clicked); 
    if (typeof window !== 'undefined') {
      let newSymbol = localStorage.getItem('key');
      // console.log(window.tvWidget,clicked,'windowmyr');
    
      setTimeout(() => {
         if (window.tvWidget ) {
          // if (false) {
            // Update only the symbol without recreating the widget
            window.tvWidget.chart().setSymbol(newSymbol);
         }
      },1000)
      // setClicked(false);
      }

  };


  // console.log('inside window', isClient);
  return (
    <>
      <Script src="https://illuminals.io/chart/charting_library.js" />
      <section className="max-[767px]:my-[50px]">
        <div className="container mx-auto ">
          <div className="flex md:flex-row flex-col justify-between gap-5 w-full  fixed ">
            <div className="md:w-[43%]  lg:w-[34%] xl:w-[27%] w-full">
              <LeftSideComponent handleDataFetch={handleDataFetch}/>
            </div>
            <div className="md:w-[57%] lg:w-[66%] xl:w-[73%] w-full  md:my-[10px] ">
              <div className="h-[100%]  md:my-[80px] max-[767px]:px-4 my-40px"  >
                

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
