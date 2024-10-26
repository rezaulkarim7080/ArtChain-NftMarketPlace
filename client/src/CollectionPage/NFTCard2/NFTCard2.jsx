import React, { useState } from "react";
import { BsImage } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router-dom
import LikeProfile from "../../components/LikeProfile/LikeProfile";
import Countdown from "../../NFTDetailsPage/NFTDescription/Countdown";
import { MdTimer } from "react-icons/md";

const NFTCard2 = ({ NFTData }) => {
  const creationTime = Date.now();
  const [likes, setLikes] = useState({});

  const navigate = useNavigate();

  const likeNFT = (tokenId) => {
    setLikes((prevLikes) => {
      const isLiked = !!prevLikes[tokenId]; // Check if already liked
      const newLikesCount = isLiked
        ? prevLikes[tokenId]?.count || 23
        : (prevLikes[tokenId]?.count || 23) + 1; // Increment count or reset to initial value
      return {
        ...prevLikes,
        [tokenId]: { liked: !isLiked, count: newLikesCount }, // Update the like state
      };
    });
  };

  const goToDetails = (el) => {
    navigate(`/nft/${el.tokenId}`, { state: { nft: el } });
  };

  return (
    <div className="p-5  mx-auto grid grid-cols-1 md:grid-cols-3 gap-2 mb-16">
      {NFTData.map((el) => {
        const isLiked = likes[el.tokenId]?.liked; // Get like state for this NFT
        const likeCount = likes[el.tokenId]?.count || 25; // Get like count or default to 23

        return (
          <div
            className="grid cursor-pointer transition-all duration-300 ease-in relative hover:shadow-lg rounded-3xl" // Add relative here
            key={el.tokenId} // Use tokenId as key
            onClick={() => goToDetails(el)} // Navigate to NFTDetailsPage
          >
            <div className="glass-effect relative p-2">
              {/* Like and Icon Section (Positioned on top of the image) */}
              <div className="absolute top-5 left-0  flex items-center justify-between w-full px-4 z-[1111111]">
                <BsImage className="text-icons-color text-2xl" />
                <p
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the card click
                    likeNFT(el.tokenId);
                  }}
                  className="flex items-center gap-4 text-xl bg-icons-color text-main-bg rounded-full px-2 "
                >
                  {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                  <span>{likeCount}</span>
                </p>
              </div>

              {/* Image Section */}
              <div className="col-span-full row-span-full">
                <img
                  src={el.image}
                  alt={el.name}
                  style={{ objectFit: "cover" }}
                  className="rounded-xl h-[100% ] w-[100%]"
                  // className="rounded-xl h-[400px ] w-[400px]"
                />
              </div>

              {/* Info Section */}
              <div className="flex justify-between p-4">
                <div className="flex items-center">
                  <LikeProfile />
                  <p className="text-2xl font-bold ml-2">{el.name}</p>
                </div>
                <small className="text-base">#{el.tokenId}</small>
              </div>

              {/* Price Section */}
              <div className="flex justify-between items-end p-4">
                <div>
                  <small className=" text-main-bg px-1 py-0.5 rounded-sm">
                    Current Bid
                  </small>
                  <p className="border-[1px] border-cyan-600  p-4 text-xl mt-2 rounded-xl">
                    {el.price} ETH
                  </p>
                </div>
                <p className="flex flex-col items-center  gap-2 text-lg">
                  <div className="flex justify-between items-center gap-2 text-lg">
                    <MdTimer />
                    <span>{el.timeLeft} hours left</span>
                  </div>
                  <Countdown
                    initialTime={creationTime}
                    FontClass="font-semi-bold"
                  />
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NFTCard2;
