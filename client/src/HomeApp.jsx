import { useContext, useEffect, useState } from "react";
import {
  HeroSection,
  BigNFTsSlider,
  Service,
  Category,
  Title,
  Filter,
  NFTCard,
  Collection,
  FollowerTab,
  AudioLive,
  Slider,
} from "./components/Navbar/AllComponentsIndex";
import { ethers } from "ethers";
import marketplaceJson from "../marketplace.json";
import { WalletContext } from "./context/wallet";
import axios from "axios";
import { getTopCreators } from "./TopCreator/TopCreators";
import Loader from "./Pages/Loader";
import Gallery from "./components/Gallery";
import Subscribe from "./components/Subscribe";
// import Style from "./index.css";

const HomeApp = () => {
  //////
  ////

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
  }, [signer]);

  // Update nfts and nftCopy states when items are fetched
  useEffect(() => {
    if (Array.isArray(items) && items.length) {
      setNfts(items.reverse());
      setNftCopy(items);
    }
  }, [items]);

  // Clear the search input
  const onClearSearch = () => {
    setNfts(nftCopy);
  };
  ////
  ///
  const creators = getTopCreators(nfts);
  // console.log("creators is herer");
  // console.log(creators);
  //////////////
  ////
  ///////

  ////
  return (
    <div>
      <HeroSection />
      <BigNFTsSlider />
      {/* <Slider /> */}
      <AudioLive />
      {creators.length == 0 ? <Loader /> : <FollowerTab creators={creators} />}
      <Title heading="Featured NFT" paragraph="Explore the NFTs " />
      {nfts.length == 0 ? <Loader /> : <NFTCard />}
      <Collection />
      <Title heading="NFTs Gallery" />
      <Gallery />
      <Title
        heading="Browse By Category"
        paragraph="Explore the NFTs in the most categories"
      />
      <Category />
      <Title
        heading="Create and sell your NFTs"
        paragraph="Anyone can make a profile on Foundation but only selected creators can mint NFTs & published a complete guide."
      />
      <Service />
      <Subscribe />
    </div>
  );
};

export default HomeApp;
