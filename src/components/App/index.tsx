import React from "react";
import LeftSideComponent from "./LeftSideComponent";
import RightSideComponent from "./RightSideComponent";

const AppCharts = () => {
  return (
    <section className="">
      <div className="container mx-auto">
        <div className="flex md:flex-row flex-col justify-between gap-5 w-full">
          <div className="md:w-[43%]  lg:w-[34%] xl:w-[27%]   w-full">
            <LeftSideComponent />
          </div>
          <div className="md:w-[57%] lg:w-[66%] xl:w-[73%] w-full">
            <div className="h-[650px]  md:my-[100px] max-[767px]:px-4">
              <RightSideComponent />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppCharts;
