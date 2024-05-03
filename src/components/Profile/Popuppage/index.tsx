import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import Image from "next/image";
import payemstimg from "../../../../public/assest/payemst.png";
import xverseimg from "../../../../public/assest/xverse.png";
import { Dialog, Transition } from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";
import { HiMiniInformationCircle } from "react-icons/hi2";
import { ToastContainer, toast } from "react-toastify";

import { getAddress } from "sats-connect";
import { sendBtcTransaction, BitcoinNetworkType } from "sats-connect";

import { useRouter } from "next/router";
import Successfulpage from "../Successfulpage";
import { API_CALL } from "@/ApiRoutes/Routes";
interface PopuppageProps {
  isOpen: boolean;
  stateForyrAndMnth: string;
  planId: string;
  onClose: () => void;
  price: number;
  //setShowWalletPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Recipient {
  address: string;
  amountSats: bigint;
}

interface SendBtcOptions {
  payload: {
    network: {
      type: BitcoinNetworkType;
    };
    recipients: Recipient[];
    senderAddress: string;
  };
  onFinish: (response: any) => void;
  onCancel: () => void;
}

async function usdToSatoshi(usdAmount: number): Promise<number> {
  try {
    // Fetching the data from the API
    const response = await fetch(
      "https://api.coingecko.com/api/v3/exchange_rates"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates");
    }

    const data = await response.json();

    // Extracting the value of 1 USD in BTC
    const usdToBtc: number = data.rates.usd.value;

    console.log(usdToBtc, "btc value");

    // Converting USD to BTC
    const btcAmount: number = usdAmount / usdToBtc;

    console.log(btcAmount, "btcAmount");

    // Converting BTC to satoshi (1 BTC = 100,000,000 satoshi)
    const satoshiAmount: number = btcAmount * 10 ** 8;

    console.log(Math.round(satoshiAmount), "satoshiAmount");

    return Math.round(satoshiAmount);
  } catch (error) {
    console.error(error);
  }
}

const Popuppage: React.FC<PopuppageProps> = ({
  isOpen,
  stateForyrAndMnth,
  planId,
  onClose,
  price,
  ///setShowWalletPopup,
}) => {
  const [showPopuppage, setShowPopuppage] = useState(false);
  const notify = (Msg: string, type: any) =>
    toast(Msg, {
      type: type,
    });

  const payUsingWallet = async (usdAmount: number, yearOrMonth: string) => {
    console.log(usdAmount, "in payUsingWallet");
    let paymentAddress;
    // connect with wallet
    const getAddressOptions: any = {
      payload: {
        purposes: ["ordinals", "payment"],
        message: "Address for receiving Ordinals and payments",
        network: {
          type: "Testnet",
        },
      },
      onFinish: (response: any) => {
        console.log(response);
        paymentAddress = response.addresses[1].address;
      },
      onCancel: () => notify("Request canceled", "error"),
    };

    try {
      await getAddress(getAddressOptions);
    } catch (error: any) {
      console.log(error.message);

      if (error.message === "No Bitcoin wallet installed") {
        notify(
          "You do not have the XVerse wallet installed. Please install it.",
          "error"
        );
        return;
      }
    }

    // send transaction i have to check if the address is there then only send the transaction or it will show error
    const sendBtcOptions: SendBtcOptions = {
      payload: {
        network: {
          type: BitcoinNetworkType.Testnet,
        },
        recipients: [
          {
            address: "2N5GJA2EDhnZ5vr4bRohbJQUfNngzG366Du",
            amountSats: BigInt(await usdToSatoshi(usdAmount)),
          },
        ],
        senderAddress: paymentAddress!,
      },
      onFinish: async (response: any) => {
        // notify(response, "success");
        notify(
          `Transaction sucessfull, your txId is: ${response}, it will take some time to be verified.`,
          "success"
        );
        console.log(response, "response of sending btc");
        // send this response(txHash) to backend using API
        <Successfulpage
          isOpen={true}
          onClose={() => setShowPopuppage(false)}
          message={
            "Your transaction has been initiated successfully. It will take some time to be verified. Once verified, we will send you an email."
          }
        />;
        // API_CALL.SavePaymentTx.post(txHash, plan Id, type(yearly or monthly))
        let payload = {
          txHash: response,
          planId: planId,
          purchaseType: yearOrMonth,
        };
        API_CALL.SavePaymentTx.post(payload);
      },
      onCancel: () => notify("Canceled bitcoin transaction", "error"),
    };

    console.log(paymentAddress, "paymentAddress");

    paymentAddress && (await sendBtcTransaction(sendBtcOptions));
  };

  return (
    <>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
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
                        onClick={() => payUsingWallet(price, stateForyrAndMnth)}
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
        message={""}
      />
    </>
  );
};

export default Popuppage;
