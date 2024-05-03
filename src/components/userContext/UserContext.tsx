"use client";
import { API_CALL } from "../../ApiRoutes/Routes";
import React, { createContext, useContext, useState, useEffect } from "react";
// import { setCookie } from 'cookies-next'
import { toast } from "react-toastify";
// import TOAST_OPTION from "../CustomToast";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

interface UserData {
  data: UserData | null;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  role: string;
  status: string;
  token: string;
  authToken: string;
  createdAt: string;
  updatedAt: string;
  adminApprovalStatus: string;
  current_plan: {
    name: string;
  };
}

interface UserContextType {
  user: UserData | any;
  setUser: (userData: UserData | null) => void;
  label: string;
  setLabel: (label: string) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  label: "",
  setLabel: () => {},
});

export const useUserContext = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //let pathname = usePathname()

  let router = useRouter();
  const { pathname } = router;
  const [user, setUser] = useState<UserData | null>(null);
  const [label, setLabel] = useState<string>("");

  const updateUser = (userData: UserData | null) => {
    if (userData) {
      setUser(userData);
      // localStorage.setItem("user", userData.authToken)
      // setCookie('user', "userData.authToken")
      return null;
    } else {
      // if (typeof window !== "undefined")
      localStorage.clear();
    }
  };

  const handleNavigate = () => {
    // console.log('called again');

    if (
      router.pathname != "/" &&
      router.pathname != "/app" &&
      router.pathname != "/signin" &&
      router.pathname != "/signup" &&
      router.pathname != "/forgot-password" &&
      router.pathname != "/reset-password"
    )
      router.push("/signin");
  };
   const getUserFromToken = async () => {
    try {
      if (typeof window === "undefined") return null;
      let token = localStorage.getItem("token");
      //  let userToken = token.get('token')
      // console.log(token,'usecontext');

      if (!token) return handleNavigate();
      if (token) {
        let { data } = await API_CALL.GET_LOGGEDIN_USER();
        // console.log(data,router.pathname,'data');

        if (data.success) {
          setUser(data.data);
          if (router.pathname == "/signin" || router.pathname == "/signup") {
            return router.push("/");
          }
          router.push(router.pathname);
          return;
        }
        if (!data.success) {
          // toast.error(data.message, TOAST_OPTION.ERROR)
          updateUser(null);
          return null;
        }
      }

      // let { data } = await API_CALL.GET_LOGGEDIN_USER()

      //  if(data.success){

      //     setUser(data.data)
      //     return ;
      //  }
    } catch (error: any) {
      console.log("Error at getUserFromToken", error);
      // toast.error(error.response.data.message, TOAST_OPTION.ERROR)
      updateUser(null);
      handleNavigate();
    }
  };

  useEffect(() => {
    // const storedUser = localStorage.getItem("user");

    if (!user || user == null) {
      getUserFromToken();
    }

    // if (storedUser) {
    //   setUser(JSON.parse(storedUser));
    // }
  }, [router.pathname]);

  const handleLabelChange = (newLabel: string) => {
    setLabel(newLabel);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser: updateUser, label, setLabel: handleLabelChange }}
    >
      {children}
    </UserContext.Provider>
  );
};
