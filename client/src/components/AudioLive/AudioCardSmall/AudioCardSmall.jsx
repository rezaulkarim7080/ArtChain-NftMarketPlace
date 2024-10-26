import React, { useState } from "react";
import images from "../../../img";
import { TbPlayerPause, TbPlayerPlay } from "react-icons/tb";
import LikeProfile from "../../LikeProfile/LikeProfile";

const AudioCardSmall = () => {
  const [play, setPlay] = useState(false);

  const playMusic = () => {
    setPlay(!play);
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg hover:shadow-xl transition-shadow duration-300 p-4 rounded-lg flex items-center gap-4 cursor-pointer">
      <img
        src={images.creatorbackground1}
        alt="creator background"
        className="w-24 h-24 rounded-md object-cover"
      />
      <div className="flex-1">
        <h4 className="text-lg font-semibold">NFT Music #4322</h4>
        <div className="flex items-center justify-between mt-2">
          <LikeProfile />
          <div className="border border-red-500 text-sm font-semibold rounded-md flex items-center px-2 py-1">
            <small className="bg-red-500 text-white px-1 rounded-md">
              Price
            </small>
            <p className="ml-2">1.00 ETH</p>
          </div>
        </div>
      </div>
      <div
        className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 text-2xl cursor-pointer"
        onClick={playMusic}
      >
        {play ? <TbPlayerPause /> : <TbPlayerPlay />}
      </div>
    </div>
  );
};

export default AudioCardSmall;
