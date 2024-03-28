"use client"
import { API_CALL } from "../../API/Routes";
import React, { createContext, useContext, useState, useEffect } from "react";
// import { setCookie } from 'cookies-next'
import { toast } from "react-toastify";
// import TOAST_OPTION from "../CustomToast";
import { usePathname, useRouter } from "next/navigation";
// import Cookies from  'js-cookie';
import { useCookies } from 'next-client-cookies';

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
}

interface UserContextType {
    user: UserData | null;
    setUser: (userData: UserData | null) => void;
}

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => { },
});

export const useUserContext = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    let pathname = usePathname()
    const router = useRouter()
    const [user, setUser] = useState<UserData | null>(null);

    const updateUser = (userData: UserData | null) => {
        if (userData) {
            setUser(userData)
            // localStorage.setItem("user", userData.authToken)
            // setCookie('user', "userData.authToken")
            return null
        } else {
            // if (typeof window !== "undefined")
            localStorage.clear();
        }
    };
    const handleNavigate = () => {
        if (pathname != "/signin" && pathname != "/signup" && pathname != "/forgot-password" && pathname != "/reset-password")
            router.push("/signin");
    }
    const getUserFromToken = async () => {
        try {
            if (typeof window === 'undefined') return null
            let token = useCookies();
             let userToken = token.get('token')
            console.log(userToken, "<<<thisistoken")
            if (!token) return handleNavigate()
            let { data } = await API_CALL.GET_LOGGEDIN_USER()
            if (!data.success) {
                // toast.error(data.message, TOAST_OPTION.ERROR)
                updateUser(null)
                return null
            }
            setUser(data.data)

        } catch (error: any) {
            console.log("Error at getUserFromToken", error)
            // toast.error(error.response.data.message, TOAST_OPTION.ERROR)
            updateUser(null)
            handleNavigate()
        }
    }

    useEffect(() => {
        // const storedUser = localStorage.getItem("user");
        if (!user) getUserFromToken()

        // if (storedUser) {
        //   setUser(JSON.parse(storedUser));
        // }
    }, [router]);

    return (
        <UserContext.Provider value={{ user, setUser: updateUser }}>
            {children}
        </UserContext.Provider>
    );
};
