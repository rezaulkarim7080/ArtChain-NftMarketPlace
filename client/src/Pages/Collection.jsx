import { useContext, useEffect, useState } from "react";
import {
  Banner,
  CollectionProfile,
  NFTCard2,
} from "../CollectionPage/collectionIndex";
import Filter from "../components/Filter/Filter";
import Slider from "../components/Slider/Slider";
import images from "../img";
import { WalletContext } from "../context/wallet";
import marketplaceJson from "../../marketplace.json";
import { ethers } from "ethers";
import axios from "axios";
import Loader from "./Loader";

//////
////////
////
const Collection = () => {
  ///
  const [nfts, setNfts] = useState([]);
  const [nftCopy, setNftCopy] = useState([]);

  /////
  const [items, setItems] = useState([]);
  const { isConnected, signer } = useContext(WalletContext);

  ///////////////  -------GET ALL NFT

  async function getNFTitems() {
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

      console.log("Transaction:", transaction); // Debugging contract response

      for (const i of transaction) {
        const tokenId = parseInt(i.tokenId);
        const tokenURI = await contract.tokenURI(tokenId);

        console.log("Token URI:", tokenURI);

        const meta = (await axios.get(tokenURI)).data;
        console.log("Metadata:", meta);

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
  }

  /////

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

  useEffect(() => {
    if (Array.isArray(items) && items.length) {
      setNfts(items.reverse());
      setNftCopy(items);
    }
  }, [items]);
  ///////
  /////
  ///
  return (
    <div>
      <Banner bannerImage={images.BigNft} />
      <CollectionProfile />
      <Filter nfts={nfts} setNfts={setNfts} nftCopy={nftCopy} />
      {nfts.length == 0 ? <Loader /> : <NFTCard2 NFTData={nfts} />}
      <Slider />
    </div>
  );
};

export default Collection;
