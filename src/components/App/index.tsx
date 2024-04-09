'use client'
import React, { useEffect,Suspense, useState } from "react";
import LeftSideComponent from "./LeftSideComponent";
import RightSideComponent from "./RightSideComponent";
// const LazyRightSideComponent = React.lazy(() => import('./RightSideComponent'));

const AppCharts = () => {
  const  [isClient,setIsClient] = useState(false)
  // console.log(window,"<<<thisiswindow");
  
  useEffect(() => {
    
    if (typeof window != 'undefined') {
    // alert("window")
    window?.myFunction()
    
      setIsClient(true);
    }
  }, [])
  
  console.log('inside window',isClient);
  return (
   <>
   
      <section className="">
  
        <div className="container mx-auto">
          <div className="flex md:flex-row flex-col justify-between gap-5 w-full">
            <div className="md:w-[43%]  lg:w-[34%] xl:w-[27%]   w-full">
              <LeftSideComponent />
            {!isClient  && <div style={{color:"white"}}>
          {isClient}
          </div>}
            </div>
            <div className="md:w-[57%] lg:w-[66%] xl:w-[73%] w-full">
              <div className="h-[650px]  md:my-[100px] max-[767px]:px-4 "  >
        
                
              { isClient && (
                  <>
                  <div style={{color:"white"}}>hello</div>
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
