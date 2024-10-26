import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get the seller address from the URL
import { WalletContext } from "../context/wallet";
import images from "../img";
import Filter from "../components/Filter/Filter";

import axios from "axios";
import { ethers } from "ethers";
import marketplaceJson from "../../marketplace.json";
import { Banner, NFTCard2 } from "./collectionIndex";
import { getTopCreators } from "../TopCreator/TopCreators";

const SellerCollection = ({ i, el, followedUsers, setFollowedUsers }) => {
  const { sellerAddress } = useParams(); // Get the seller address from the URL params
  const [nfts, setNfts] = useState([]);
  const [nftCopy, setNftCopy] = useState([]);
  const [items, setItems] = useState([]);
  const { isConnected, signer } = useContext(WalletContext);

  useEffect(() => {
    if (isConnected) fetchSellerNFTs(); // Fetch NFTs if the user is connected
  }, [isConnected, sellerAddress]);

  useEffect(() => {
    if (items.length) {
      setNfts(items.reverse());
      setNftCopy(items);
    }
  }, [items]);

  console.log("sellerAddress");
  console.log(sellerAddress);
  // Function to fetch NFTs for the specific seller
  const fetchSellerNFTs = async () => {
    const itemsArray = [];
    if (!signer) return;

    try {
      const contract = new ethers.Contract(
        marketplaceJson.address,
        marketplaceJson.abi,
        signer
      );
      const allNFTs = await contract.getAllListedNFTs(); // Get all listed NFTs

      // Filter NFTs by seller address
      for (const i of allNFTs) {
        if (i.seller.toLowerCase() === sellerAddress.toLowerCase()) {
          const tokenId = parseInt(i.tokenId);
          const tokenURI = await contract.tokenURI(tokenId);
          const meta = (await fetchMetadata(tokenURI)).data;
          const price = ethers.formatEther(i.price);

          itemsArray.push({
            price,
            tokenId,
            seller: i.seller,
            owner: i.owner,
            creator: i.creator,
            name: meta.name,
            description: meta.description,
            image: meta.image,
            properties: meta.properties,
          });
          ///
        }
      }
    } catch (error) {
      console.error("Error fetching seller's NFTs:", error);
    }

    setItems(itemsArray);
    console.log(itemsArray);
  };

  // Function to fetch metadata
  const fetchMetadata = async (tokenURI) => {
    try {
      return await axios.get(tokenURI);
    } catch (error) {
      console.error("Error fetching metadata", error);
      return {};
    }
  };

  // Handle search functionality
  const onHandleSearch = (value) => {
    if (!value) {
      setNfts(nftCopy);
    } else {
      const filteredNFTs = nftCopy.filter(({ name }) =>
        name.toLowerCase().includes(value.toLowerCase())
      );
      setNfts(filteredNFTs.length ? filteredNFTs : nftCopy);
    }
  };

  // Clear the search input
  const onClearSearch = () => setNfts(nftCopy);

  ////

  const creators = getTopCreators(nfts);
  const creatorsTotal = creators.length > 0 ? creators[0].total : 0;

  console.log("creators is herer");
  console.log(creators);
  console.log("creatorsTotal");
  console.log(creatorsTotal);
  return (
    <div>
      {isConnected ? (
        <div>
          {/* /////------------------///////////// */}
          <div className="bg-white bg-opacity-10 backdrop-filter rounded-xl w-full mx-4 sm:mx-auto shadow-sm ">
            <div className="rounded-t-lg h-52 overflow-hidden">
              <img
                className="object-cover object-top w-full"
                src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                alt="Mountain"
              />
            </div>
            <div className="mx-auto w-32 h-32 relative -mt-16 border-4 rounded-full overflow-hidden">
              <img
                className="object-cover object-center h-32"
                src={images.user10}
                alt="Woman looking front"
              />
            </div>
            <div className="text-center mt-2">
              <h2 className="text-cyan-600 text-2xl">Jace Morgan</h2>
              <p className="">Creator Address : {sellerAddress}</p>
              <p className="">Creator total : {creatorsTotal}</p>
              {/* <p className="text-2xl mt-2">Creator Collection</p> */}
            </div>
            <ul className="py-4 mt-2  flex items-center justify-around">
              <li className="flex flex-col items-center justify-around">
                <svg
                  className="w-4 fill-current text-cayn-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <div>2k</div>
              </li>
              <li className="flex flex-col items-center justify-between">
                <svg
                  className="w-4 fill-current text-cayn-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
                </svg>
                <div>10k</div>
              </li>
              <li className="flex flex-col items-center justify-around">
                <svg
                  className="w-4 fill-current text-cayn-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                </svg>
                <div>15</div>
              </li>
            </ul>
          </div>

          {/* /////------------------///////////// */}
          <Filter nfts={nfts} setNfts={setNfts} nftCopy={nftCopy} />
          <NFTCard2 NFTData={nfts} />
        </div>
      ) : (
        <div>Connect MetaMask</div>
      )}
    </div>
  );
};

export default SellerCollection;
