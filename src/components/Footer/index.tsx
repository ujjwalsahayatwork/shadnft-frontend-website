import Link from "next/link";
import React from "react";
import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-[#121212]  border-t border-[#FFDA83]   fixed bottom-0 w-full max-[1023px]:hidden z-[75]">
      <div className="container mx-auto max-[1100px]:px-4">
        <div className=" flex items-center justify-between gap-2 py-[11px] ">
          <div className="flex items-center gap-5">
            <span>
              <FaXTwitter className="text-[#FFFFFF] text-base" />
            </span>

            <span>
              <FaDiscord className="text-[#FFFFFF] text-base" />
            </span>
          </div>

          <div className="">
            <div className="flex items-center gap-[25px] justify-end">
              <Link href={""} className="text-[#fff] text-xs font-medium">
                About
              </Link>
              <Link href={""} className="text-[#fff] text-xs font-medium">
                Privacy
              </Link>
              <Link href={""} className="text-[#fff] text-xs font-medium">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
