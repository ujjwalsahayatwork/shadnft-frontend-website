import React, { useEffect, useState } from "react";
import axios from "axios";


const RightSideComponent = () => {

  // interface ApiData {
  //   success: boolean,
  //   message: String,
  //   data: Array<Object>
  // }

  // const [chartData, setChartData] = useState<{ data: ApiData }>({ data: {
  //   success: false,
  //   message: "Not initialised",
  //   data: []
  // } });
  
  return (
    <>
      <div id='tv_chart_container' className="h-[800px]" >
      </div>
    </>
  );
};

export default RightSideComponent;
