import React, { useState } from "react";
import Image from "next/image";
import { RiArrowDownSFill } from "react-icons/ri";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Currency from "../../../../public/assest/Currency.png";
import Filter from "../../../../public/assest/Filter.png";
import { CgArrowsExchange } from "react-icons/cg";
import { tableData } from "./Data/data";
const tabs = [
  {
    title: "Ordinal",
    key: "ordinal",
  },

  {
    title: "BRC-20",
    key: "brc-20",
  },
  {
    title: "TAP",
    key: "tap",
  },
];
const GridTabs = [
  {
    title: "BTC",
    key: "btc",
  },

  {
    title: "USDT",
    key: "usdt",
  },
];
const LeftSideComponent = () => {
  const [selectedTab, setSelectedTab] = useState("ordinal");
  const [gridSelectedTab, setGridSelectedTab] = useState("btc");
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(e.target.value);
  };
  const handleCheckbox1Change = () => {
    setIsChecked1(!isChecked1);
  };

  const handleCheckbox2Change = () => {
    setIsChecked2(!isChecked2);
  };
  return (
    <div className=" md:sticky md:top-0 no-scrollbar  overflow-y-auto md:height md:border-r-[1px] max-[767px]:border-b-[1px] border-[#FFDA83]">
      <div className="mt-[100px] mb-[50px]">
        <div className="flex items-center  gap-2 px-4 ">
          <div className="flex flex-col ">
            <div className="flex items-center gap-[6px]">
              <p className="text-xs text-[#FFFFFF] font-semibold">Exchange</p>
              <span>
                <CgArrowsExchange className="text-[#FFB501] text-sm" />
              </span>
            </div>
            <div className="flex items-center gap-2 xl:gap-[17px] mt-2 border-[1px] border-[#57472F] rounded-[2.5px] max-[767px]:justify-between  xl:pr-0">
              {tabs.map((tab, index) => {
                return (
                  <button
                    onClick={() => setSelectedTab(tab.key)}
                    className={`py-2  px-2   text-xs ${
                      tab.key == selectedTab
                        ? "text-[#000] btn rounded-[2.5px] font-medium  "
                        : "text-[#FFFFFF] font-medium"
                    }`}
                    key={index}
                  >
                    <span>{tab.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-[6px]">
              <p className="text-xs text-[#FFFFFF] font-semibold">Currency</p>
              <Image
                src={Currency}
                alt="Currency"
                className="w-[9px] "
                priority
              />
            </div>
            <div className="flex items-center gap-2  mt-2 border-[1px] border-[#57472F] rounded-[2.5px] max-[767px]:justify-between  xl:pr-0">
              {GridTabs.map((tab, index) => {
                return (
                  <button
                    onClick={() => setGridSelectedTab(tab.key)}
                    className={`py-2  px-2    text-xs ${
                      tab.key == gridSelectedTab
                        ? "text-[#000] btn rounded-[2.5px] font-medium  "
                        : "text-[#FFFFFF] font-medium"
                    }`}
                    key={index}
                  >
                    <span>{tab.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[10px] mt-[18px] px-4 ">
          <p className="text-xs text-[#FFFFFF] font-semibold">Filters</p>
          <Image src={Filter} alt="Filter" className="w-[9px] " priority />
        </div>
        <div className="mt-3 px-4 ">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-[12px] w-[12px] appearance-none  border-[1px] border-solid border-[#A0A0A0] rounded-[3px] bg-transparent"
              checked={isChecked1}
              onChange={handleCheckbox1Change}
            />
            <span className="ml-1 text-[#FFFFFF] text-xs font-medium">
              Dead Off
            </span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="checkbox"
              className="form-checkbox h-[12px] w-[12px] appearance-none border-[1px] border-solid border-[#A0A0A0]  rounded-[3px] bg-transparent"
              checked={isChecked2}
              onChange={handleCheckbox2Change}
            />
            <span className="ml-1 text-[#FFFFFF] text-xs font-medium">
              Cheaf Off
            </span>
          </label>
        </div>
        <div className=" mt-[17px] px-4 ">
          <p className="text-xs text-[#FFFFFF] font-semibold">Label</p>
          <div className="flex items-center gap-2 mt-[17px]">
            <button className=" items-center hover:bg-[#FEC801] hover:border-[#FEC801] text-[#57472F] border-[0.5px] border-[#57472F] border-solid rounded-[2.5px] px-[9px] py-2  hover:text-[#000000] font-medium text-xs">
              BTC/USDT
            </button>
            <button className="items-center hover:bg-[#FEC801] hover:border-[#FEC801] text-[#57472F] border-[0.5px] border-[#57472F] border-solid rounded-[2.5px] px-[9px] py-2  hover:text-[#000000] font-medium text-xs">
              ETH/USDT
            </button>
          </div>
        </div>
        <div className="border-b-[1px] border-solid border-[#303030] my-[15px] w-full"></div>
        <div className="flex items-center gap-3 px-4 mb-[15px]">
          <div className="">
            <input
              type="text"
              placeholder="Login to search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="block w-full text-[#57472F] border-[0.5px] rounded-[2.5px]  border-[#57472F] p-[9px] text-xs font-normal text-left h-[30px] bg-transparent border-solid outline-none focus:ring-0 placeholder-[#57472F]"
            />
          </div>
          <div className="flex items-center gap-[6px]">
            <span>
              <MdOutlineKeyboardArrowLeft className="text-[#fff] text-xs" />
            </span>
            <button className=" items-center hover:bg-[#FEC801] hover:border-[#FEC801] text-[#57472F] border-[0.5px]  border-[#57472F] border-solid rounded-[2.5px] px-[9px] py-2  hover:text-[#000000] font-medium text-xs">
              20
            </button>
            <button className=" items-center hover:bg-[#FEC801] hover:border-[#FEC801] text-[#57472F] border-[0.5px]  border-[#57472F] border-solid rounded-[2.5px] px-[9px] py-2  hover:text-[#000000] font-medium text-xs">
              50
            </button>
            <button className=" items-center hover:bg-[#FEC801] hover:border-[#FEC801] text-[#57472F] border-[0.5px]  border-[#57472F] border-solid rounded-[2.5px] px-[9px] py-2  hover:text-[#000000] font-medium text-xs">
              35
            </button>
            <span>
              <MdOutlineKeyboardArrowRight className="text-[#fff] text-xs" />
            </span>
          </div>
        </div>
        <div className=" overflow-auto no-scrollbar h-full">
          <table className="w-full  h-full">
            <thead>
              <tr className="text-[11px] min-[1100px]:text-xs sticky top-0 border-t-[1px]  border-b-[1px] border-solid border-[#303030]    text-[#A0A0A0] ">
                <th className="text-left  pl-4 pr-2 font-semibold py-2 max-[767px]:min-w-[7rem] ">
                  Name
                </th>
                <th className="text-left px-2 py-2 font-semibold max-[767px]:min-w-[7rem] ">
                  Price
                </th>
                <th className="text-left px-2 py-2 font-semibold max-[767px]:min-w-[7rem] ">
                  Volume
                </th>
              </tr>
            </thead>

            <tbody className="my-4">
              {tableData.map((item, index) => (
                <tr
                  key={index}
                  className=" border-b-[0.5px] text-[#FFFFFF] border-solid border-[#303030] font-medium cursor-pointer text-[11px]  hover:bg-[#80808033]"
                >
                  <td className="text-left pl-4 pr-2 py-2 max-[767px]:min-w-[7rem] ">
                    {item.name}
                  </td>
                  <td className="text-left px-2 py-2 max-[767px]:min-w-[7rem] text-[#FF0000]">
                    <div className="flex items-center gap-1">
                      <span className="text-[#FF0000] text-sm font-medium">
                        <RiArrowDownSFill />
                      </span>
                      <span> {item.price}</span>
                    </div>
                  </td>
                  <td className="text-left px-2 py-2 max-[767px]:min-w-[7rem] text-[#C83939] ">
                    {item.Volume}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 mt-[20px]">
          <button className=" items-center bg-[#FEC801] w-full  rounded-[5px] px-3 xl:px-[15px] py-2 xl:py-[11px] text-[#000000] font-medium text-sm">
            Login to see more...
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftSideComponent;
