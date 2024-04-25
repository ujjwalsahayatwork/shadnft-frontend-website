import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";



import { IoEyeSharp } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import config from "../../config/config";
import axios from "axios";
import { useRouter } from "next/router";
import Loader from "@/components/extras/loader";
import {API_CALL} from "../../ApiRoutes/Routes";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (name === "confirmPassword") {
      // check if password and confirm password match
      if (value !== formData.password) {
        setErrorMessage("Passwords do not match");
      }
      else {
        setErrorMessage("");
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? (e as React.ChangeEvent<HTMLInputElement>).target.checked
          : value,
    }));
  };
  const handleRoleChange = (selectedRole: string) => {
    setFormData((prevData) => ({
      ...prevData,
      role: selectedRole,
    }));
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    setLoading(true);

    // Delete confirmPassword field from formData as backend does not accept it
    const { confirmPassword, ...rest } = formData;
    const formDataWithoutConfirmPassword = rest;

    // submit form data
    // axios
    //   .post(`${config.baseURL}/user/createWithEmail`, formDataWithoutConfirmPassword).then((res) => {
    //     let success = res.data?.success;
    //     if (success) {
    //       router.push("/signin");
    //     }
    //   })
    //   .catch((err) => {
    //     // console.log(err);
    //     // get preview error message
    //     let error = err.response?.data?.data?.[0]?.message || "Something went wrong";
    //     setErrorMessage(error);
    //     setLoading(false);
    //   });

    try {
      API_CALL.SIGNUP.post(formDataWithoutConfirmPassword).then((res) => {
        const cookies = res.headers;
        let success = res.data?.success;

        console.log(cookies);
        if (success) {
          router.push("/signin");
        }
      })
        .catch((err) => {
          // console.log(err);
          // get preview error message
          let error = err.response?.data?.data?.[0]?.message || "Something went wrong";
          setErrorMessage(error);
          setLoading(false);
        });

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <>
      <section className="flex py-[100px] justify-center items-center min-h-[100vh] ">
        <div className="  container px-4 lg:w-[844px]">
          <div className="bg-[#262726] p-[35px]">
            <div className="">
              <h3 className="text-[#FFFFFF] text-3xl font-medium">Sign Up</h3>
            </div>
            <div className="flex flex-col items-center justify-center my-5">
              <form onSubmit={handleSubmit}>
                <div className="">
                  <div className="mb-5">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      className="mt-1 px-3 py-3 w-[350px] border-[1px] border-solid border-[#D3D8DD] rounded-[5px] bg-[#FFFFFF]  text-xs font-normal text-[#303030] outline-none focus:ring-0 placeholder-[#303030]"
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="mt-1 px-3 py-3  border-[1px] border-solid border-[#D3D8DD] rounded-[5px] bg-[#FFFFFF] w-[350px] text-xs font-normal text-[#303030] outline-none focus:ring-0 placeholder-[#303030]"
                      required
                    />
                  </div>
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

                  <div className="mb-5">
                    <div className="flex items-center justify-between w-[350px] mt-1 px-3 py-3  border-[1px] border-solid border-[#D3D8DD] rounded-[5px] bg-[#FFFFFF]  text-xs font-normal text-[#303030] ">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        className="mt-1   bg-[#FFFFFF] w-[350px] text-xs font-normal text-[#303030] outline-none focus:ring-0 placeholder-[#303030]"
                        required
                      />
                      <span
                        className=" cursor-pointer text-[#C2CFE0] text-base"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {showConfirmPassword ? (
                          <FaRegEyeSlash />
                        ) : (
                          <IoEyeSharp />
                        )}
                      </span>
                    </div>
                    {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
                  </div>
                </div>

                {loading ? <Loader /> : <button
                  type="submit"
                  className="mb-5 bg-[#FEC801] text-[#000] px-[14px] py-3 rounded-[4px] text-sm font-medium w-[350px]"
                >
                  Sign Up
                </button>
                }
                <div>
                  <span className="text-sm font-normal text-[#ffffff96]">
                    Already have an account?{" "}
                    <Link href="/signin">
                      <span className="text-[#fff] font-medium">Sign In</span>
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

export default Signup;
