import React from 'react'

function Loader() {
  return (
<div className='w-full text-center'>
            <div
                className="inline-block text-[#FF7757] text-center h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    style={{
                        color: "#FF7757"
                    }}
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span>
            </div>
        </div>
  )
}

export default Loader