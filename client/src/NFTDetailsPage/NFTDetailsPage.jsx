import React from "react";
import NFTDescription from "./NFTDescription/NFTDescription";
import NFTDetailsImg from "./NFTDetailsImg/NFTDetailsImg";

const NFTDetailsPage = ({ nft }) => {
  return (
    <div className="w-full md:my-00 my-10">
      <div className="p-5 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8">
        <NFTDetailsImg image={nft.image} name={nft.name} nft={nft} />
        <NFTDescription nft={nft} />
      </div>
    </div>
  );
};

export default NFTDetailsPage;
