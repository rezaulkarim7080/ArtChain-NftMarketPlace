import React from "react";
import { NFTCard2 } from "../../CollectionPage/collectionIndex";
import FollowerTabCard from "../../components/FollowerTab/FollowerTabCard/FollowerTabCard";
import images from "../../img";

const AuthorNFTCardBox = ({
  collectiables,
  created,
  like,
  follower,
  following,
}) => {
  const collectiablesArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
  ];
  const createdArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
  ];
  const likeArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
  ];

  const followerArray = [
    {
      background: images.creatorbackground2,
      user: images.user3,
    },
    {
      background: images.creatorbackground5,
      user: images.user2,
    },
    {
      background: images.creatorbackground8,
      user: images.user5,
    },
    {
      background: images.creatorbackground6,
      user: images.user1,
    },
    {
      background: images.creatorbackground1,
      user: images.user6,
    },
  ];
  const followingArray = [
    {
      background: images.creatorbackground8,
      user: images.user5,
    },
    {
      background: images.creatorbackground6,
      user: images.user1,
    },
    {
      background: images.creatorbackground1,
      user: images.user6,
    },
  ];
  return (
    <div className="w-full">
      {collectiables && <NFTCard2 NFTData={collectiablesArray} />}
      {created && <NFTCard2 NFTData={createdArray} />}
      {like && <NFTCard2 NFTData={likeArray} />}
      <div className="w-4/5 mx-auto grid grid-cols-3 gap-8">
        {follower &&
          followerArray.map((el, i) => (
            <FollowerTabCard el={el} i={i} key={i} />
          ))}
      </div>
      <div className="w-4/5 mx-auto grid grid-cols-3 gap-8 mt-8">
        {following &&
          followingArray.map((el, i) => (
            <FollowerTabCard el={el} i={i} key={i} />
          ))}
      </div>
    </div>
  );
};

export default AuthorNFTCardBox;
