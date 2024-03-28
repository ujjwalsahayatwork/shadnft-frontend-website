import React, { useState } from "react";
import { Fragment } from "react";
import Image from "next/image";
import Successimg from "../../../../public/assest/Vector.png";

import { Dialog, Transition } from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";
import { HiMiniInformationCircle } from "react-icons/hi2";

import { useRouter } from "next/router";
interface SuccessfulpageProps {
  isOpen: boolean;
  onClose: () => void;
  message?:string
  //setShowWalletPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const Successfulpage: React.FC<SuccessfulpageProps> = ({
  isOpen,
  onClose,
  message
  ///setShowWalletPopup,
}) => {
  return (
    <>
      <div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-[90]" onClose={onClose}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0  backdrop-blur-sm bg-black/10 opacity-4" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="bg-[#0E0E0E] w-full max-w-[265px] transform  text-left align-middle shadow-xl transition-all  rounded-[5px] py-5 overflow-hidden ">
                    <Dialog.Title as="h3" className="">
                      <div className="flex justify-end  px-5">
                        <span onClick={onClose} className="cursor-pointer">
                          <RxCross2 className="text-base text-[#FFFFFF]" />
                        </span>
                      </div>
                    </Dialog.Title>

                    <div className="px-5 flex flex-col justify-center items-center">
                      <Image
                        src={Successimg}
                        alt="Successimg"
                        className="w-[29px] "
                        priority
                      />
                      {/* <p className="text-lg font-medium text-[#FFFFFF] my-2">
                        Successful
                      </p> */}
                      <p className="text-xs font-normal text-center text-[#FFFFFF] mb-2">
                        {message}
                      </p>
                      <button
                       
                        className=" items-center   text-[#FFFFFF] bg-[#383838]  rounded-[2.5px] px-[10px] py-[5px]   font-medium text-xs"
                      >
                        Back to page
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};

export default Successfulpage;
