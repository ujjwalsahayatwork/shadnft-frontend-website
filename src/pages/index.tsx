import Image from "next/image";
import { Inter } from "next/font/google";
import AppCharts from "@/components/App";
import Home from "@/components/Home";
import { useEffect } from "react";
import Cookies from "js-cookie";

const inter = Inter({ subsets: ["latin"] });

export default function MyApp() {


  return(
    <Home />
  );
}
