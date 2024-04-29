"use client";
import React, { useEffect, useState } from "react";
import LeftSideComponent from "./LeftSideComponent";
import RightSideComponent from "./RightSideComponent";
import Script from "next/script";
import Datafeed from "../../datafeed.js";
import { makeApiRequestLocal } from "@/helpers.js";
import TradingViewWidget from "./ChartComponent";
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

type IntervalType =
  | "1"
  | "3"
  | "5"
  | "15"
  | "30"
  | "60"
  | "120"
  | "240"
  | "1D"
  | "1W"
  | "1M";

declare let window: {
  tvWidget: any; // Adjust 'any' if you know the exact type
};

declare let TradingView: {
  widget: any; // Adjust 'any' if you know the exact type
};

const AppCharts = () => {
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [symbolState, setSymbolState] = useState("runestone");

  useEffect(() => {
    if (typeof window !== "undefined") {
      let newSymbol = localStorage.getItem("key");

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
          interval: "60",
          width: "100%",
          height: 800,
          fullscreen: false,
          container: "tv_chart_container",
          datafeed: Datafeed,
          withdateranges: true,
          // library_path: 'https://illuminals.io/charting_library/charting_library.js',
          library_path: "http://127.0.0.1:5500/charting_library.js",
          theme: "dark",
          disabled_features: [
            "header_indicators",
            "header_undo_redo",
            "header_quick_search",
            "timeframes_toolbar",
            // "legend_widget",
            "go_to_date",
            "edit_buttons_in_legend",
            "show_symbol_logo_for_compare_studies",
            "show_interval_dialog_on_key_press",

            "header_symbol_search",
            "header_compare",
            // "symbol_search_hot_key",
            // "main_series_scale_menu",
            // "display_market_status",
            "uppercase_instrument_names",
            "vert_touch_drag_scroll",
            // "side_toolbar_in_fullscreen_mode",
            // "header_in_fullscreen_mode",
            // "withdateranges",
            // "show_zoom_and_move_buttons_on_touch",
            "bottom_toolbar", // Remove bottom toolbar
          ],
          enabled_features: [],
          overrides: {
            "paneProperties.background": "black",
            "paneProperties.backgroundType": "solid",
          },
          drawingsAccess: { type: "black", tools: [{ name: "TrendLine" }] },
        });
        
      }, 1000);
      setIsClient(true);
    }
  }, []);

  const handleDataFetch = () => {
    // setClicked(!clicked);
    if (typeof window !== "undefined") {
      let newSymbol = localStorage.getItem("key");
      // console.log(window.tvWidget,clicked,'windowmyr');
      setSymbolState(newSymbol);
      // setTimeout(() => {

      if (window.tvWidget) {
        // console.log('hello');
        // setLoading(true)
        // if (false) {
        // Update only the symbol without recreating the widget
        window.tvWidget.chart().setSymbol(newSymbol);
        // setLoading(false)
      }
      // },1000)
      // setClicked(false);
    }
  };
 
  return (
    <>
      <Script src="http://127.0.0.1:5500/charting_library.js" />
      {/* <Script src="https://illuminals.io/charting_library/charting_library.js" /> */}
      <section className="max-[767px]:my-[50px]">
        <div className="container mx-auto ">
          <div className="flex md:flex-row flex-col justify-between gap-5 w-full  lg:fixed ">
            <div className="md:w-[43%]  lg:w-[34%] xl:w-[27%] w-full">
              <LeftSideComponent
                handleDataFetch={handleDataFetch}
                setLoading={setLoading}
              />
            </div>
            <div className="md:w-[57%] lg:w-[66%] xl:w-[73%] w-full  md:my-[10px] ">
              <div className="h-[100%]  md:my-[80px] max-[767px]:px-4 my-40px">
                {isClient && (
                  <>
                    <h1 className="text-gray-400">
                      MAGICEDEN / MAGICEDEN-{symbolState.toUpperCase()}{" "}
                      <i>(FLOOR PRICE)</i>
                    </h1>
                    <RightSideComponent loading={loading} />
                    {/* <TradingViewWidget /> */}
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
