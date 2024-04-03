import Link from "next/link";
import React from "react";
import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-[#121212]  border-t border-[#FFDA83]   fixed bottom-0 w-full  z-[75]">
      <div className="container mx-auto px-4">
        <div className=" flex items-center justify-between gap-2 py-[11px] ">
          <div className="flex items-center gap-5">
            <span>
              <Link href='https://twitter.com/illuminals' target="_blank">
              <FaXTwitter className="text-[#FFFFFF] text-base" />
              </Link>
            </span>

            <span>
            <Link href='https://discord.com/invite/illuminals' target="_blank">
              <FaDiscord className="text-[#FFFFFF] text-base" />
              </Link>

            </span>
          </div>

          <div className="">
            {/* <div className="flex items-center gap-[25px] justify-end">
              <Link href={""} className="text-[#fff] text-xs font-medium">
                About
              </Link>
              <Link href={""} className="text-[#fff] text-xs font-medium">
                Privacy
              </Link>
              <Link href={""} className="text-[#fff] text-xs font-medium">
                Terms
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
