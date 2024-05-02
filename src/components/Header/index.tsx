import React, { useState, useEffect, useRef, useContext } from "react";
import Logo from "../../../public/assest/Logo.png";
import Profile from "../../../public/assest/Profile.png";
import { RiArrowDownSLine } from "react-icons/ri";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { RiArrowDownSFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import Image from "next/image";
import { PiSignOutBold } from "react-icons/pi";
import router from "next/router";
import { useRouter } from "next/router";
import { AiOutlineDown } from "react-icons/ai";
import { API_CALL } from "../../ApiRoutes/Routes.js";
import Cookies from  'js-cookie';
import { deleteCookie } from "cookies-next";
import { useUserContext } from "../userContext/UserContext";


// import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';

// export const removeToken = async ()=>{
//   // Cookies.remove('loggedIn')
//    .then((res: any) => {
//    console.log("DATA from API", res.data)
//    if(res.data.success){
     
    
//     return true
//    }else{

//     // alert('Error Logout')
//     console.log('Erorr while logout');
//     return false;
    
//    }
   
//   })
//     // deleteCookie('token')  
//   // window.location.href = window.location.href;
  
// }
const Header: React.FC = () => {
  const [showDropNav, setShowDropNav] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [testnet, setTestnet] = useState(false);
  const router = useRouter();

  let {user,setUser} = useUserContext();
  
  
    useEffect(()=>{
    if(router.pathname == '/'){
      // console.log('inside uuseee');
      
      setActiveLink('home')
    }else{
      
      setActiveLink('app')
    }
    },[router.pathname,activeLink])
 
  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setTestnet(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const handleClick = (link: any) => {
    setActiveLink(link);
  };
  const handleLinkClick = () => {
    setShowDropdown(false);
  };
  useEffect(() => {
    // Extract the first segment of the pathname to determine the active link
    const segments = router.pathname.split("/");
    setActiveLink('home');
  }, []);

  const homeLinkStyles = (link: any) => {
    return {
      color: activeLink === link ? "#E6CD4A" : "#FFFFFF",
    };
  };
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // Set isScrolled to true when scrolled
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleLink() {
    setShowDropNav(false);
  }

  const handleLogout = async() => {
    try {
      // setShowDropNav(!showDropNav)
    const res : any =  await API_CALL.LOGOUT.get()
  
    if(res.data.success){
      window.location.reload()
       setUser(null)
      localStorage.removeItem('token')
      localStorage.removeItem('UserLogin');
      
      setShowDropdown(false);
      router.push('/signin')
    }
      
    } catch (error) {
      console.log(error,'errror');
    }
  };

  

  return (
    <div>
      <>
        <div
          className={`fixed header top-0 z-[60]  border-b-[0.5px] border-solid border-[#FFDA83]  w-full justify-between flex items-center py-[15px] 
          ${isScrolled ? "bg-[#0E0E0E]" : "bg-[#0E0E0E]"}`}
        >
          <div className="container mx-auto px-4 max-[767px]:hidden">
            <div className="flex  justify-between  items-center">
              <Link href="/" onClick={()=>setActiveLink('home')}>
                <Image src={Logo} alt="" className="w-[49px] " priority />
              </Link>

              <div className="relative list head-nav md:flex items-center  nav_font_fmaily font-normal text-sm min-[992px]:gap-8 gap-4">
                <Link
                  href="/"
                  passHref
                  onClick={() => handleClick("home")}
                  style={homeLinkStyles("home")}
                >
                  Home
                </Link>
                <Link
                  href="/app"
                  passHref
                  onClick={() => handleClick("app")}
                  style={homeLinkStyles("app")}
                >
                  App
                </Link>

                <div className="flex items-center gap-[10px]">
                  <div className="relative">
                    <div
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="cursor-pointer items-center relative border-[1px] border-solid border-[#7B6E2D] flex  gap-[5px]  rounded-[5px]  px-[5px] py-[5px]  text-[#000000] font-medium text-sm"
                     >
                      {
                        user && ( <Image
                        src={user.profilePicture || Profile}
                        alt="Profile" width={40} height={40}
                        className=" rounded-full"
                        priority
                      />
                        ) 
                      }
                      <span className="text-[#7B6E2D] text-sm font-medium">
                        {user?.firstName ? user.firstName  + user.lastName: <Link href='/signin'>
                          <button className="p-1">Login</button>
                          </Link>}
                      </span>
                     {
                      user &&  <span className="text-[#7B6E2D] text-sm font-medium">
                      <RiArrowDownSFill />
                    </span>
                     }
                    </div>
                  {user && showDropdown && 
                    <div
                      className={`${
                        showDropdown ? "block" : "hidden"
                      } absolute top-[50px] left-0  w-[187px] z-[50]   bg-[#161515]`}
                    >
                      <div className="flex flex-col  w-full">
                        <Link href="/profile" onClick={handleLinkClick}>
                          <div className="text-[#FFF] text-base cursor-pointer p-3  flex items-center gap-[15px] font-semibold">
                            <span>
                              <CgProfile className="text-lg" />
                            </span>
                            <span> Profile</span>
                          </div>
                        </Link>
                        <div className="border-b-[0.5px] border-solid border-[#9CE1D3]"></div>
                        <div className="text-[#FFF] text-base cursor-pointer p-3  flex items-center gap-[15px] font-semibold"  >
                          <span>
                            <PiSignOutBold />
                          </span>
                          {user  ? <span onClick={handleLogout}>Signout</span> :<Link href='/signin'><span >Signin</span></Link>}
                          
                        </div>
                      </div>
                    </div>
                    }
                  </div>
                  {/* <button className=" items-center bg-[#FEC801]  rounded-[5px] px-3 xl:px-[15px] py-2 xl:py-[11px] text-[#000000] font-medium text-sm">
                    Connect Wallet
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 md:hidden">
            <div className="flex lg:hidden justify-between text-[#fff] font-bold text-sm items-center">
              <Link href="/">
                <Image src={Logo} alt="" className="w-[49px] " priority />
              </Link>
              {!showDropNav ? (
                <div
                  className="text-2xl menu-icon text-[#fff]"
                  onClick={() => setShowDropNav(!showDropNav)}
                >
                  <RxHamburgerMenu />
                </div>
              ) : (
                <div
                  className="text-2xl menu-icon text-[#fff]"
                  onClick={() => setShowDropNav(!showDropNav)}
                >
                  <RxCross2 />
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={`
          bg-[#0E0E0E] moblie-nav    z-[50] fixed w-full top-0 overflow-y-auto overflow-x-hidden  bottom-0 pt-16 
        duration-500 ${showDropNav ? "right-0" : "right-[-100%]"}
        `}
        >
          <div className=" flex items-start px-4  flex-col text-base text-[#fff] font-medium mt-5">
            <div className="py-4">
              <Link href="#" onClick={handleLink}>
                Home
              </Link>
            </div>
            <div className="pb-4">
              <Link href="/app" onClick={handleLink}>
                App
              </Link>
              
            </div>

            <div className="flex items-center gap-[10px]">
              <div className="relative" ref={dropdownRef}>
                <div
                  onClick={() => setShowDropdown(!showDropdown)}
                  className=" items-center relative border-[1px] border-solid border-[#7B6E2D] flex  gap-[5px]  rounded-[5px]  px-[5px] py-[5px]  text-[#000000] font-medium text-sm"
                >
                  <Image
                    src={Profile}
                    alt="Profile"
                    className="w-[30px]"
                    priority
                  />
                  <span className="text-[#7B6E2D] text-sm font-medium">
                  {user?.firstName ? user.firstName : 'Steve Smith'}
                  </span>
                  <span className="text-[#7B6E2D] text-sm font-medium">
                    <RiArrowDownSFill />
                  </span>
                </div>
                {showDropdown && (
                  <div className="absolute top-[50px] left-0  w-[187px]    bg-[#161515] ">
                    <div className="flex flex-col  w-full">
                      <div className="text-[#FFF] text-base cursor-pointer p-3  flex items-center gap-[15px] font-semibold">
                        <span>
                          <CgProfile className="text-lg" />
                        </span>
                        <span> Profile</span>
                      </div>
                      <div className="border-b-[0.5px] border-solid border-[#9CE1D3]"></div>
                      <div className="text-[#FFF] text-base cursor-pointer p-3  flex items-center gap-[15px] font-semibold">
                        <span>
                          <PiSignOutBold />
                        </span>
                        {user ? <span onClick={handleLogout}>Signout</span> :<Link href='/signin'><span >Signin</span></Link>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* <button className=" items-center bg-[#FEC801]  rounded-[5px] px-3 xl:px-[15px] py-2 xl:py-[11px] text-[#000000] font-medium text-sm">
                Connect Wallet
              </button> */}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Header;

