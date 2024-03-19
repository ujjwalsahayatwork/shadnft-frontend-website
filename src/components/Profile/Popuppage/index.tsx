import React, { useState } from "react";
import { Fragment } from "react";
import Image from "next/image";
import payemstimg from "../../../../public/assest/payemst.png";
import xverseimg from "../../../../public/assest/xverse.png";
import { Dialog, Transition } from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";
import { HiMiniInformationCircle } from "react-icons/hi2";

import { useRouter } from "next/router";
import Successfulpage from "../Successfulpage";
interface PopuppageProps {
  isOpen: boolean;
  onClose: () => void;
  //setShowWalletPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const Popuppage: React.FC<PopuppageProps> = ({
  isOpen,
  onClose,
  ///setShowWalletPopup,
}) => {
        const [showPopuppage, setShowPopuppage] = useState(false);
    
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
                  <Dialog.Panel className="bg-[#0E0E0E] w-full max-w-[497px] transform  text-left align-middle shadow-xl transition-all  rounded-[5px] py-5 overflow-hidden ">
                    <Dialog.Title as="h3" className="">
                      <div className="flex justify-between items-center gap-2 px-5">
                        <p className="text-base font-medium text-[#FFFFFF]">
                          Payment method
                        </p>
                        <span onClick={onClose} className="cursor-pointer">
                          <RxCross2 className="text-base text-[#FFFFFF]" />
                        </span>
                      </div>
                    </Dialog.Title>

                    <div className="px-5">
                      <div
                        onClick={() => setShowPopuppage(true)}
                        className="bg-[#181818] cursor-pointer py-[15px] flex items-center justify-center gap-[5px] my-5"
                      >
                        <p className="text-sm font-medium text-[#FFFFFF]">
                          Pay with Xverse wallet
                        </p>
                        <Image
                          src={xverseimg}
                          alt="Profile"
                          className="w-[15px] "
                          priority
                        />
                      </div>
                      <div className="bg-[#181818] cursor-pointer py-[15px] flex items-center justify-center gap-[5px]">
                        <p className="text-sm font-medium text-[#FFFFFF]">
                          Credit/Debit card
                        </p>
                        <Image
                          src={payemstimg}
                          alt="Profile"
                          className="w-[15px] "
                          priority
                        />
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
      <Successfulpage
        isOpen={showPopuppage}
        onClose={() => setShowPopuppage(false)}
      />
    </>
  );
};

export default Popuppage;
