import React, { useEffect, useState } from "react";
import axios from "axios";

const RightSideComponent = () => {

  interface ApiData {
    success: boolean,
    message: String,
    data: Array<Object>
  }

  const [chartData, setChartData] = useState<{ data: ApiData }>({ data: {
    success: false,
    message: "Not initialised",
    data: []
  } });

  useEffect(() => {
    axios.get("http://192.168.1.5:5001/api/ordinals/charts-data/dummy")
      .then(response => {
        setChartData({ data: response.data });
      })
      .catch(() => {
        console.log("Something went wrong");
      });
  }, []);

  return (
    <div>
      {/* <TradingViewChart data={chartData.data} /> */}
    </div>
  );
};

export default RightSideComponent;
