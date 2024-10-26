import { useContext, useEffect, useState } from "react";
import images from "../img";
import { WalletContext } from "../context/wallet";
import { Banner, NFTCard2 } from "../CollectionPage/collectionIndex";
import SearchBar from "./../SearchPage/SearchBar/SearchBar";
import Filter from "../components/Filter/Filter";
import { NFTCard, Slider } from "../components/Navbar/AllComponentsIndex";
import axios from "axios";
import { ethers } from "ethers";
import marketplaceJson from "../../marketplace.json";
import Loader from "./Loader";

const SearchPage = () => {
  const [nfts, setNfts] = useState([]);
  const [nftCopy, setNftCopy] = useState([]);
  const [items, setItems] = useState([]);
  const { isConnected, signer } = useContext(WalletContext);

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
      console.log("Transaction Data:", transaction); // Log transaction data

      for (const i of transaction) {
        const tokenId = parseInt(i.tokenId);
        const tokenURI = await contract.tokenURI(tokenId);
        console.log("Token URI:", tokenURI); // Log token URI

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
          properties: meta.properties, // Storing properties from metadata
        };

        itemsArray.push(item);
      }
      console.log("Fetched NFT items:", itemsArray); // Log fetched NFT items
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
        setItems(itemsArray);
      } catch (error) {
        console.error("Error fetching NFT items:", error);
      }
    };
    if (isConnected) {
      fetchData();
    }
  }, [isConnected, signer]);

  // Update nfts and nftCopy states when items are fetched
  useEffect(() => {
    if (Array.isArray(items) && items.length) {
      setNfts(items.reverse());
      setNftCopy(items);
    }
  }, [items]);

  // Handle search functionality
  const onHandleSearch = (value) => {
    if (!value) {
      setNfts(nftCopy);
      return;
    }

    const filteredNFTs = nftCopy.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );
    setNfts(filteredNFTs.length ? filteredNFTs : nftCopy);
  };

  // Clear the search input
  const onClearSearch = () => {
    setNfts(nftCopy);
  };

  return (
    <div>
      {isConnected ? (
        <div>
          {/* <Banner bannerImage={images.creatorbackground2} /> */}
          <SearchBar
            onHandleSearch={onHandleSearch}
            onClearSearch={onClearSearch}
          />
          <Filter nfts={nfts} setNfts={setNfts} nftCopy={nftCopy} />

          {nfts.length == 0 ? <Loader /> : <NFTCard2 NFTData={nfts} />}
          {/* <NFTCard NFTData={nfts} /> */}
          <Slider />
        </div>
      ) : (
        <div>Connect MetaMask</div>
      )}
    </div>
  );
};

export default SearchPage;
