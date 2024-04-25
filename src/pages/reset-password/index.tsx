import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { IoEyeSharp } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { API_CALL } from "@/ApiRoutes/Routes";

const PasswordReset = () => {
  const router = useRouter();

  const [isPasswordChanged, setisPasswordChanged] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
 
  const { token } = router.query;

  const [user, setUser] = useState<any>(null);
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

   
    API_CALL.RESET.post({
      password,
      confirmPassword
    }, token).then((res) => {
      setisPasswordChanged(true);
      router.push("/signin");
    }).catch((err) => {
      console.log(err);
    });
    // Add further logic as needed
  };

  return (
    <div>
      <section className="flex py-[100px] lg:justify-center lg:min-h-[100vh] lg:items-center">
        <div className="  container px-4 lg:w-[844px]  ">
          <div className="bg-[#262726] p-[35px]">
            <div className="">
              <h3 className="text-[#FFFFFF] text-3xl font-medium">
                Reset Password
              </h3>
            </div>

            <div className="flex flex-col items-center justify-center my-5">
              <form onSubmit={handleChangePassword}>
                <div className="mb-5">
                  <div className="flex items-center justify-between  w-[350px] max-[500px]:w-full mt-1 px-3 py-3  border-[1px] border-solid border-[#D3D8DD] rounded-[5px] bg-[#FFFFFF]  text-xs font-normal text-[#303030] ">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="mt-1   bg-[#FFFFFF] w-[350px]  max-[500px]:w-full text-xs font-normal text-[#303030] outline-none focus:ring-0 placeholder-[#303030]"
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
                  <div className="flex items-center justify-between  w-[350px]  max-[500px]:w-full mt-1 px-3 py-3  border-[1px] border-solid border-[#D3D8DD] rounded-[5px] bg-[#FFFFFF]  text-xs font-normal text-[#303030] ">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm Password"
                      className="mt-1   bg-[#FFFFFF] w-[350px] text-xs font-normal  max-[500px]:w-full text-[#303030] outline-none focus:ring-0 placeholder-[#303030]"
                      required
                    />
                    <span
                      className=" cursor-pointer text-[#C2CFE0] text-base"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? <FaRegEyeSlash /> : <IoEyeSharp />}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mb-5 bg-[#FEC801] text-[#000] px-[14px] py-3  max-[500px]:w-full rounded-[4px] text-sm font-medium w-[350px]"
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PasswordReset;
