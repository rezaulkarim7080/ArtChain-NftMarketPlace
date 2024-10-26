import React from "react";

import NFTDetailsPage from "./../NFTDetailsPage/NFTDetailsPage";
import Category from "../components/Category/Category";
import { useLocation } from "react-router-dom";

const NFTDetails = () => {
  const location = useLocation();
  const { nft } = location.state;
  return (
    <div>
      <NFTDetailsPage nft={nft} />
      <Category />
    </div>
  );
};

export default NFTDetails;
