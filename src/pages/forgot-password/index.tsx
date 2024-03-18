import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { IoEyeSharp } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log(localStorage.getItem("user"));

    // Add logic to handle password reset initiation
  };

  const handleGotIt = () => {
    router.push("/reset-password");
    setShowConfirmation(false);
    setShowPasswordFields(true);
  };

  return (
    <div>
      <section className="flex py-[100px] justify-center h-[100vh] items-center">
        <div className="  container px-4 lg:w-[844px]  ">
          <div className="bg-[#262726] p-[35px]">
            <div className="">
              <h3 className="text-[#FFFFFF] text-3xl font-medium">
                Forgot password
              </h3>
            </div>

            <div className="flex flex-col items-center justify-center my-5">
              <form onSubmit={handleSubmit}>
                <div className="">
                  <div className="mb-5">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="mt-1 px-3 py-3 border-[1px] border-solid border-[#D3D8DD] rounded-[5px] bg-[#FFFFFF] w-[350px] text-xs font-normal text-[#303030] outline-none focus:ring-0 placeholder-[#303030]"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mb-5 bg-[#FEC801] text-[#000] px-[14px] py-3 rounded-[4px] text-sm font-medium w-[350px]"
                >
                  Confirm your Email
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
