import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import Image from "next/image";
import Profileimg from "../../../public/assest/Profile.png";
import Popuppage from "./Popuppage";
import { API_CALL } from "@/ApiRoutes/Routes";
import CookieComponent from "./Cookie";
import { useUserContext } from "../userContext/UserContext";
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
interface User {
  current_plan: {
    name: string;
    price: number;
  } | null;
  expiration_date: string; // Assuming expiration date is a string
}

interface UserContextType {
  user: User;
  showPage: boolean;
  setShowPage: React.Dispatch<React.SetStateAction<boolean>>;
}
const Profile = () => {
  const [selectedTab, setSelectedTab] = useState("editprofile");
  const [profile, setProfile] = useState<string | null>(null);
  const [showpage, setShowPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [subscription, setSubscription] = useState<any>(null);
  const [plans, setPlans] = useState<any>([]);

  const {user }  = useUserContext();

  const [showPopuppage, setShowPopuppage] = useState(0);
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

  interface FormDataCustom {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobile: string;
  }

  interface FormDataCustomAvatar {
    profilePicture: any;
  }

 


  const [formData, setFormDataCustom] = useState<FormDataCustom>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
  });

  const getUserData = () => {
    API_CALL.INFO.get().then((res) => {
      console.log(res.data.data)
      let { email, firstName, lastName, role, mobile, profilePicture } = res.data.data
      if (profilePicture) {
        setImgUrl(profilePicture);
      }
      else {
        setImgUrl("")
      }
      setFormDataCustom((prevData) => ({
        ...prevData,
        email: email,
        firstName: firstName,
        lastName: lastName,
        // role: role,
        mobile: mobile || "",
      }));
    }).catch((err) => { });

  }

  const getPlans = () => {
    API_CALL.PLAN.get().then((res) => {
      setPlans(res.data.data)
    }).catch((err) => {
      console.log(err)
     });
  }

  useEffect(() => {
    getUserData()
    getPlans()
  }, [])
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormDataCustom((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? (e as React.ChangeEvent<HTMLInputElement>).target.checked
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const filteredFormDataCustom = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => value !== '')
    );

    // if profile is not null, update profile
    if (profile) {
      // html form data
      const formDataCustomHtml = new FormData();
      // Add file to form data
      formDataCustomHtml.append('profilePicture', new Blob([profile], { type: 'image/png' }), 'profile.png');

      API_CALL.AVATAR.put(formDataCustomHtml).then((res) => {
        console.log(res)
        getUserData()
      }).catch((err) => {
        console.log(err)
      })
    }
    // Remove empty fields
    API_CALL.UPDATE.put(filteredFormDataCustom).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  };
  const handleDelete = () => {
    API_CALL.AVATAR.delete().then((res) => {
      console.log(res)
      getUserData()
    }).catch((err) => {
      console.log(err)
    })
  }

  const getDate = (date: string | number | Date)=>{
    try {
     const expiry_date : any = new Date(date);

     const current_Date : any = new Date();

     const expirationDate : any = new Date(expiry_date);

     const timeDifferenceMs = expirationDate - current_Date;

     const daysRemaining = Math.ceil(timeDifferenceMs / (1000 * 60 * 60 * 24));


     return daysRemaining;
     
      
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <>
      <section className="flex py-[100px] justify-center items-center min-h-[100vh] ">
        <div className="  container px-4 lg:w-[950px]">
          <div className="bg-[#262726]">
            <div className="flex flex-col items-center justify-center p-[32px]">
              <Image
                src={imgUrl || Profileimg}
                alt="Profile"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '75px', height: '75px', objectFit: 'cover' }}
                className="w-[75px] border-[2px] border-solid border-[#FFB701] rounded-full"
                priority
              />
              <p className="text-lg text-[#FFFFFF] font-medium mt-5">{formData.firstName} {formData.lastName}</p>
              {/* <CookieComponent /> */}
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
                          className={`py-3  text-left sm:text-base text-sm ${tab.key == selectedTab
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
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: '52px', height: '52px', objectFit: 'cover' }}
                          className="w-[52px] rounded-full"
                          priority
                        />
                      ) : (
                        <Image
                          src={imgUrl || Profileimg}
                          alt="Profile"
                          className="w-[52px] rounded-full"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: '52px', height: '52px', objectFit: 'cover' }}
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
                    <button className=" items-center   text-[#FFFFFF] bg-[#383838]  rounded-[4px] px-[8px] py-[10px]   font-normal text-xs" onClick={handleDelete}>
                      Delete
                    </button>
                  </div>
                  <div className="my-5">
                    <div className="flex items-center  max-[400px]:flex-col justify-between w-full min-[401px]:gap-[30px]">
                      <div className="mb-4 w-[50%] max-[400px]:w-full">
                        <span className="text-[#FFFFFF] text-xs font-medium">
                          First Name
                        </span>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder=""
                          className="mt-1 px-3 py-3 h-[25px] border-[0.5px] border-solid border-[#57472F] rounded-[5px] bg-transparent w-full text-xs font-normal text-[#fff] outline-none focus:ring-0 placeholder-[#57472F]"
                          required
                        />
                      </div>
                      <div className="mb-4 w-[50%] max-[400px]:w-full">
                        <span className="text-[#FFFFFF] text-xs font-medium">
                          Last Name
                        </span>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
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
                        Phone number
                        </span>
                        <input
                          type="text"
                          name="password"
                          value={formData.mobile}
                          onChange={handleChange}
                          placeholder=""
                          className="mt-1 px-3 py-3 h-[25px] border-[0.5px] border-solid border-[#57472F] rounded-[5px] bg-transparent w-full text-xs font-normal text-[#fff] outline-none focus:ring-0 placeholder-[#57472F]"
                          required
                        />
                      </div>
                    </div>
                    {/* <div className="mb-4 w-[50%] max-[400px]:w-full">
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
                    </div> */}
                    <div className="flex items-center gap-2 justify-end mt-6">
                      <button className=" items-center   text-[#FFFFFF] bg-[#383838]  rounded-[2.5px] px-[15px] py-[5px]   font-medium text-xs">
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmit}
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
                  {!user.current_plan && !showpage && <div className="flex flex-col items-center justify-center py-[50px]">
                    <p className="text-[#FFFFFF] text-lg font-medium mb-5">
                      Currently You don’t have any subscription
                    </p>
                    <button className=" items-center   text-[#000000] bg-[#FFB501]  rounded-[2.5px] px-[15px] py-[8px]   font-medium text-xs"  onClick={() => setShowPage(true)}>
                      Buy plan
                    </button>
                  </div>}
                  {!showpage  && user.current_plan && (
                    <div className=" my-5">
                      <p className="text-[#FFFFFF] text-lg font-medium mb-5">
                        Your current Subscription
                      </p>
                      <div className="bg-[#181818] rounded-[2.5px] sm:w-[350px]">
                        <div className="flex items-center gap-5  p-[17px]">
                          <button className=" items-center   text-[#FFB501] bg-[#292B29] border-[1px] border-solid border-[#FFB501]  rounded-[7px] px-[8px] py-[8px]   font-medium text-xs">
                          {user.current_plan.name}
                          </button>
                          <div className="flex items-baseline">
                            <p className="text-[#FFFFFF] text-4xl font-normal">
                              ${user.current_plan.price}
                            </p>
                            <p className="text-[#FF0000] text-[10px] font-normal ml-5">
                              {getDate(user.expiration_date)} days left
                            </p>
                          </div>
                        </div>
                        <div className="border-b-[1px] border-solid border-[#303030]"></div>
                        {/* <div className="p-[17px]"> */}
                          {/* <p className="text-[#FFFFFF] text-xs font-normal"> */}
                            {/* The Elites package in addition to gaining access to
                            The Alpha channel within the Illuminals Discord */}
                          {/* </p> */}
                          {/* <div className="flex justify-end mt-5"> */}
                            {/* <button
                              onClick={() => setShowPage(true)}
                              className=" items-center   text-[#FFFFFF] bg-[#383838]  rounded-[2.5px] px-[15px] py-[8px]   font-medium text-xs"
                            > */}
                              {/* Buy plan */}
                            {/* </button> */}
                          {/* </div> */}
                        {/* </div> */}
                      </div>
                    </div>
                  )}
                  {showpage && (
                    <div className=" ">
                      <div className="grid sm:grid-cols-3 grid-cols-1 max-[420px]:grid-cols-1 gap-5 max-[767px]:my-5">
                        {/* <div className="bg-[#181818] rounded-[2.5px]">
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
                        </div> */}
                        {
                          plans?.map((item: any,index:number) => {
                            return (
                              <div className="bg-[#181818] rounded-[2.5px]" key={index}>
                                <div className="flex flex-col  p-[17px]">
                                  <button className=" items-center lg:w-[70%]  text-[#FFFFFF] bg-[#292B29] border-[0.5px] border-solid border-[#FFFFFF]  rounded-[7px] px-[10px] py-[5px]   font-medium text-xs">
                                    {item?.name}
                                  </button>
                                  <div className="flex items-baseline gap-1 mt-[11px]">
                                    <p className="text-[#FFFFFF] lg:text-4xl  text-2xl font-normal">
                                      ${item?.price}
                                    </p>
                                    <p className="text-[#FFFFFF] text-[10px] font-normal">
                                      {item?.time}
                                    </p>
                                  </div>
                                </div>
                                <div className="border-b-[1px] border-solid border-[#303030]"></div>
                                <div className="p-[17px]">
                                  <p className="text-[#FFFFFF] lg:text-xs text-[10px] font-normal sm:h-[80px]">
                                    {item?.description}
                                  </p>
                                  <div className="flex justify-center mt-5">
                                    <button
                                      onClick={() => setShowPopuppage(Number(item?.price))}
                                      className=" items-center w-full  text-[#FFFFFF] hover:bg-[#FFB501] hover:text-[#000000] bg-[#383838]  rounded-[2.5px] px-[15px] py-[5px]   font-medium text-xs"
                                    >
                                      Buy
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        }
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
        isOpen={showPopuppage ? true : false}
        onClose={() => setShowPopuppage(0)}
        price={showPopuppage}
      />
    </>
  );
};

export default Profile;
