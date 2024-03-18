import Image from "next/image";
import { Inter } from "next/font/google";
import AppCharts from "@/components/App";

const inter = Inter({ subsets: ["latin"] });

export default function MyApp() {
  return (
    <AppCharts />
  );
}
