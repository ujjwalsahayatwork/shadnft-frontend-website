import React, { useRef, useState } from "react";
import Image from "next/image";
import Heroimg from "../../../public/assest/heroimg.png";
import Nftimg from "../../../public/assest/nft.png";
import Mapimg from "../../../public/assest/map.png";
const Home = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = [
    {
      title: "Tab 1",
      content: (
        <div className="">
          <div className="">
            <div className="flex items-center lg:flex-row flex-col justify-between gap-3 w-full">
              <div className="lg:w-[45%] w-full">
                <div>
                  <h1 className="text-[#FFFFFF] xl:text-5xl lg:text-4xl text-3xl font-semibold">
                    FROM THE ALLEY TO THE GARDEN
                  </h1>
                  <p className="text-[#FFFFFF] text-base font-normal my-3">
                    A collection of 10,000 avatars that give you membership
                    access to The Garden. It starts with exclusive streetwear
                    collabs, NFT drops, live events, and much more that will be
                    revealed over time. Community ownership in Azuki allows for
                    a new genre of media which the world has yet to explore. An
                    Azuki is your identity in the metaverse — let&apos;s build
                    together.
                  </p>
                  <p className="text-[#FFFFFF] text-base font-normal">
                    Lorem ipsum dolor sit amet consectetur. Et neque faucibus
                    turpis sed. Massa augue maecenas elementum non varius. Eu
                    ante egestas dui morbi nascetur vitae egestas. Nunc donec
                    euismod sit nibh scelerisque mollis id in interdum. Praesent
                    facilisi cursus lorem vestibulum tempor. Id eu magna at
                    tortor consectetur in. Sed rutrum natoque tempus ut
                    volutpat.
                  </p>
                </div>
              </div>
              <div className="lg:w-[55%] w-full">
                <div className="flex lg:justify-end">
                  <Image
                    src={Heroimg}
                    alt="Heroimg"
                    className="w-[658px]"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Tab 2",
      content: (
        <div className="">
          <div className="">
            <div className="flex items-center lg:flex-row flex-col justify-between gap-3 w-full">
              <div className="lg:w-[45%] w-full">
                <div>
                  <h1 className="text-[#FFFFFF] xl:text-5xl lg:text-4xl text-3xl font-semibold">
                    Created by Many
                  </h1>
                  <p className="text-[#FFFFFF] text-base font-normal my-3">
                    A collection of 10,000 avatars that give you membership
                    access to The Garden. It starts with exclusive streetwear
                    collabs, NFT drops, live events, and much more that will be
                    revealed over time. Community ownership in Azuki allows for
                    a new genre of media which the world has yet to explore. An
                    Azuki is your identity in the metaverse — let&apos;s build
                    together.
                  </p>
                  <p className="text-[#FFFFFF] text-base font-normal">
                    Lorem ipsum dolor sit amet consectetur. Et neque faucibus
                    turpis sed. Massa augue maecenas elementum non varius. Eu
                    ante egestas dui morbi nascetur vitae egestas. Nunc donec
                    euismod sit nibh scelerisque mollis id in interdum. Praesent
                    facilisi cursus lorem vestibulum tempor. Id eu magna at
                    tortor consectetur in. Sed rutrum natoque tempus ut
                    volutpat.
                  </p>
                </div>
              </div>
              <div className="lg:w-[55%] w-full">
                <div className="flex lg:justify-end">
                  <Image
                    src={Nftimg}
                    alt="Nftimg"
                    className="xl:w-[510px] w-[400px]"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Tab 3",
      content: (
        <div className="">
          <div className="">
            <div className="flex items-center lg:flex-row flex-col justify-between gap-3 w-full">
              <div className="lg:w-[45%] w-full">
                <div>
                  <h1 className="text-[#FFFFFF] xl:text-5xl lg:text-4xl text-3xl font-semibold">
                    Owned by All
                  </h1>
                  <p className="text-[#FFFFFF] text-base font-normal my-3">
                    A collection of 10,000 avatars that give you membership
                    access to The Garden. It starts with exclusive streetwear
                    collabs, NFT drops, live events, and much more that will be
                    revealed over time. Community ownership in Azuki allows for
                    a new genre of media which the world has yet to explore. An
                    Azuki is your identity in the metaverse — let&apos;s build
                    together.
                  </p>
                  <p className="text-[#FFFFFF] text-base font-normal">
                    Lorem ipsum dolor sit amet consectetur. Et neque faucibus
                    turpis sed. Massa augue maecenas elementum non varius. Eu
                    ante egestas dui morbi nascetur vitae egestas. Nunc donec
                    euismod sit nibh scelerisque mollis id in interdum. Praesent
                    facilisi cursus lorem vestibulum tempor. Id eu magna at
                    tortor consectetur in. Sed rutrum natoque tempus ut
                    volutpat.
                  </p>
                </div>
              </div>
              <div className="lg:w-[55%] w-full">
                <div className="flex lg:justify-end">
                  <Image
                    src={Mapimg}
                    alt="Mapimg"
                    className="w-[658px]"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Tab 4",
      content: (
        <div className="">
          <div className="">
            <div className="flex items-center lg:flex-row flex-col justify-between gap-3 w-full">
              <div className="lg:w-[45%] w-full">
                <div>
                  <h1 className="text-[#FFFFFF] xl:text-5xl lg:text-4xl text-3xl font-semibold">
                    Into the Rabbit Hole
                  </h1>
                  <p className="text-[#FFFFFF] text-base font-normal my-3">
                    A collection of 10,000 avatars that give you membership
                    access to The Garden. It starts with exclusive streetwear
                    collabs, NFT drops, live events, and much more that will be
                    revealed over time. Community ownership in Azuki allows for
                    a new genre of media which the world has yet to explore. An
                    Azuki is your identity in the metaverse — let&apos;s build
                    together.
                  </p>
                  <p className="text-[#FFFFFF] text-base font-normal">
                    Lorem ipsum dolor sit amet consectetur. Et neque faucibus
                    turpis sed. Massa augue maecenas elementum non varius. Eu
                    ante egestas dui morbi nascetur vitae egestas. Nunc donec
                    euismod sit nibh scelerisque mollis id in interdum. Praesent
                    facilisi cursus lorem vestibulum tempor. Id eu magna at
                    tortor consectetur in. Sed rutrum natoque tempus ut
                    volutpat.
                  </p>
                </div>
              </div>
              <div className="lg:w-[55%] w-full">
                <div className="flex lg:justify-end">
                  <Image
                    src={Mapimg}
                    alt="Mapimg"
                    className="w-[658px]"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-[100px] flex flex-col items-center justify-center min-h-[100vh] overflow-x-hidden">
      <div className="container mx-auto px-4">
        <div className="flex lg:items-center flex-row  gap-3">
          <div className="w-[2%]  flex flex-col justify-start  ">
            {tabs.map((tab, index) => (
              <div
                key={index}
                onClick={() => setActiveTab(index)}
                className={`cursor-pointer rounded-[1px] lg:h-[80px] h-full p-2 ${
                  activeTab === index
                    ? "border-l-[3px]  border-[#FEC801]"
                    : "border-l-[3px] border-[#383838]"
                }`}
                style={{
                  borderLeft: index < tabs.length - 1 ? " " : "",
                  // Adjust the spacing between the border and text
                  marginBottom: "20px", // Adjust the spacing between each tab
                }}
              >
                <span className="hidden">{tab.title}</span>
              </div>
            ))}
          </div>
          <div className="w-[98%] overflow-y-auto">
            {tabs[activeTab].content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
