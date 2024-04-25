import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {GetServerSideProps} from "next";

import { IoEyeSharp } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { API_CALL } from "@/ApiRoutes/Routes";
import Loader from "@/components/extras/loader";


const Signin = ({ showMessage = "" }) => {
    
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //const [data, setData] = useState(null);
  // const { setUser } = useUserContext();
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  function parseCookies(cookieString: string) {
    return cookieString.split(';').reduce((cookies: Record<string, string>, cookie) => {
      const [name, value] = cookie.trim().split('=');
      cookies[name] = decodeURIComponent(value);
      return cookies;
    }, {});
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Remove agreeToTerms from formData
    const { agreeToTerms, ...rest } = formData;
    const formDataWithoutAgreeToTerms = rest;

    await API_CALL.LOGIN.post(formDataWithoutAgreeToTerms)
      .then((response) => {
        // Get header cookies
       
      
        
        if (response.data.success) {
          // localStorage.removeItem('token')
          localStorage.setItem('token',response.data.data.token)
          // const cookies = parseCookies(document.cookie);
          // console.log(cookies);
          setLoading(false);
          localStorage.setItem('UserLogin',"true")
          router.push("/");
        }
      })
      .catch((err) => {
        let error = err.response?.data?.data?.[0]?.message || err?.response?.data?.message || err?.message || "Something went wrong";
        setErrorMessage(error);
        setLoading(false);
      });
  };

  
  return (
    <>
      <section className="flex py-[100px] justify-center h-[100vh] items-center">
        <div className="  container px-4 lg:w-[844px]  ">
          <div className="bg-[#262726] p-[35px]">
            <div className="">
              <h3 className="text-[#FFFFFF] text-3xl font-medium">Login</h3>
            </div>

            <div className="flex flex-col items-center justify-center my-5">
              <form onSubmit={handleSubmit}>
                <div className="">
                  <div className="mb-5">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="mt-1 px-3 py-3 w-[350px] border-[1px] border-solid border-[#D3D8DD] rounded-[5px] bg-[#FFFFFF] text-xs font-normal text-[#303030] outline-none focus:ring-0 placeholder-[#303030]"
                      required
                    />
                  </div>
                  <div className="mb-5 ">
                    <div className="flex items-center justify-between w-[350px] mt-1 px-3 py-3  border-[1px] border-solid border-[#D3D8DD] rounded-[5px] bg-[#FFFFFF]  text-xs font-normal text-[#303030] ">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder=" Password"
                        className="mt-1   bg-[#FFFFFF] w-[350px] text-xs font-normal text-[#303030] outline-none focus:ring-0 placeholder-[#303030]"
                        required
                      />
                      <span
                        className=" cursor-pointer text-[#C2CFE0] text-base"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaRegEyeSlash /> : <IoEyeSharp />}
                      </span>
                    </div>
                  </div>
                  {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
                  <div className="my-[30px] ">
                    <div className="flex items-center w-[350px] justify-between gap-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleChange}
                          className="mr-2 border-[#90A0B7] border-solid border-[1px]"
                        />
                        <span className="text-xs font-medium text-[#ffffff96]">
                          Keep me logged in
                        </span>
                      </div>
                      <Link href="/forgot-password">
                        <span className="text-[#FFFFFF] text-xs font-normal underline">
                          Forgot password?
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>

                {loading ? <Loader /> : <button
                  type="submit"
                  className="mb-5 bg-[#FEC801] text-[#000] px-[14px] py-3 rounded-[4px] text-sm font-medium w-[350px]"
                >
                  Login
                </button>}

                <div>
                  <span className="text-sm font-normal text-[#ffffff96]">
                    Don’t have an account?{" "}
                    <Link href="/signup">
                      <span className="text-[#fff] font-medium">Sign Up</span>
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
