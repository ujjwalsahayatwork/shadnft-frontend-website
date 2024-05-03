import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RiArrowDownSFill } from "react-icons/ri";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Currency from "../../../../public/assest/Currency.png";
import Filter from "../../../../public/assest/Filter.png";
import { CgArrowsExchange } from "react-icons/cg";
import { tableData } from "./Data/data";
import Link from "next/link";
import { useUserContext } from "@/components/userContext/UserContext";
import { API_CALL } from "@/ApiRoutes/Routes";
import Loader from "@/components/extras/loader";
import { FaBitcoin } from "react-icons/fa";
import { makeApiRequestLocal } from "@/helpers";
import { MdArrowDropUp } from "react-icons/md";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
const tabs = [
  {
    title: "Ordinal",
    key: "ordinal",
  },

  // {
  //   title: "BRC-20",
  //   key: "brc-20",
  // },
  // {
  //   title: "TAP",
  //   key: "tap",
  // },
];
const GridTabs = [
  {
    title: "BTC",
    key: "btc",
  },

  // {
  //   title: "USDT",
  //   key: "usdt",
  // },
];
interface MegicEden {
  symbol: string;
  floorPrice: number;
  volume: number;
  name: string;
  flag: any;
}
type HandleDataFetch = () => void;

const ItemsPerPage = 14;

