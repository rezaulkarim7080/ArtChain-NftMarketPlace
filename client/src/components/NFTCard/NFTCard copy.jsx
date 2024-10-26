import images from "../../img";
import { BsImages } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";

const NFTCard = () => {
  const [like, setLike] = useState(true);
  const featureArray = [
    images.nft_1,
    images.nft_image_3,
    images.nft_image_2,
    images.nft_1,
    images.nft_image_2,
    images.nft_image_3,
  ];

  const likeNFT = () => {
    setLike(!like);
  };

  return (
    <div className="w-[95%]  grid grid-cols-1   sm:grid-cols-2 md:grid-cols-3 gap-6">
      {featureArray.map((el, i) => (
        <div
          className="bg-gray-100 p-4 rounded-lg shadow-lg cursor-pointer grid grid-cols-4 grid-rows-4 relative"
          key={i + 1}
        >
          <div className="col-span-4 row-span-full overflow-hidden rounded-lg">
            <img
              src={el}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              alt="nft_image"
            />
          </div>
          <div className="col-span-4 row-span-2 flex items-start justify-between z-10">
            <div className="bg-blue-500 p-2 text-white rounded-full m-4">
              <div
                className="flex items-center text-lg gap-2 cursor-pointer"
                onClick={likeNFT}
              >
                {like ? (
                  <AiOutlineHeart />
                ) : (
                  <AiFillHeart className="text-red-500" />
                )}
                22
              </div>
            </div>
            <div className="bg-gray-100 p-2 text-center rounded-tl-lg mr-[-2em]">
              <div className="bg-gray-100">
                <small>Remaining time</small>
                <p className="text-xl font-bold">3h : 15 m : 20s</p>
              </div>
            </div>
          </div>
          <div className="col-span-4 row-start-3 row-end-5 flex items-end gap-4">
            <div className="bg-gray-100 ml-[-3rem] p-2 rounded-tr-lg z-10">
              <div className="pl-12">
                <h4 className="text-xl">Clone #145454</h4>
                <div className="flex justify-around items-end">
                  <div className="border border-blue-500 p-1 rounded-sm">
                    <small className="bg-blue-500 text-white rounded-sm p-1">
                      Current Bid
                    </small>
                    <p className="font-semibold">1.000ETH</p>
                  </div>
                  <div>
                    <small>61 in stock</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-blue-500 text-xl ml-6">
              <BsImages />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NFTCard;
