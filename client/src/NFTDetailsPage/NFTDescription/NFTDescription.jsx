import React, { useContext, useEffect, useState } from "react";
import images from "../../img";
import {
  MdCloudUpload,
  MdOutlineDeleteSweep,
  MdReportProblem,
  MdTimer,
  MdVerified,
} from "react-icons/md";
import {
  TiSocialFacebook,
  TiSocialInstagram,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
} from "react-icons/ti";
import { BsThreeDots } from "react-icons/bs";
import { BiDollar, BiTransfer } from "react-icons/bi";
import Button from "../../components/Navbar/Button/Button";
import { FaPercentage, FaWallet } from "react-icons/fa";
import NFTTabs from "./../NFTTabs/NFTTabs";
import Countdown from "./Countdown";

import { ethers } from "ethers";
import marketplaceJson from "../../../marketplace.json";
import { WalletContext } from "../../context/wallet";
import GetIpfsUrlFromPinata from "../../../utils";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

//
//////
////
const NFTDescription = ({ nft }) => {
  const {
    isConnected,
    setIsConnected,
    userAddress,
    setUserAddress,
    connectWallet,
    signer, // signer should already be connected
  } = useContext(WalletContext);

  ///////
  /////
  //
  const creationTime = Date.now();

  /////
  const [social, setSocial] = useState(false);
  const [NFTMenu, setNFTMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("Bid History");
  ////
  //////////////////
  const params = useParams();
  const tokenId = params.tokenId;
  const [item, setItem] = useState();
  const [msg, setmsg] = useState();
  const [btnContent, setBtnContent] = useState("Buy NFT");
  const [boughtNFTs, setBoughtNFTs] = useState([]);

  //////
  const historyArray = [images.user1, images.user5, images.user8, images.user6];
  const provananceArray = [images.user8, images.user5, images.user3];
  const ownerArray = [images.user5, images.user3, images.user8];

  const openSocial = () => {
    setSocial(!social);
    setNFTMenu(false);
  };

  const openNFTMenu = () => {
    setNFTMenu(!NFTMenu);
    setSocial(false);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // Buy NFT function////
  ///////---------

  async function buyNFT() {
    try {
      if (!signer) return;
      const contract = new ethers.Contract(
        marketplaceJson.address,
        marketplaceJson.abi,
        signer
      );
      const salePrice = ethers.parseUnits(nft.price, "ether").toString();
      setBtnContent("Processing...");
      setmsg("Buying the NFT... Please Wait (Upto 5 mins)");
      const transaction = await contract.executeSale(nft.tokenId, {
        value: salePrice,
      });
      await transaction.wait();
      alert("You successfully bought the NFT!");
      setmsg("");
      setBtnContent("Buy NFT");
    } catch (e) {
      console.error("Buying Error: ", e);
    }
  }
  ///////
  ////
  /////////////////------

  async function getNFTData() {
    if (!signer) return;
    let contract = new ethers.Contract(
      marketplaceJson.address,
      marketplaceJson.abi,
      signer
    );
    let tokenURI = await contract.tokenURI(tokenId);
    console.log(tokenURI);
    const listedToken = await contract.getNFTListing(tokenId);
    tokenURI = GetIpfsUrlFromPinata(tokenURI);
    console.log(tokenURI);
    const meta = (await axios.get(tokenURI)).data;
    const item = {
      price: meta.price,
      tokenId,
      seller: listedToken.seller,
      owner: listedToken.owner,
      creator: listedToken.creator,
      image: meta.image,
      name: meta.name,
      description: meta.description,
    };
    return item;
  }
  console.log(item);
  //////////////////

  useEffect(() => {
    async function fetchData() {
      if (!signer) return;
      try {
        const itemTemp = await getNFTData();
        setItem(itemTemp);
      } catch (error) {
        console.error("Error fetching NFT items:", error);
        setItem(null);
      }
    }

    fetchData();
  }, [isConnected]);
  //////
  //
  //
  const isBoughtNFT = boughtNFTs.includes(nft.tokenId);
  const isCreatedByUser =
    item &&
    item.owner &&
    userAddress?.toLowerCase() === item.seller.toLowerCase();

  ///

  ////
  /////
  return (
    <div className="w-full">
      <div className="w-full mx-auto">
        {/* PART_ONE */}
        <div className="flex items-center justify-between relative">
          <p className="bg-cyan-600  text-slate-50 py-1 px-2 rounded-full z-0">
            Virtual Worlds
          </p>
          <div className="flex items-center gap-4 text-xl">
            <MdCloudUpload className="cursor-pointer" onClick={openSocial} />
            {social && (
              <div className="absolute top-20 right-2 md:left-2/3 bg-main-bg-color rounded-md p-4 ">
                <a
                  href="#"
                  className="flex items-center gap-2 text-icons-color hover:bg-cyan-600   hover:text-slate-50 rounded-md p-2"
                >
                  <TiSocialFacebook /> Facebook
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-icons-color hover:bg-cyan-600   hover:text-slate-50 rounded-md p-2"
                >
                  <TiSocialLinkedin /> Linkedin
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-icons-color hover:bg-cyan-600   hover:text-slate-50 rounded-md p-2"
                >
                  <TiSocialInstagram /> Instagram
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-icons-color hover:bg-cyan-600   hover:text-slate-50 rounded-md p-2"
                >
                  <TiSocialTwitter /> Twitter
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-icons-color hover:bg-cyan-600   hover:text-slate-50 rounded-md p-2"
                >
                  <TiSocialYoutube /> Youtube
                </a>
              </div>
            )}
            <BsThreeDots className="cursor-pointer" onClick={openNFTMenu} />
            {NFTMenu && (
              <div className="absolute top-20 right-0 bg-main-bg-color rounded-md p-4  ">
                <a
                  href="#"
                  className="flex items-center gap-2 text-icons-color hover:bg-cyan-600   hover:text-slate-50  rounded-md p-2"
                >
                  <BiDollar /> Change Prices
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-icons-color hover:bg-cyan-600   hover:text-slate-50 rounded-md p-2"
                >
                  <BiTransfer /> Transfer
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-icons-color hover:bg-cyan-600   hover:text-slate-50 rounded-md p-2"
                >
                  <MdReportProblem /> Report
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-icons-color hover:bg-cyan-600   hover:text-slate-50 rounded-md p-2"
                >
                  <MdOutlineDeleteSweep /> Delete Item
                </a>
              </div>
            )}
          </div>
        </div>
        {/* ///////
////////
///// */}
        <div className="mt-6">
          <h1 className="text-3xl font-medium pb-4">{nft.name}</h1>
          <div className="flex flex-col ">
            <div className="flex items-center gap-4">
              <img
                src={images.user1}
                alt="user"
                className="rounded-full w-10 h-10"
              />
              <div>
                <small className="font-medium">Owner</small>
                <br />
                <span className="md:font-medium">
                  {/* {nft.seller} */}
                  {nft.seller.substring(0, 5)}...
                  {nft.seller.substring(
                    nft.seller.length - 5,
                    nft.seller.length
                  )}
                  <MdVerified className="text-cyan-600" />
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 ">
              <img
                src={images.user3}
                alt="user"
                className="rounded-full w-10 h-10"
              />
              <div>
                <small className="font-medium">Creator</small>
                <br />
                <span className="font-medium">
                  {/* {nft.creator ? nft.creator : "Unknown Creator"} */}
                  {nft.creator.substring(0, 5)}...
                  {nft.creator.substring(
                    nft.creator.length - 5,
                    nft.creator.length
                  )}
                  <MdVerified className="text-cyan-600" />
                </span>
              </div>
            </div>
          </div>

          <div className="my-4">
            <p className="flex items-center text-lg gap-4">
              <MdTimer /> <span>Auction Ending In :</span>
            </p>
            {/* <Countdown /> */}
            <Countdown initialTime={creationTime} FontClass="text-2xl" />

            <div className="flex justify-between items-center mt-8">
              <div className="border-2 border-icons-color rounded-md p-4">
                <small className="bg-cyan-600   text-slate-50 py-1 px-4 rounded-md text-sm">
                  Current Bid
                </small>
                <p className="text-3xl font-bold mt-2">
                  {nft.price} ETH <span className="text-sm">(=$2425)</span>
                </p>
              </div>
              <small>{nft.stock} in stock</small>
            </div>

            {/* ///////////////---- BUY NFT */}

            <div className="flex items-center mt-8">
              <div>{msg}</div>
              {isCreatedByUser ? (
                <p className="text-red-700 font-bold">
                  You Cannot Buy Your Own NFT.
                </p>
              ) : isBoughtNFT ? (
                <Link to={`/nft/${item.tokenId}/resaleform`}>
                  <Button
                    icon={<FaWallet />}
                    btnName="Resale NFT"
                    className="bg-main-bg-color text-icons-color py-2  rounded-full font-semibold"
                  />
                </Link>
              ) : (
                // Show buy button for users who do not own the NFT
                <Button
                  icon={<FaWallet />}
                  btnName={btnContent}
                  handleClick={buyNFT}
                  className="bg-main-bg-color text-icons-color rounded-full font-semibold"
                />
              )}
            </div>
            {/* ///////////////----END BUY NFT -----------//////*/}

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => handleTabClick("Bid History")}
                className={`py-2 px-4 rounded-full font-semibold ${
                  activeTab === "Bid History"
                    ? "bg-cyan-600  00 text-white"
                    : "bg-main-bg-color text-icons-color"
                }`}
              >
                Bid History
              </button>
              <button
                onClick={() => handleTabClick("Provanance")}
                className={`py-2 px-4 rounded-full font-semibold ${
                  activeTab === "Provanance"
                    ? "bg-cyan-600  00 text-white"
                    : "bg-main-bg-color text-icons-color"
                }`}
              >
                Provanance
              </button>
              <button
                onClick={() => handleTabClick("Owner")}
                className={`py-2 px-4 rounded-full font-semibold ${
                  activeTab === "Owner"
                    ? "bg-cyan-600  00 text-white"
                    : "bg-main-bg-color text-icons-color"
                }`}
              >
                Owner
              </button>
            </div>

            {activeTab === "Bid History" && (
              <div className="mt-8 p-4">
                <NFTTabs dataTab={historyArray} />
              </div>
            )}
            {activeTab === "Provanance" && (
              <div className="mt-8 p-4">
                <NFTTabs dataTab={provananceArray} />
              </div>
            )}
            {activeTab === "Owner" && (
              <div className="mt-8 p-4">
                <NFTTabs dataTab={ownerArray} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDescription;
