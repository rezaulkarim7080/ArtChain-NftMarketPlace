import React, { useState, useEffect } from "react";
import { BsImages } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

const NFTDetailsImg = ({ image, name, nft }) => {
  const [description, setDescription] = useState(true);
  const [detail, setDetail] = useState(true);
  const [likeCount, setLikeCount] = useState(25); // Initial like count
  const [like, setLike] = useState(false);

  // Load initial like state from local storage
  useEffect(() => {
    const likedNFTs = JSON.parse(localStorage.getItem("likedNFTs")) || [];
    // Check if the likedNFTs contains the tokenId
    if (likedNFTs.find((item) => item.tokenId === nft.tokenId)) {
      setLike(true);
    }
  }, [nft.tokenId]);

  const likeNFT = () => {
    setLike(!like);
    setLikeCount((prevCount) => (like ? prevCount - 1 : prevCount + 1));

    const likedNFTs = JSON.parse(localStorage.getItem("likedNFTs")) || [];

    if (like) {
      // Remove from liked NFTs
      const updatedNFTs = likedNFTs.filter(
        (item) => item.tokenId !== nft.tokenId
      );
      localStorage.setItem("likedNFTs", JSON.stringify(updatedNFTs));
    } else {
      // Add to liked NFTs
      likedNFTs.push(nft); // Save the entire NFT object
      localStorage.setItem("likedNFTs", JSON.stringify(likedNFTs));
    }
  };

  const toggleDescription = () => {
    setDescription(!description);
  };

  const toggleDetails = () => {
    setDetail(!detail);
  };

  return (
    <div className="w-full">
      <div>
        <div className="grid">
          <div className="flex items-center justify-between col-span-full row-span-full self-start px-8 z-[111111]">
            <BsImages className="text-xl" />
            <p
              className="bg-cyan-600 text-white px-4 py-1 flex items-center gap-2 rounded-full cursor-pointer"
              onClick={likeNFT}
            >
              {like ? (
                <AiFillHeart className="text-xl" />
              ) : (
                <AiOutlineHeart className="text-xl" />
              )}
              <span>{likeCount}</span>
            </p>
          </div>

          {/* Image */}
          <div className="col-span-full row-span-full">
            <img
              src={image}
              alt={name}
              className="rounded-lg w-full h-auto object-cover"
              width={700}
              height={800}
            />
          </div>
        </div>

        {/* Description Toggle */}
        <div
          className="flex items-center justify-between border-black bottom-1 p-4 rounded-lg mt-4 cursor-pointer"
          onClick={toggleDescription}
        >
          <p>Description</p>
          {description ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </div>

        {description && (
          <div className="p-2 text-sm">
            <p>{nft.description}</p>
          </div>
        )}

        {/* Details Toggle */}
        <div
          className="flex items-center justify-between p-4 rounded-lg mt-4 cursor-pointer"
          onClick={toggleDetails}
        >
          <p>Details</p>
          {detail ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </div>

        {detail && (
          <div className="p-2 text-sm">
            <p>
              <small>Creator Address</small>
              <br />
              {nft.seller}
            </p>
            <p>
              <small>Token ID</small>
              <br />
              {nft.tokenId}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTDetailsImg;
