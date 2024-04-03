import React, { useRef, useState } from "react";
import Image from "next/image";
import Heroimg from "../../../public/assest/heroimg.png";
import Nftimg from "../../../public/assest/nft.png";
import Mapimg from "../../../public/assest/map.png";
import imageAsset from '../../../public/assest/unnamed.jpg';

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
                  Persona of Prestige: Crafting Your Digital Aristocracy Identity
                  </h1>
                  <p className="text-[#FFFFFF] text-base font-normal my-3">
                    {/* A collection of 10,000 avatars that give you membership
                    access to The Garden. It starts with exclusive streetwear
                    collabs, NFT drops, live events, and much more that will be
                    revealed over time. Community ownership in Azuki allows for
                    a new genre of media which the world has yet to explore. An
                    Azuki is your identity in the metaverse — let&apos;s build
                    together. */}
                  </p>
                  <p className="text-[#FFFFFF] text-base font-normal">
                  Crafting an online presence of refined exclusivity. It exudes sophistication, grace, and authority, resonating with timeless elegance. Reflecting unparalleled excellence, it positions you as a paramount figure in your domain.
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
                  Coveted by Connoisseurs of Distinction
                  </h1>
                  <p className="text-[#FFFFFF] text-base font-normal my-3">
                  Illuminals
                  </p>
                  <p className="text-[#FFFFFF] text-base font-normal">
                  Introducing the Illuminals: an exclusive collection of 3,333 meticulously curated anime-based profile pictures. Each image embodies sophistication and artistry, meticulously crafted to epitomize your digital presence in the esteemed realm of web3.
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
                  Beyond the aforementioned, venture further; what secrets lie beyond the known
                  </h1>
                  <p className="text-[#FFFFFF] text-base font-normal my-3">
                    {/* A collection of 10,000 avatars that give you membership
                    access to The Garden. It starts with exclusive streetwear
                    collabs, NFT drops, live events, and much more that will be
                    revealed over time. Community ownership in Azuki allows for
                    a new genre of media which the world has yet to explore. An
                    Azuki is your identity in the metaverse — let&apos;s build
                    together. */}
                  </p>
                  <p className="text-[#FFFFFF] text-base font-normal">
                  Aims to serve as the premier nexus, the eminent bridge, where our platform unites the esteemed Eastern and Western communities converge across the dynamic web3 sphere, engaging and facilitating financial discussion and trades of unparalleled prestige.
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
                  Illuminals is founded on 8th April 2024.
                  </h1>
                  <p className="text-[#FFFFFF] text-base font-normal my-3">
                    {/* A collection of 10,000 avatars that give you membership
                    access to The Garden. It starts with exclusive streetwear
                    collabs, NFT drops, live events, and much more that will be
                    revealed over time. Community ownership in Azuki allows for
                    a new genre of media which the world has yet to explore. An
                    Azuki is your identity in the metaverse — let&apos;s build
                    together. */}
                  </p>
                  <p className="text-[#FFFFFF] text-base font-normal">
                  As the founder of Illuminals, I am deeply honored to serve as the bridge for both the Eastern and Western communities on our platform. Our mission is to foster collaboration and mutual understanding in this vibrant web3 landscape. By coming together, we can unlock limitless opportunities and propel our collective success to new horizons by embracing each other's perspectives towards projects.
Let's embark on this journey together, united in our pursuit of greatness and boundless achievement.
As the founder of Illuminals, I am deeply honored to serve as the bridge for both the Eastern and Western communities on our platform. Our mission is to foster collaboration and mutual understanding in this vibrant web3 landscape. By coming together, we can unlock limitless opportunities and propel our collective success to new horizons by embracing each other's perspectives towards projects.
Let's embark on this journey together, united in our pursuit of greatness and boundless achievement.

                  </p>
                </div>
              </div>
              <div className="lg:w-[55%] w-full">
                <div className="flex lg:justify-end">
                  <Image
                    src={imageAsset}
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
