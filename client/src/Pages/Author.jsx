import { useState } from "react";

import images from "../img";
import Banner from "./../CollectionPage/Banner/Banner";
import AuthorProfileCard from "./../AuthorPage/AuthorProfileCard/AuthorProfileCard";
import AuthorTaps from "./../AuthorPage/AuthorTaps/AuthorTaps";
import AuthorNFTCardBox from "./../AuthorPage/AuthorNFTCardBox/AuthorNFTCardBox";
import FollowerTabCard from "../components/FollowerTab/FollowerTabCard/FollowerTabCard";

const Author = () => {
  const [collectiables, setCollectiables] = useState(true);
  const [created, setCreated] = useState(false);
  const [like, setLike] = useState(false);
  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false);

  const followingArray = [
    {
      background: images.creatorbackground8,
      user: images.user5,
    },
    {
      background: images.creatorbackground1,
      user: images.user6,
    },
    {
      background: images.creatorbackground6,
      user: images.user1,
    },
    {
      background: images.creatorbackground7,
      user: images.user2,
    },
  ];

  return (
    <div className="h-[1000px]">
      <Banner bannerImage={images.creatorbackground2} />
      <AuthorProfileCard />
      <AuthorTaps
        setCollectiables={setCollectiables}
        setCreated={setCreated}
        setLike={setLike}
        setFollower={setFollower}
        setFollowing={setFollowing}
      />
      <AuthorNFTCardBox
        collectiables={collectiables}
        created={created}
        like={like}
        follower={follower}
        following={following}
      />
      <h1 className="text-2xl font-bold mt-8">Popular Creator</h1>
      <div className="w-4/5 mx-auto grid grid-cols-3 gap-8 mt-8">
        {followingArray.map((el, i) => (
          <FollowerTabCard className="w-full" key={i} el={el} i={i} />
        ))}
      </div>
    </div>
  );
};

export default Author;
