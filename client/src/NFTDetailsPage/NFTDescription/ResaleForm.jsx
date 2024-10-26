import React, { useContext, useState, useEffect } from "react";
import { FaPercent } from "react-icons/fa";
import { PiCurrencyEthThin } from "react-icons/pi";

import { ethers } from "ethers";
import marketplaceJson from "../../../marketplace.json";

import { WalletContext } from "../../context/wallet";
import { useParams } from "react-router-dom";

const ResaleForm = ({ nftData }) => {
  const { signer } = useContext(WalletContext);
  const [formParams, setFormParams] = useState({
    price: "", // New resale price
  });
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const params = useParams();
  const tokenId = params.tokenId;
  const [boughtNFTs, setBoughtNFTs] = useState([]);
  const [createdNFTs, setCreatedNFTs] = useState([]);

  function handleResaleUpdate(nft) {
    setBoughtNFTs((prevBoughtNFTs) =>
      prevBoughtNFTs.filter((boughtNft) => boughtNft.tokenId !== nft.tokenId)
    );
    setCreatedNFTs((prevCreatedNFTs) => [...prevCreatedNFTs, nft]);
    console.log("NFT moved from Bought list to Created list.");
  }

  async function resellNFT(nft, newPrice) {
    try {
      if (!signer || !nft) return;

      const contract = new ethers.Contract(
        marketplaceJson.address,
        marketplaceJson.abi,
        signer
      );

      const newSalePrice = ethers.parseUnits(newPrice, "ether");

      const transaction = await contract.resellNFT(nft.tokenId, newSalePrice);
      await transaction.wait();

      alert("NFT successfully relisted for sale!");

      handleResaleUpdate(nft);
    } catch (e) {
      console.error("Resell Error: ", e);
      alert("Failed to relist NFT for sale. Check console for more details.");
    }
  }

  const handleResale = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    if (!formParams.price) {
      setMessage("Please enter a resale price.");
      setIsProcessing(false);
      return;
    }

    if (nftData) {
      await resellNFT(nftData, formParams.price);
    } else {
      setMessage("NFT data is not available.");
    }

    setIsProcessing(false);
  };

  // Conditional rendering to avoid accessing undefined nftData
  if (!nftData) {
    return <div className="text-red-600">NFT data not found.</div>;
  }

  return (
    <form onSubmit={handleResale} className="py-5 w-4/5 mx-auto">
      {/* Display current NFT details */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Resale Your NFT</h2>
        <p className="text-gray-500">Token ID: {nftData.tokenId}</p>
        <p className="text-gray-500">Current Price: {nftData.price} ETH</p>
      </div>

      {/* New Price Input */}
      <div className="mb-6">
        <label htmlFor="price" className="block text-lg font-semibold">
          New Resale Price (ETH)
        </label>
        <div className="flex items-center border border-gray-300 rounded-lg">
          <div className="p-2">
            <PiCurrencyEthThin className="text-gray-500" />
          </div>
          <input
            type="number"
            placeholder="Enter new price"
            className="w-full px-4 py-2 border-0 rounded-r-lg focus:outline-none"
            value={formParams.price}
            onChange={(e) =>
              setFormParams({ ...formParams, price: e.target.value })
            }
          />
        </div>
      </div>

      {/* Resale Button */}
      <div className="mb-6">
        <button
          type="submit"
          className={`${
            isProcessing
              ? "btn w-full text-lg font-semibold py-3 bg-gray-400 text-gray-300 cursor-not-allowed opacity-50"
              : "btn btn-primary w-full text-lg font-semibold py-3"
          } flex items-center justify-center`}
          disabled={isProcessing}
        >
          {isProcessing && (
            <span className="inline-block border-4 border-gray-300 border-t-white rounded-full w-6 h-6 mr-2 animate-spin" />
          )}
          {isProcessing ? "Processing..." : "Resell NFT"}
        </button>
      </div>

      {/* Display message */}
      <div className="text-teal-600 font-medium">{message}</div>
    </form>
  );
};

export default ResaleForm;
