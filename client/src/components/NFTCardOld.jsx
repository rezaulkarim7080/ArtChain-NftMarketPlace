import React from "react";
import GetIpfsUrlFromPinata from "../../utils";
import { Link } from "react-router-dom";

const NFTCardOld = ({ item }) => {
  const IPFSUrl = GetIpfsUrlFromPinata(item.image);
  console.log("IPFS URL:", IPFSUrl); // Debugging the IPFS URL

  const limitedDescription =
    item.description && item.description.length > 100
      ? item.description.substring(0, 100) + "..."
      : item.description || "No description available";

  return (
    <div className="hover:bg-slate-100 text-center p-4">
      <Link to={`/nft/${item.tokenId}`}>
        <div>
          <img
            className="rounded-md"
            src={IPFSUrl}
            alt={item.name}
            width={400}
            height={360}
          />
        </div>
        <div>
          <strong>{item.name}</strong>
          <p>{limitedDescription}</p>
          <p>{item.price} ETH</p>
        </div>
      </Link>
    </div>
  );
};

export default NFTCardOld;
