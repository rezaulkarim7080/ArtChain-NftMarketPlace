import { useContext, useEffect, useState } from "react";
import images from "../../img";
import { WalletContext } from "../../context/wallet";
import axios from "axios";
import { ethers } from "ethers";
import marketplaceJson from "../../../marketplace.json"; // Adjust path as needed
import { BsImages } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom"; // Updated import
import Countdown from "../../NFTDetailsPage/NFTDescription/Countdown";

const NFTCard = () => {
  const { signer } = useContext(WalletContext);
  const [nfts, setNfts] = useState([]);
  const [likes, setLikes] = useState({});
  const navigate = useNavigate(); // Get navigate function
  ///////
  /////
  //
  const creationTime = Date.now();
  // Function to fetch metadata with retries
  const fetchMetadata = async (tokenURI) => {
    for (let i = 0; i < 3; i++) {
      try {
        return await axios.get(tokenURI);
      } catch (error) {
        console.error("Error fetching metadata, retrying...", error);
        if (i === 2) throw error; // Rethrow after 3 attempts
      }
    }
  };

  // Function to fetch all listed NFTs
  const getNFTitems = async () => {
    const itemsArray = [];
    if (!signer) return;

    try {
      const contract = new ethers.Contract(
        marketplaceJson.address,
        marketplaceJson.abi,
        signer
      );

      // Fetch all listed NFTs from the contract
      let transaction = await contract.getAllListedNFTs();

      for (const i of transaction) {
        const tokenId = parseInt(i.tokenId);
        const tokenURI = await contract.tokenURI(tokenId);

        const meta = (await fetchMetadata(tokenURI)).data; // Fetch metadata with retries
        const price = ethers.formatEther(i.price);

        const item = {
          price,
          tokenId,
          seller: i.seller,
          owner: i.owner,
          creator: i.creator,
          name: meta.name,
          website: meta.website,
          description: meta.description,
          stock: meta.stock,
          image: meta.image,
          royalties: meta.royalties,
          properties: meta.properties,
        };

        itemsArray.push(item);
      }
    } catch (error) {
      console.error("Error during getNFTitems:", error);
    }
    return itemsArray;
  };

  // Fetch NFTs when the component is mounted and user is connected
  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsArray = await getNFTitems();
        setNfts(itemsArray);
      } catch (error) {
        console.error("Error fetching NFT items:", error);
      }
    };
    if (signer) {
      fetchData();
    }
  }, [signer]);

  const likeNFT = (tokenId) => {
    setLikes((prevLikes) => {
      const isLiked = !!prevLikes[tokenId];
      const newLikesCount = isLiked
        ? prevLikes[tokenId]?.count || 25
        : (prevLikes[tokenId]?.count || 25) + 1;
      return {
        ...prevLikes,
        [tokenId]: { liked: !isLiked, count: newLikesCount },
      };
    });
  };

  const goToDetails = (el) => {
    navigate(`/nft/${el.tokenId}`, { state: { nft: el } }); // Corrected usage of navigate
  };

  return (
    <div className="w-[95%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {/* {nfts.map((el) => ( */}
      {nfts.slice(0, 6).map((el) => (
        <div
          className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4 rounded-lg shadow-lg cursor-pointer grid grid-cols-4 grid-rows-4 relative"
          key={el.tokenId}
          onClick={() => goToDetails(el)}
        >
          <div className="col-span-4 row-span-full overflow-hidden rounded-lg">
            <img
              src={el.image}
              alt={el.name}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
          {/* ///////// */}
          <div className="col-span-4 row-span-2 flex items-start justify-end z-10 ">
            {/* <div className="bg-blue-500 p-2 text-white rounded-full m-4">
              <div
                className="flex items-center text-lg gap-2 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering goToDetails
                  likeNFT(el.tokenId);
                }}
              >
                {likes[el.tokenId]?.liked ? (
                  <AiFillHeart className="text-red-500" />
                ) : (
                  <AiOutlineHeart />
                )}
                {likes[el.tokenId]?.count || 25}
              </div>
            </div> */}
            <div className=" p-2 text-center rounded-xl bg-slate-200 bg-opacity-5 backdrop-filter backdrop-blur-lg">
              <small>Remaining time</small>
              <Countdown
                initialTime={creationTime}
                FontClass="font-semi-bold"
              />
            </div>
          </div>

          {/* ///// */}
          <div className="col-span-4 row-start-3 row-end-5 flex items-end gap-4">
            <div className="bg-slate-100 bg-opacity-5 rounded-xl backdrop-filter backdrop-blur-xl ml-[-3rem] p-2  z-10">
              <div className="pl-12">
                <h4 className="text-xl">{el.name}</h4>
                <div className="flex justify-around items-center">
                  <div className="border border-blue-500 p-1 rounded-sm">
                    <small className="bg-blue-500 text-white rounded-sm p-1">
                      Current Bid
                    </small>
                    <p className="font-semibold">{el.price} ETH</p>
                  </div>
                  <div>
                    <small>{el.stock} in stock</small>
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
