import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../context/wallet";
import MarketplaceJson from "../../marketplace.json";
import { ethers } from "ethers";
import axios from "axios";
import NFTCardOld from "./NFTCardOld";

const MarketPlace = () => {
  const [items, setItems] = useState([]);
  const { isConnected, signer } = useContext(WalletContext);

  async function getNFTitems() {
    const itemsArray = [];
    if (!signer) return;
    try {
      const contract = new ethers.Contract(
        MarketplaceJson.address,
        MarketplaceJson.abi,
        signer
      );

      // Fetch all listed NFTs from the contract
      let transaction = await contract.getAllListedNFTs();
      console.log("Transaction:", transaction); // Debugging contract response

      for (const i of transaction) {
        const tokenId = parseInt(i.tokenId);
        const tokenURI = await contract.tokenURI(tokenId);
        console.log("Token URI:", tokenURI); // Debugging Token URI

        // Fetch metadata from the tokenURI
        const meta = (await axios.get(tokenURI)).data;
        console.log("Metadata:", meta); // Debugging metadata

        // Format the price from wei to Ether
        const price = ethers.formatEther(i.price);

        // Create the item object with all necessary data
        const item = {
          price,
          tokenId,
          seller: i.seller,
          owner: i.owner,
          name: meta.name,
          website: meta.website,
          description: meta.description,
          fileSize: meta.fileSize,
          image: meta.image,
          royalties: meta.royalties,
          properties: meta.properties,
        };

        itemsArray.push(item); // Push the item to the itemsArray
      }
    } catch (error) {
      console.error("Error during getNFTitems:", error); // Catching any error
    }
    return itemsArray;
  }

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

  return (
    <div>
      {isConnected ? (
        <div className="p-5">
          <h2>NFT Marketplace</h2>
          {items?.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {items.map((value, index) => (
                <NFTCardOld item={value} key={index} />
              ))}
            </div>
          ) : (
            <div className="text-xl text-center m-auto">
              No NFT Listed Now...
            </div>
          )}
        </div>
      ) : (
        <div className="text-xl text-center m-auto">
          You are not connected...
        </div>
      )}
    </div>
  );
};

export default MarketPlace;
