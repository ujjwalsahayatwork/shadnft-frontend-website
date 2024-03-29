import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import Profileimg from "../../../public/assest/Profile.png";
import Popuppage from "./Popuppage";
const tabs = [
  {
    title: "Edit Profile",
    key: "editprofile",
  },

  {
    title: "Subscription",
    key: "subscription",
  },
];
const Profile = () => {
  const [selectedTab, setSelectedTab] = useState("editprofile");
  const [profile, setProfile] = useState<string | null>(null);
  const [showpage, setShowPage] = useState(false);
    const [showPopuppage, setShowPopuppage] = useState(false);
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        setProfile(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };
  const [formData, setFormData] = useState({
    userName: "",
    name: "",

    email: "",
    password: "",
    mobile: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? (e as React.ChangeEvent<HTMLInputElement>).target.checked
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <>
      <section className="flex py-[100px] justify-center items-center min-h-[100vh] ">
        <div className="  container px-4 lg:w-[950px]">
          <div className="bg-[#262726]">
            <div className="flex flex-col items-center justify-center p-[32px]">
              <Image
                src={Profileimg}
                alt="Profile"
                className="w-[75px] border-[2px] border-solid border-[#FFB701] rounded-full"
                priority
              />
              <p className="text-lg text-[#FFFFFF] font-medium">Steve smith</p>
            </div>
            <div className="border-b-[1px] border-solid border-[#303030]"></div>
            <div className="flex w-full px-[30px] md:flex-row flex-col">
              <div className="lg:w-[18%] md:w-[20%] w-full md:border-r max-[767px]:border-b md:h-[360px] border-solid border-[#303030]">
                <div className="">
                  <div className="flex md:flex-col mt-2 max-[767px]:gap-5 ">
                    {tabs.map((tab, index) => {
                      return (
                        <button
                          onClick={() => setSelectedTab(tab.key)}
                          className={`py-3  text-left sm:text-base text-sm ${
                            tab.key == selectedTab
                              ? "text-[#fff] md:border-r max-[767px]:border-b border-solid border-[#FFB701] font-semibold  "
                              : "text-[#FFFFFF33] font-semibold"
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
              {selectedTab === "editprofile" && (
                <div className="lg:w-[82%] md:w-[80%] w-full md:px-[25px] pt-[15px]">
                  <div className="flex items-center md:gap-5 gap-3">
                    <div>
                      {profile ? (
                        <Image
                          src={profile}
                          alt="Profile"
                          width={52}
                          height={52}
                          className="w-[52px] rounded-full"
                          priority
                        />
                      ) : (
                        <Image
                          src={Profileimg}
                          alt="Profile"
                          className="w-[52px] rounded-full"
                          priority
                        />
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                      id="upload-profile-img"
                    />
                    <label
                      htmlFor="upload-profile-img"
                      className=" items-center  cursor-pointer  text-[#FFFFFF] bg-[#383838]  rounded-[4px] px-[8px] py-[10px]   font-normal text-xs"
                    >
                      Upload new picture
                    </label>
                    <button className=" items-center   text-[#FFFFFF] bg-[#383838]  rounded-[4px] px-[8px] py-[10px]   font-normal text-xs">
                      Delete
                    </button>
                  </div>
                  <div className="my-5">
                    <div className="flex items-center  max-[400px]:flex-col justify-between w-full min-[401px]:gap-[30px]">
                      <div className="mb-4 w-[50%] max-[400px]:w-full">
                        <span className="text-[#FFFFFF] text-xs font-medium">
                          User Name
                        </span>
                        <input
                          type="text"
                          name="userName"
                          value={formData.userName}
                          onChange={handleChange}
                          placeholder=""
                          className="mt-1 px-3 py-3 h-[25px] border-[0.5px] border-solid border-[#57472F] rounded-[5px] bg-transparent w-full text-xs font-normal text-[#fff] outline-none focus:ring-0 placeholder-[#57472F]"
                          required
                        />
                      </div>
                      <div className="mb-4 w-[50%] max-[400px]:w-full">
                        <span className="text-[#FFFFFF] text-xs font-medium">
                          Name
                        </span>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder=""
                          className="mt-1 px-3 py-3 h-[25px] border-[0.5px] border-solid border-[#57472F] rounded-[5px] bg-transparent w-full text-xs font-normal text-[#fff] outline-none focus:ring-0 placeholder-[#57472F]"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center  max-[400px]:flex-col justify-between w-full min-[401px]:gap-[30px]">
                      <div className="mb-4 w-[50%] max-[400px]:w-full">
                        <span className="text-[#FFFFFF] text-xs font-medium">
                          Email
                        </span>
                        <input
                          type="text"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder=""
                          className="mt-1 px-3 py-3 h-[25px] border-[0.5px] border-solid border-[#57472F] rounded-[5px] bg-transparent w-full text-xs font-normal text-[#fff] outline-none focus:ring-0 placeholder-[#57472F]"
                          required
                        />
                      </div>
                      <div className="mb-4 w-[50%] max-[400px]:w-full">
                        <span className="text-[#FFFFFF] text-xs font-medium">
                          Password
                        </span>
                        <input
                          type="text"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder=""
                          className="mt-1 px-3 py-3 h-[25px] border-[0.5px] border-solid border-[#57472F] rounded-[5px] bg-transparent w-full text-xs font-normal text-[#fff] outline-none focus:ring-0 placeholder-[#57472F]"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-4 w-[50%] max-[400px]:w-full">
                      <span className="text-[#FFFFFF] text-xs font-medium">
                        Phone number
                      </span>
                      <input
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder=""
                        className="mt-1 px-3 py-3 h-[25px] border-[0.5px] border-solid border-[#57472F] rounded-[5px] bg-transparent w-full text-xs font-normal text-[#fff] outline-none focus:ring-0 placeholder-[#57472F]"
                        required
                      />
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                      <button className=" items-center   text-[#FFFFFF] bg-[#383838]  rounded-[2.5px] px-[15px] py-[5px]   font-medium text-xs">
                        Cancel
                      </button>
                      <button
                        onSubmit={handleSubmit}
                        className=" items-center   text-[#000000] bg-[#FFB501]  rounded-[2.5px] px-[15px] py-[5px]   font-medium text-xs"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {selectedTab === "subscription" && (
                <div className="lg:w-[82%] md:w-[80%] w-full md:px-[25px] pt-[15px]">
                  {/* <div className="flex flex-col items-center justify-center py-[50px]">
                  <p className="text-[#FFFFFF] text-lg font-medium mb-5">
                    Currently You don’t have any subscription
                  </p>
                  <button className=" items-center   text-[#000000] bg-[#FFB501]  rounded-[2.5px] px-[15px] py-[8px]   font-medium text-xs">
                    Buy plan
                  </button>
                </div>*/}
                  {!showpage && (
                    <div className=" my-5">
                      <p className="text-[#FFFFFF] text-lg font-medium mb-5">
                        Your current Subscription
                      </p>
                      <div className="bg-[#181818] rounded-[2.5px] sm:w-[350px]">
                        <div className="flex items-center gap-5  p-[17px]">
                          <button className=" items-center   text-[#FFB501] bg-[#292B29] border-[1px] border-solid border-[#FFB501]  rounded-[7px] px-[8px] py-[8px]   font-medium text-xs">
                            The Alpha
                          </button>
                          <div className="flex items-baseline">
                            <p className="text-[#FFFFFF] text-4xl font-normal">
                              $49
                            </p>
                            <p className="text-[#FF0000] text-[10px] font-normal">
                              15 day left
                            </p>
                          </div>
                        </div>
                        <div className="border-b-[1px] border-solid border-[#303030]"></div>
                        <div className="p-[17px]">
                          <p className="text-[#FFFFFF] text-xs font-normal">
                            The Elites package in addition to gaining access to
                            The Alpha channel within the Illuminals Discord
                          </p>
                          <div className="flex justify-end mt-5">
                            <button
                              onClick={() => setShowPage(true)}
                              className=" items-center   text-[#FFFFFF] bg-[#383838]  rounded-[2.5px] px-[15px] py-[8px]   font-medium text-xs"
                            >
                              Buy plan
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {showpage && (
                    <div className=" ">
                      <div className="grid sm:grid-cols-3 grid-cols-1 max-[420px]:grid-cols-1 gap-5 max-[767px]:my-5">
                        <div className="bg-[#181818] rounded-[2.5px]">
                          <div className="flex flex-col  p-[17px]">
                            <button className=" items-center lg:w-[70%]  text-[#FFFFFF] bg-[#292B29] border-[0.5px] border-solid border-[#FFFFFF]  rounded-[7px] px-[10px] py-[5px]   font-medium text-xs">
                              The Elites
                            </button>
                            <div className="flex items-baseline gap-1 mt-[11px]">
                              <p className="text-[#FFFFFF] lg:text-4xl text-2xl font-normal">
                                $15
                              </p>
                              <p className="text-[#FFFFFF] text-[10px] font-normal">
                                3 month
                              </p>
                            </div>
                          </div>
                          <div className="border-b-[1px] border-solid border-[#303030]"></div>
                          <div className="p-[17px]">
                            <p className="text-[#FFFFFF] lg:text-xs text-[10px] font-normal sm:h-[80px]">
                              Full Access to Chart across all Ordinals NFT on ME
                            </p>
                            <div className="flex justify-center mt-5">
                              <button
                                onClick={() => setShowPopuppage(true)}
                                className=" items-center w-full  text-[#FFFFFF] hover:bg-[#FFB501] hover:text-[#000000] bg-[#383838]  rounded-[2.5px] px-[15px] py-[5px]   font-medium text-xs"
                              >
                                Buy
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="bg-[#181818] rounded-[2.5px]">
                          <div className="flex flex-col  p-[17px]">
                            <button className=" items-center lg:w-[70%]   text-[#FFB501] bg-[#292B29] border-[1px] border-solid border-[#FFB501]  rounded-[7px] px-[10px] py-[5px]   font-medium text-xs">
                              The Alpha
                            </button>
                            <div className="flex items-baseline gap-1 mt-[11px]">
                              <p className="text-[#FFB501] lg:text-4xl text-2xl font-normal">
                                $49
                              </p>
                              <p className="text-[#FFFFFF] text-[10px] font-normal">
                                6 month
                              </p>
                            </div>
                          </div>
                          <div className="border-b-[1px] border-solid border-[#303030]"></div>
                          <div className="p-[17px]">
                            <p className="text-[#FFFFFF] lg:text-xs text-[10px] font-normal sm:h-[80px]">
                              The Elites package in addition to gaining access
                              to The Alpha channel within the Illuminals Discord
                            </p>
                            <div className="flex justify-center mt-5">
                              <button
                                onClick={() => setShowPopuppage(true)}
                                className=" items-center w-full  text-[#FFFFFF] hover:bg-[#FFB501] hover:text-[#000000] bg-[#383838]  rounded-[2.5px] px-[15px] py-[5px]   font-medium text-xs"
                              >
                                Buy
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="bg-[#181818] rounded-[2.5px]">
                          <div className="flex flex-col  p-[17px]">
                            <button className=" items-center lg:w-[70%]  text-[#FFFFFF] bg-[#292B29] border-[0.5px] border-solid border-[#FFFFFF]  rounded-[7px] px-[10px] py-[5px]   font-medium text-xs">
                              The Awakened
                            </button>
                            <div className="flex items-baseline gap-1 mt-[11px]">
                              <p className="text-[#FFFFFF] lg:text-4xl  text-2xl font-normal">
                                $72
                              </p>
                              <p className="text-[#FFFFFF] text-[10px] font-normal">
                                1 year
                              </p>
                            </div>
                          </div>
                          <div className="border-b-[1px] border-solid border-[#303030]"></div>
                          <div className="p-[17px]">
                            <p className="text-[#FFFFFF] lg:text-xs text-[10px] font-normal sm:h-[80px]">
                              The Elites & The Alpha package in addition to
                              gaining access to Bot Tracking channel within the
                              Illuminals Discord
                            </p>
                            <div className="flex justify-center mt-5">
                              <button
                                onClick={() => setShowPopuppage(true)}
                                className=" items-center w-full  text-[#FFFFFF] hover:bg-[#FFB501] hover:text-[#000000] bg-[#383838]  rounded-[2.5px] px-[15px] py-[5px]   font-medium text-xs"
                              >
                                Buy
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Popuppage
        isOpen={showPopuppage}
        onClose={() => setShowPopuppage(false)}
      />
    </>
  );
};

export default Profile;
