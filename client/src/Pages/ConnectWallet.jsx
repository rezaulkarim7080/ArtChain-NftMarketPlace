import images from "../img";
import { useState } from "react";

const ConnectWallet = () => {
  const [activeBtn, setActiveBtn] = useState(1);
  const providerArray = [
    {
      provider: images.user3,
      name: "Metamask",
    },
    {
      provider: images.user4,
      name: "walletConnect",
    },
    {
      provider: images.user5,
      name: "walletLink",
    },
    {
      provider: images.user6,
      name: "Formatic",
    },
  ];

  return (
    <div className="w-full my-20">
      <div className="w-1/2 mx-auto">
        <h1 className="text-3xl">Connect Your Wallet</h1>
        <p className="text-xl pb-8 border-b border-icons-color">
          Connect your wallet Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Deleniti, maxime.
        </p>
        <div className="my-20">
          {providerArray.map((el, i) => (
            <div
              className={`flex items-center gap-8 rounded-xl mt-6 border border-icons-color cursor-pointer transition-all duration-300 ease-in ${
                activeBtn === i + 1 ? "bg-main-bg-color text-icons-color" : ""
              }`}
              key={i + 1}
              onClick={() => setActiveBtn(i + 1)}
            >
              <img
                src={el.provider}
                alt="provider"
                width={70}
                height={70}
                className="rounded-full"
              />
              <p className="text-2xl">{el.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
