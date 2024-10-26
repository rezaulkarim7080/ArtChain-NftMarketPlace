import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TbPlayerPause, TbPlayerPlay } from "react-icons/tb";
import img from "../../../img";
import LikeProfile from "../../LikeProfile/LikeProfile";

const AudioCard = () => {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(25); // State for like count
  const [play, setPlay] = useState(false);

  const likeNft = () => {
    if (like) {
      setLikeCount(likeCount - 1); // Decrease count if unliked
    } else {
      setLikeCount(likeCount + 1); // Increase count if liked
    }
    setLike(!like); // Toggle the like state
  };

  const playMusic = () => {
    setPlay(!play);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out bg-white p-6">
      {/* Like and Time */}
      <div className="flex justify-between items-center z-10 mb-4 relative">
        {/* Like */}
        <div
          className={`flex items-center gap-2 p-2 rounded-full cursor-pointer transition-colors ${
            like ? "bg-red-500 text-white" : "bg-gray-200 text-red-500"
          }`}
          onClick={likeNft}
        >
          {like ? (
            <AiFillHeart className="text-2xl" />
          ) : (
            <AiOutlineHeart className="text-2xl" />
          )}
          {/* Display the dynamic like count */}
          <span>{likeCount}</span>
        </div>
        {/* Time */}
        <div className="absolute right-0  p-2 skew-x-[35deg] rounded-tl-lg">
          <div className="skew-x-[-35deg] text-center pt-2">
            <small className="text-white ">Remaining time</small>
            <h5 className="text-xl text-white mt-2">3h : 15m : 20s</h5>
          </div>
        </div>
      </div>

      {/* Music Player */}
      <div className="flex items-center gap-4 mb-6 relative z-20">
        <img src={img.musiceWave} alt="music wave" className="w-44 h-5" />
        <div
          className="flex items-center justify-center w-16 h-16 rounded-full cursor-pointer bg-gray-200 z-30"
          onClick={playMusic}
        >
          {play ? (
            <TbPlayerPause className="text-2xl" />
          ) : (
            <TbPlayerPlay className="text-2xl" />
          )}
        </div>
      </div>

      {/* Details */}
      <div className="flex justify-between items-center relative z-20">
        <div>
          <h4 className="text-lg font-semibold text-white">NFT music #1234</h4>
          <div className="flex items-center gap-2 border border-red-500 p-2 rounded-md h-12 cursor-pointer mt-2">
            <small className="bg-red-500 text-white p-1 rounded-md">
              Price
            </small>
            <p className="text-white">$32,244.41</p>
          </div>
        </div>
        <div className="text-right">
          <LikeProfile />
          <small className="mt-2 block text-white">24 in stock</small>
        </div>
      </div>

      {/* Background Image */}
      <img
        src={img.BigNft4}
        alt="audioCard background"
        className="absolute inset-0 w-full h-full object-cover "
      />
    </div>
  );
};

export default AudioCard;
