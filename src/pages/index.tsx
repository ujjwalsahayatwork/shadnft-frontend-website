import Image from "next/image";
import { Inter } from "next/font/google";
import AppCharts from "@/components/App";
import Home from "@/components/Home";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { UserProvider } from "@/components/userContext/UserContext";
import Head from "next/head";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export default function MyApp() {
  return (
    // <UserProvider>
    <>
      <Head>
        <title>Illuminals</title>
        <meta name="" content="" />
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <link rel="icon" href="/assest/Logo.png" />
        
      </Head>
    
      <Home />
      
    </>
    // </UserProvider>
  );
}