const LeftSideComponent: React.FC<{
  handleDataFetch: HandleDataFetch;
  setLoading: any;
}> = ({ handleDataFetch, setLoading }) => {
  const [selectedTab, setSelectedTab] = useState("ordinal");
  const [gridSelectedTab, setGridSelectedTab] = useState("btc");
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // const [updatedCollection, setupdatedCollection] = useState<MegicEden[]>([]);
  let updatedCollection: MegicEden[] = [];
  let updatedPopularCollection: MegicEden[] = [];
  const { user } = useUserContext();
  // const [label,setLabel] = useState('BTC/USDT');

  const [collections, setCollections] = useState<MegicEden[]>([]);
  const [popularCollections, setPopularCollections] = useState<MegicEden[]>([]);
  const [clickedItem, setClickedItem] = useState("runestone");

  const [currentPage, setCurrentPage] = useState(1);
  let totalItems = collections?.length;

  const { label, setLabel } = useUserContext();

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * ItemsPerPage;
  let endIndex = Math.min(startIndex + ItemsPerPage, totalItems);

  // Slice collections array to display only items for the current page
  let displayedCollections = collections?.slice(startIndex, endIndex);

  console.log(user,'user');
  if(user?.current_plan?.plan.name == 'Bronze'){
        displayedCollections = collections?.slice(0,30);
         // Adjust totalItems based on the length of displayedCollections
 totalItems = displayedCollections?.length || 0 ;

 // Adjust endIndex based on the updated totalItems
  endIndex = Math.min(startIndex + ItemsPerPage, totalItems);
 
 // Slice displayedCollections again using the updated endIndex
 displayedCollections = displayedCollections?.slice(startIndex, endIndex);
  } 

  // Function to handle pagination
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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

  const fetchMagicEidenData = async () => {
    try {
      console.log("Populating Collections");

      const previousPopularCollections = updatedPopularCollection;

      const response = await API_CALL.MagicEidenData.get();
      console.log(response, "MagicEidenData");

      if (!response?.data?.data) {
        console.error("Error: Missing data in API response.");
        return;
      }

      const newSymbols = response.data.data;

      const updatedCollections = newSymbols.map((newSymbol) => {
        const correspondingSymbol = previousPopularCollections?.find(
          (symbol) => symbol.symbol === newSymbol.symbol
        );

        let flag;
        if (correspondingSymbol) {
          if (newSymbol.floorPrice < correspondingSymbol.floorPrice) {
            flag = "down";
            console.log(
              "inside newSymbol.floorPrice < correspondingSymbol.floorPrice"
            );
            console.log(flag, "flag");
            console.log(
              newSymbol.floorPrice,
              correspondingSymbol.floorPrice,
              "newSymbol.floorPrice, correspondingSymbol.floorPrice"
            );
          } else if (newSymbol.floorPrice > correspondingSymbol.floorPrice) {
            flag = "up";
            console.log(
              "inside newSymbol.floorPrice > correspondingSymbol.floorPrice"
            );
            console.log(flag, "flag");
            console.log(
              newSymbol.floorPrice,
              correspondingSymbol.floorPrice,
              "newSymbol.floorPrice, correspondingSymbol.floorPrice"
            );
          } else {
            flag = "equal";
            console.log("inside else");
            console.log(flag, "flag");
            console.log(
              newSymbol.floorPrice,
              correspondingSymbol.floorPrice,
              "newSymbol.floorPrice, correspondingSymbol.floorPrice"
            );
          }
        } else {
          flag = "new";
        }

        return {
          ...newSymbol,
          flag: flag,
        };
      });

      updatedPopularCollection = updatedCollections;
      setPopularCollections(updatedCollections);
    } catch (error) {
      console.error("Error fetching MagicEidenData:", error);
    }
  };

  // const fetchMagicEidenCollection = async () => {
  //   try {
  //     // console.log('collections');

  //     user &&
  //       localStorage.setItem("subscription_status", user.subscription_status);
  //     const response = await API_CALL.MagicEidenCollection.get();

  //     const updatedCollections = response?.data.data.map((newSymbol: any) => {
  //       const correspondingSymbol = updatedCollection?.find(
  //         (symbol) => symbol.symbol == newSymbol.symbol
  //       );

  //       console.log(
  //         newSymbol?.floorPrice == correspondingSymbol?.floorPrice,
  //         "isTrue"
  //       );

  //       if (correspondingSymbol) {
  //         let flag: any;
  //         if (newSymbol.floorPrice < correspondingSymbol?.floorPrice) {
  //           flag = false;
  //         } else if (newSymbol.floorPrice > correspondingSymbol?.floorPrice) {
  //           flag = true;
  //         } else {
  //           flag = "equal";
  //           // flag = true;
  //         }
  //         return {
  //           ...newSymbol,
  //           flag: flag,
  //         };
  //       } else {
  //         // console.log('flag else');
  //         // If corresponding symbol not found in collections, assume flag as true
  //         return {
  //           ...newSymbol,
  //           flag: "equal",
  //         };
  //       }
  //     });
  //     console.log(updatedCollections, "updated");
  //     // setupdatedCollection([])
  //     updatedCollection = updatedCollections;
  //     setCollections(updatedCollections);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const fetchMagicEidenCollection = async () => {
    try {
      console.log("Populating Collections");

      const previousCollection = updatedCollection;

      const response = await API_CALL.MagicEidenCollection.get();

      if (!response?.data?.data) {
        console.error("Error: Missing data in API response.");
        return;
      }

      const newSymbols = response.data.data;

      const updatedCollections = newSymbols.map((newSymbol) => {
        const correspondingSymbol = previousCollection?.find(
          (symbol) => symbol.symbol === newSymbol.symbol
        );

        let flag;
        if (correspondingSymbol) {
          if (newSymbol.floorPrice < correspondingSymbol.floorPrice) {
            flag = "down";
            console.log(
              "inside newSymbol.floorPrice < correspondingSymbol.floorPrice"
            );
            console.log(flag, "flag");
            console.log(
              newSymbol.floorPrice,
              correspondingSymbol.floorPrice,
              "newSymbol.floorPrice, correspondingSymbol.floorPrice"
            );
          } else if (newSymbol.floorPrice > correspondingSymbol.floorPrice) {
            flag = "up";
            console.log(
              "inside newSymbol.floorPrice > correspondingSymbol.floorPrice"
            );
            console.log(flag, "flag");
            console.log(
              newSymbol.floorPrice,
              correspondingSymbol.floorPrice,
              "newSymbol.floorPrice, correspondingSymbol.floorPrice"
            );
          } else {
            flag = "equal";
            console.log("inside else");
            console.log(flag, "flag");
            console.log(
              newSymbol.floorPrice,
              correspondingSymbol.floorPrice,
              "newSymbol.floorPrice, correspondingSymbol.floorPrice"
            );
          }
        } else {
          flag = "new";
        }

        return {
          ...newSymbol,
          flag: flag,
        };
      });

      // Update the state with the processed data
      updatedCollection = updatedCollections;
      setCollections(updatedCollections);
    } catch (error) {
      console.error("Error fetching MagicEidenCollection:", error);
      // Handle other errors as needed
    }
  };

  useEffect(() => {
    const fetchCollectionData = async () => {
      try {
        user && user?.subscription_status == true
          ? await fetchMagicEidenCollection()
          : await fetchMagicEidenData();
      } catch (error) {
        console.log(error);
      }
    };
    fetchCollectionData();
    const interval = setInterval(fetchCollectionData, 60 * 1000); // fetch the data for every 1 mins
    // const interval  = setInterval(fetchCollectionData, 1000); // fetch the data for every 1 mins

    return () => clearInterval(interval);
  }, [user]);

  const fetchData = async (name: string) => {
    setLabel("");
    setClickedItem(name);
    setLoading(true);
    // const Text = name.replace(/\s+/g, '');
    localStorage.setItem("key", name);
    const response = await makeApiRequestLocal();
    // console.log(response, "response");
    handleDataFetch(); // Trigger the useEffect in AppCharts
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    localStorage.setItem("key", "runestone");
  }, []);

  return (
    <div className=" md:sticky md:top-0 no-scrollbar md:h-[100vh] overflow-y-auto md:height md:border-r-[1px] max-[767px]:border-b-[1px] border-[#FFDA83]">
      <div className="mt-[100px] mb-[50px]">
        <div className="flex items-center  gap-2 px-4 ">
          <div className="flex flex-col ">
            <div className="flex items-center gap-[6px]">
              <p className="text-xs text-[#FFFFFF] font-semibold">Exchange</p>
              <span>
                <CgArrowsExchange className="text-[#FFB501] text-sm" />
              </span>
            </div>
            <div className="flex items-center gap-2 xl:gap-[17px] mt-2 rounded-[2.5px] max-[767px]:justify-between  xl:pr-0">
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
            <div className="flex items-center gap-2  mt-2  rounded-[2.5px] max-[767px]:justify-between  xl:pr-0">
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
        {/* <div className="flex items-center gap-[10px] mt-[18px] px-4 ">
          <p className="text-xs text-[#FFFFFF] font-semibold">Filters</p>
          <Image src={Filter} alt="Filter" className="w-[9px] " priority />
        </div> */}
        {/* <div className="mt-3 px-4 ">
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
        </div> */}
        <div className=" mt-[17px] px-4 ">
          <p className="text-xs text-[#FFFFFF] font-semibold">Label</p>
          <div className="flex items-center gap-2 mt-[17px]">
            <button
              onClick={() => {
                return (
                  setLabel("BTCUSDT"),
                  localStorage.setItem("symbolChange", "BTCUSDT"),
                  setClickedItem("")
                );
              }}
              className={`items-center ${
                label === "BTCUSDT" && "bg-[#FEC801] "
              } hover:border-[#FEC801] text-[#57472F] border-[0.5px] border-[#57472F] border-solid rounded-[2.5px] px-[9px] py-2  hover:text-white font-medium text-xs`}
            >
              BTC/USDT
            </button>
            <button
              onClick={() => {
                return (
                  setLabel("ETHUSDT"),
                  localStorage.setItem("symbolChange", "ETHUSDT"),
                  setClickedItem("")
                );
              }}
              className={`items-center  ${
                label === "ETHUSDT" && "bg-[#FEC801] "
              } hover:border-[#FEC801] text-[#57472F] border-[0.5px] border-[#57472F] border-solid rounded-[2.5px] px-[9px] py-2  hover:text-white font-medium text-xs`}
            >
              ETH/USDT
            </button>
          </div>
        </div>
        <div className="my-[15px] w-full"></div>
        <div className="flex items-center gap-3 px-4 mb-[15px]">
          {/* <div className="">
            <input
              type="text"
              placeholder="Type to search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="block w-full text-[#57472F] border-[0.5px] rounded-[2.5px]  border-[#57472F] p-[9px] text-xs font-normal text-left h-[30px] bg-transparent border-solid outline-none focus:ring-0 placeholder-[#57472F]"
            />
          </div> */}
          {/* <div className="flex items-center gap-[6px]">
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
          </div> */}
        </div>
        <div className=" overflow-auto no-scrollbar h-full w-full">
          <table className="w-full  h-full">
            <thead className="">
              <tr className="  text-[11px]  min-[1100px]:text-xs sticky top-0 border-t-[1px]  border-b-[1px] border-solid border-[#303030] text-[#A0A0A0] ">
                <th className=" text-left  pl-4 pr-2 font-semibold py-2 max-[767px]:min-w-[8rem] ">
                  Name
                </th>
                <th className="text-left px-2 py-2 font-semibold max-[767px]:min-w-[5rem] ">
                  <div className="flex items-center gap-1 justify-start">
                    <span> Price </span>
                    <span className="">
                      <FaBitcoin />
                    </span>
                  </div>
                </th>
                <th className="text-left px-2 py-2 font-semibold max-[767px]:min-w-[8rem] ">
                  <div className="flex items-center gap-1 justify-start">
                    <span> Volume </span>
                    <span className="">
                      <FaBitcoin />
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            {/* {
             collections.length ==0 || popularCollections.length==0 ?
               (
               <Loader />
              ):( */}

            <tbody className="my-4 ">
              {user && user.subscription_status
                ? displayedCollections.map((item, index) => (
                    <>
                      <tr
                        key={index}
                        className={`${
                          clickedItem === item.symbol
                            ? "btn  border-[#57472F]"
                            : ""
                        } border-b-[0.5px]   text-[#FFFFFF] border-solid border-[#303030] font-medium cursor-pointer text-[11px] `}
                      >
                        <td
                          className={`text-left pl-4 pr-2 py-2 max-[767px]:min-w-[7rem]  ${
                            clickedItem === item.symbol ? "btn text-black" : ""
                          }  `}
                          onClick={() => fetchData(item.symbol)}
                        >
                          {item.name}
                          {/* {label == 'ETH/USDT' && '-usdt'} */}
                        </td>
                        <td className="text-left px-2  py-2 max-[767px]:min-w-[7rem] text-[#FF0000]">
                          <div className="relative">
                            <span
                              className={` absolute top-[1px] left-[-19px]  ${
                                item.flag === "up"
                                  ? "text-green-700"
                                  : item.flag === "down"
                                  ? "text-red-700"
                                  : ""
                              } text-sm font-medium`}
                            >
                              {item.flag == "up" && <BiSolidUpArrow />}{" "}
                              {item.flag == "down" && <BiSolidDownArrow />}
                            </span>
                            <span className="text-green-600">
                              {item.floorPrice / 100000000}
                            </span>
                          </div>
                        </td>
                        <td className="text-left px-2 py-2 max-[767px]:min-w-[7rem] text-[#C83939] ">
                          {(item.volume / 100000000) % 1 == 0
                            ? item.volume / 100000000
                            : Number((item.volume / 100000000).toFixed(4))}
                        </td>
                      </tr>
                    </>
                  ))
                : popularCollections.map((item, index) => (
                    <tr
                      key={index}
                      className={`${
                        clickedItem === item.symbol
                          ? "btn border-[#57472F]"
                          : ""
                      }border-b-[0.5px] text-[#FFFFFF] border-solid border-[#303030] font-medium cursor-pointer text-[11px] `}
                    >
                      <td
                        className={`text-left pl-4 pr-2 py-2 max-[767px]:min-w-[7rem] ${
                          clickedItem === item.symbol ? "btn text-black" : ""
                        } `}
                        onClick={() => fetchData(item.symbol)}
                      >
                        {item.name}
                      </td>
                      <td className="text-left px-2  py-2 max-[767px]:min-w-[7rem] text-[#FF0000]">
                        <div className="relative">
                          <span
                            className={` absolute top-[1px] left-[-19px]  ${
                              item.flag === "up"
                                ? "text-green-700"
                                : item.flag === "down"
                                ? "text-red-700"
                                : ""
                            } text-sm font-medium`}
                          >
                            {item.flag == "up" && <BiSolidUpArrow />}{" "}
                            {item.flag == "down" && <BiSolidDownArrow />}
                          </span>
                          <span className="text-green-600">
                            {item.floorPrice / 100000000}
                          </span>
                        </div>
                      </td>
                      <td className="text-left px-2 py-2 max-[767px]:min-w-[7rem] text-[#C83939] ">
                        {(item.volume / 100000000) % 1 == 0
                          ? item.volume / 100000000
                          : Number((item.volume / 100000000).toFixed(4))}
                      </td>
                    </tr>
                  ))}
            </tbody>
            {/* )
            
            } */}
          </table>
          {collections.length > 0 && (
            <>
              {/* Pagination controls */}
              <div className="p-2 flex justify-center items-center flex-row mt-5 ">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="p-2  bg-gray-950 rounded border-[1px] border-solid border-[#303030]"
                >
                  Prev
                </button>

                <button
                  className="p-2 btn ml-2 rounded text-black border-b-[1px] border-solid border-[#303030]"
                  onClick={nextPage}
                  disabled={
                    currentPage === Math.ceil(totalItems / ItemsPerPage)
                  }
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
        {!user && (
          <div className="px-4 mt-[20px]">
            <Link href="/signin">
              <button className="btn items-center w-full  rounded-[5px] px-3 xl:px-[15px] py-2  text-[#000000] font-medium text-sm">
                Login to see more...
              </button>
            </Link>
          </div>
        )}
        {user && !user.subscription_status && (
          <div className="px-4 mt-[20px]">
            <Link href="/profile">
              <button className="btn items-center w-full  rounded-[5px] px-3 xl:px-[15px] py-2  text-[#000000] font-medium text-sm">
                Buy the plan to see more...
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftSideComponent;
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
