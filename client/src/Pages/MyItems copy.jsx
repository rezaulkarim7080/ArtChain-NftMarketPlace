import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../context/wallet";
import { ethers } from "ethers";
import axios from "axios";
import marketplaceJson from "../../marketplace.json";
import { NFTCard2 } from "../CollectionPage/collectionIndex";
import Loader from "./Loader";

import images from "../img";

const MyItems = ({ nfts }) => {
  const following = [
    {
      background: images.creatorbackground30,
      user: images.user6,
      seller: "0x5C6...b1C7E3",
      total: 5.5,
    },
    {
      background: images.creatorbackground31,
      user: images.user3,
      seller: "0x3D5ew...be83E",
      total: 5.5,
    },
    {
      background: images.creatorbackground32,
      user: images.user5,
      seller: "0x06weD..5B2E7",
      total: 5.5,
    },
    {
      background: images.creatorbackground34,
      user: images.user1,
      seller: "0xC6trb...29E19",
      total: 5.5,
    },
  ];
  const news = [
    {
      background: images.creatorbackground1,
      user: images.user6,
      seller: "0x9Fer0c...A8B34",
      total: 5.5,
    },
    {
      background: images.creatorbackground2,
      user: images.user3,
      seller: "0x4E0....8C55c2",
      total: 5.5,
    },
    {
      background: images.creatorbackground6,
      user: images.user1,
      seller: "0xF1Ad6...A2eC",
      total: 5.5,
    },
  ];

  const [createdNfts, setCreatedNfts] = useState([]);
  const [boughtNfts, setBoughtNfts] = useState([]);
  const [likedNfts, setLikedNfts] = useState(
    () => JSON.parse(localStorage.getItem("likedNFTs")) || []
  );
  const [followedUsers, setFollowedUsers] = useState(
    () => JSON.parse(localStorage.getItem("followedUsers")) || []
  );

  const [followers, setFollowers] = useState(
    () => JSON.parse(localStorage.getItem("followers")) || []
  );
  const [activeFilter, setActiveFilter] = useState("created");
  const [loading, setLoading] = useState(false);

  const { isConnected, signer, userAddress } = useContext(WalletContext);

  // Initialize contract
  let contract;
  if (signer) {
    contract = new ethers.Contract(
      marketplaceJson.address,
      marketplaceJson.abi,
      signer
    );
  }

  // Fetch NFTs
  const fetchNFTs = async (fetchFunction) => {
    if (!contract) return [];
    try {
      const transaction = await fetchFunction();
      const itemsArray = await Promise.all(
        transaction.map(async (tokenId) => {
          const tokenURI = await contract.tokenURI(tokenId);
          const meta = (await axios.get(tokenURI)).data;
          const nftListing = await contract.getNFTListing(tokenId);
          const price = ethers.formatEther(nftListing.price);

          return {
            price,
            tokenId,
            seller: nftListing.seller,
            owner: nftListing.owner,
            creator: nftListing.creator,
            image: meta.image,
            name: meta.name,
            description: meta.description,
          };
        })
      );
      return itemsArray;
    } catch (error) {
      console.error("Error fetching NFTs:", error);
      return [];
    }
  };
  // Calculate total value of created NFTs in ETH
  const totalCreatedValue = createdNfts.reduce(
    (acc, nft) => acc + parseFloat(nft.price),
    0
  );
  const getCreatedNFTs = async () => fetchNFTs(() => contract.getCreatedNFTs());
  const getBoughtNFTs = async () => fetchNFTs(() => contract.getBoughtNFTs());

  useEffect(() => {
    const fetchData = async () => {
      if (isConnected && signer) {
        setLoading(true);
        const createdNftsData = await getCreatedNFTs();
        const boughtNftsData = await getBoughtNFTs();
        setCreatedNfts(createdNftsData);
        setBoughtNfts(boughtNftsData);
        setLoading(false);
      }
    };

    fetchData();
  }, [isConnected, signer]);

  // Fetch liked NFTs from local storage
  const fetchLikedNFTs = async () => {
    const allLikedNFTs = JSON.parse(localStorage.getItem("likedNFTs")) || [];
    const likedNFTData = await Promise.all(
      allLikedNFTs.map(async (tokenId) => {
        const tokenURI = await contract.tokenURI(tokenId);
        const meta = (await axios.get(tokenURI)).data;
        const nftListing = await contract.getNFTListing(tokenId);
        const price = ethers.formatEther(nftListing.price);

        return {
          price,
          tokenId,
          seller: nftListing.seller,
          owner: nftListing.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
        };
      })
    );
    return likedNFTData;
  };

  useEffect(() => {
    const fetchLikedData = async () => {
      if (activeFilter === "liked") {
        const likedNFTsData = await fetchLikedNFTs();
        setLikedNfts(likedNFTsData);
      }
    };

    fetchLikedData();
  }, [activeFilter]);

  // Functions for liking/unliking NFTs
  const toggleLikeNFT = (tokenId) => {
    setLikedNfts((prevLiked) => {
      const isLiked = prevLiked.some((nft) => nft.tokenId === tokenId);
      const updatedLiked = isLiked
        ? prevLiked.filter((nft) => nft.tokenId !== tokenId)
        : [...prevLiked, { tokenId }];

      localStorage.setItem(
        "likedNFTs",
        JSON.stringify(updatedLiked.map((nft) => nft.tokenId))
      );
      return updatedLiked;
    });
  };

  const [followingData, setFollowingData] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("followingData")) || [];
    setFollowingData(data);
  }, []);

  // Functions for following/unfollowing users
  const toggleFollow = (userAddress) => {
    setFollowedUsers((prevFollowedUsers) => {
      const isFollowed = prevFollowedUsers.includes(userAddress);
      const updatedFollowedUsers = isFollowed
        ? prevFollowedUsers.filter((user) => user !== userAddress)
        : [...prevFollowedUsers, userAddress];
      localStorage.setItem(
        "followedUsers",
        JSON.stringify(updatedFollowedUsers)
      );

      // Here we save the followed user in the followers local storage
      toggleFollower(userAddress); // Call this function to manage followers
      return updatedFollowedUsers;
    });
  };

  // Functions for managing followers
  const toggleFollower = (userAddress) => {
    setFollowers((prevFollowers) => {
      const isFollower = prevFollowers.includes(userAddress);
      const updatedFollowers = isFollower
        ? prevFollowers.filter((user) => user !== userAddress)
        : [...prevFollowers, userAddress];
      localStorage.setItem("followers", JSON.stringify(updatedFollowers));
      return updatedFollowers;
    });
  };

  return (
    <div className="w-full">
      {isConnected ? (
        <>
          {/* /////////////// */}
          <div>
            {isConnected ? (
              <>
                {/* ////PROFILE  BANNER ////  */}

                <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg  rounded-xl w-full sm:mx-auto shadow-sm  text-gray-900 mb-10">
                  <div className="rounded-t-lg h-24 overflow-hidden">
                    <img
                      className="object-cover object-top w-full"
                      src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                      alt="Mountain"
                    />
                  </div>
                  <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                    <img
                      className="object-cover object-center h-32"
                      src={images.user1}
                      alt="Woman looking front"
                    />
                  </div>
                  <div className="text-center mt-2">
                    <h2 className="font-semibold text-cyan-600"> Adem Smith</h2>
                    <p className="">Address : {userAddress}</p>
                    <p className="">
                      <span>Number of Created NFTs:</span>
                      <span>{createdNfts.length}</span>
                    </p>
                    <span>Total Created Value:</span>
                    <span>{totalCreatedValue} ETH</span>
                  </div>
                  <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
                    <li className="flex flex-col items-center justify-around">
                      <svg
                        className="w-4 fill-current text-cyan-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <div>1k</div>
                    </li>
                    <li className="flex flex-col items-center justify-between">
                      <svg
                        className="w-4 fill-current text-cyan-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
                      </svg>
                      <div>10k</div>
                    </li>
                    <li className="flex flex-col items-center justify-around">
                      <svg
                        className="w-4 fill-current text-cyan-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                      </svg>
                      <div>15</div>
                    </li>
                  </ul>
                </div>
                {/* ////PROFILE  BANNER END////  */}
              </>
            ) : (
              <div>You are not connected...</div>
            )}
          </div>
          {/* //// */}
          {/* Filter Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveFilter("created")}
              className={`${
                activeFilter === "created" ? "bg-cyan-600" : "bg-slate-700"
              } text-white py-2 px-4 rounded-full`}
            >
              Listed
            </button>
            <button
              onClick={() => setActiveFilter("bought")}
              className={`${
                activeFilter === "bought" ? "bg-cyan-600" : "bg-slate-700"
              } text-white py-2 px-4 rounded-full`}
            >
              Owned
            </button>
            <button
              onClick={() => setActiveFilter("liked")}
              className={`${
                activeFilter === "liked" ? "bg-cyan-600" : "bg-slate-700"
              } text-white py-2 px-4 rounded-full`}
            >
              Liked NFTs
            </button>
            <button
              onClick={() => setActiveFilter("followedUsers")}
              className={`${
                activeFilter === "followedUsers"
                  ? "bg-cyan-600"
                  : "bg-slate-700"
              } text-white py-2 px-4 rounded-full`}
            >
              Followed Users
            </button>
            <button
              onClick={() => setActiveFilter("followers")}
              className={`${
                activeFilter === "followers" ? "bg-cyan-600" : "bg-slate-700"
              } text-white py-2 px-4 rounded-full`}
            >
              Followers
            </button>
          </div>
          {/* Display Created NFTs */}
          {activeFilter === "created" && (
            <>
              {loading ? (
                <Loader />
              ) : createdNfts.length > 0 ? (
                <NFTCard2
                  NFTData={createdNfts}
                  toggleLikeNFT={toggleLikeNFT}
                  toggleFollow={toggleFollow}
                />
              ) : (
                <div className="text-center font-semibold text-2xl">
                  No NFTs Listed
                </div>
              )}
            </>
          )}
          {/* Display Bought NFTs */}
          {activeFilter === "bought" && (
            <>
              {loading ? (
                <Loader />
              ) : boughtNfts.length > 0 ? (
                <NFTCard2
                  NFTData={boughtNfts}
                  toggleLikeNFT={toggleLikeNFT}
                  toggleFollow={toggleFollow}
                />
              ) : (
                <div className="text-center font-semibold text-2xl">
                  No Owned NFTs
                </div>
              )}
            </>
          )}
          {/* Display Liked NFTs */}
          {activeFilter === "liked" && (
            <>
              {likedNfts.length > 0 ? (
                <NFTCard2
                  NFTData={likedNfts}
                  toggleLikeNFT={toggleLikeNFT}
                  toggleFollow={toggleFollow}
                />
              ) : (
                <div className="text-center font-semibold text-2xl">
                  No Liked NFTs
                </div>
              )}
            </>
          )}
          {/* Display Followed Users */}
          {activeFilter === "followedUsers" && (
            <div className="flex gap-4 justify-around">
              {followedUsers.length > 0 ? (
                followedUsers.map((user, i) => (
                  <div key={i} className="mb-4 items-center">
                    <img src={user} alt="user" className="rounded-lg mb-5" />

                    <button onClick={() => toggleFollow(user)} className=" btn">
                      {followedUsers.includes(user) ? "Unfollow" : "Follow"}
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center font-semibold text-2xl">
                  No Followed Users
                </div>
              )}
            </div>
          )}
          {/* Display Followers */}
          {/* {activeFilter === "followers" && (
            <>
              {followers.length > 0 ? (
                followers.map((user, index) => (
                  <div key={index} className="mb-4">
                    <span>{user}</span>
                  </div>
                ))
              ) : (
                <div className="text-center font-semibold text-2xl">
                  No Followers
                </div>
              )}
            </>
          )} */}
        </>
      ) : (
        <div className="text-center font-semibold text-2xl">
          Please connect your wallet.
        </div>
      )}
    </div>
  );
};

export default MyItems;
