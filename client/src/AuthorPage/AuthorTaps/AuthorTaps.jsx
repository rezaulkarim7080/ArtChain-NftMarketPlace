import React, { useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp, TiTick } from "react-icons/ti";

const AuthorTaps = ({
  setCollectiables,
  setCreated,
  setLike,
  setFollower,
  setFollowing,
}) => {
  const [openList, setOpenList] = useState(false);
  const [activeBtn, setActiveBtn] = useState(1);
  const [selectedMenu, setSelectedMenu] = useState("Most Recent");

  const listArray = [
    "Created By Admin",
    "Most Appreciated",
    "Most Discussed",
    "Most Viewed",
  ];

  // Functions
  const openTab = (e) => {
    const btnText = e.target.innerText;
    switch (btnText) {
      case "Collectiables":
        setCollectiables(true);
        setCreated(false);
        setLike(false);
        setFollower(false);
        setFollowing(false);
        setActiveBtn(1);
        break;
      case "Created":
        setCollectiables(false);
        setCreated(true);
        setLike(false);
        setFollower(false);
        setFollowing(false);
        setActiveBtn(2);
        break;
      case "Liked":
        setCollectiables(false);
        setCreated(false);
        setLike(true);
        setFollower(false);
        setFollowing(false);
        setActiveBtn(3);
        break;
      case "Following":
        setCollectiables(false);
        setCreated(false);
        setLike(false);
        setFollower(false);
        setFollowing(true);
        setActiveBtn(4);
        break;
      case "Followers":
        setCollectiables(false);
        setCreated(false);
        setLike(false);
        setFollower(true);
        setFollowing(false);
        setActiveBtn(5);
        break;
      default:
        break;
    }
  };

  const openDropDownlist = () => {
    setOpenList(!openList);
  };

  return (
    <div className="w-full mt-32 mb-12">
      <div className="w-4/5 mx-auto flex justify-between">
        <div className="flex gap-8 items-center">
          <button
            className={`border px-4 py-2 rounded-full text-lg transition-all duration-300 ease-in ${
              activeBtn === 1
                ? "border-primary bg-primary text-background"
                : "border-icon text-icon"
            }`}
            onClick={(e) => openTab(e)}
          >
            Collectiables
          </button>
          <button
            className={`border px-4 py-2 rounded-full text-lg transition-all duration-300 ease-in ${
              activeBtn === 2
                ? "border-primary bg-primary text-background"
                : "border-icon text-icon"
            }`}
            onClick={(e) => openTab(e)}
          >
            Created
          </button>
          <button
            className={`border px-4 py-2 rounded-full text-lg transition-all duration-300 ease-in ${
              activeBtn === 3
                ? "border-primary bg-primary text-background"
                : "border-icon text-icon"
            }`}
            onClick={(e) => openTab(e)}
          >
            Liked
          </button>
          <button
            className={`border px-4 py-2 rounded-full text-lg transition-all duration-300 ease-in ${
              activeBtn === 4
                ? "border-primary bg-primary text-background"
                : "border-icon text-icon"
            }`}
            onClick={(e) => openTab(e)}
          >
            Following
          </button>
          <button
            className={`border px-4 py-2 rounded-full text-lg transition-all duration-300 ease-in ${
              activeBtn === 5
                ? "border-primary bg-primary text-background"
                : "border-icon text-icon"
            }`}
            onClick={(e) => openTab(e)}
          >
            Followers
          </button>
        </div>

        <div className="relative">
          <div
            className="flex items-center gap-4 border px-4 py-2 rounded-full cursor-pointer text-lg border-icon"
            onClick={() => openDropDownlist()}
          >
            <p>{selectedMenu}</p>
            {openList ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
          </div>

          {openList && (
            <div className="absolute bg-background p-4 w-60 rounded-lg mt-4 z-50 border border-icon">
              {listArray.map((el, i) => (
                <div
                  className="flex items-center justify-between p-2 cursor-pointer transition-all duration-300 ease-in hover:bg-icon hover:text-background"
                  onClick={() => setSelectedMenu(el)}
                  key={i}
                >
                  <p>{el}</p>
                  <span>{selectedMenu === el && <TiTick />}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorTaps;
