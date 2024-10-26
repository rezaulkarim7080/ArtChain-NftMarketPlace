import { useState } from "react";
import {
  FaAngleDown,
  FaFilter,
  FaImage,
  FaMusic,
  FaUser,
  FaVideo,
  FaWallet,
} from "react-icons/fa"; // Import the filter icon
import { AiFillCloseCircle } from "react-icons/ai"; // Import the close circle icon
import { TiTick } from "react-icons/ti"; // Import the tick icon
import { MdVerified } from "react-icons/md";

const Filter = ({ nfts, setNfts, nftCopy }) => {
  const [selectedProperty, setSelectedProperty] = useState(""); // State for the selected property filter
  const [filter, setFilter] = useState(false); // State to manage filter visibility

  // Example filter values, these can be dynamically populated from the metadata as well
  const availableProperties = [
    "All",
    "Art",
    "Photography",
    "Music",
    "Sports",
    "Games",
  ];

  // Handle the filter logic
  const handleFilterChange = (property) => {
    setSelectedProperty(property);

    if (property === "All") {
      setNfts(nftCopy); // Reset to original list if "All" is selected
      return;
    }

    // Filter NFTs based on the selected property (case-insensitive)
    const filteredNFTs = nftCopy.filter((nft) => {
      if (nft.properties) {
        return nft.properties.toLowerCase() === property.toLowerCase();
      }
      return false; // If no properties, skip
    });

    setNfts(filteredNFTs);
  };

  const toggleFilter = () => {
    setFilter(!filter);
  };

  return (
    <div className="py-10 w-full">
      <div className="w-4/5 mx-auto flex flex-wrap md:items-center md:justify-between">
        {/* /////// */}
        <div className="flex flex-wrap gap-8">
          {availableProperties.map((property, index) => (
            <button
              key={index}
              className={`border  border-gray-300 rounded-full py-2 px-4 text-lg transition-all duration-300 ease-in hover:border-cyan-600 hover:text-cyan-600 ${
                selectedProperty === property ||
                (property === "All" && selectedProperty === "")
                  ? "bg-cyan-600 text-white"
                  : ""
              }`}
              onClick={() => handleFilterChange(property)}
            >
              {property === "All" ? "ALL NFTs" : property}
            </button>
          ))}
        </div>
        <div
          className="border border-gray-300 rounded-full py-2 px-4 shadow-md cursor-pointer flex items-center gap-2"
          onClick={toggleFilter}
        >
          <FaFilter />
          <span>Filter</span>
          <FaAngleDown />
        </div>
      </div>
      {/* /////// */}

      {filter && (
        <div className="w-4/5 mx-auto flex flex-wrap pt-5  border-gray-300">
          {/* Example filter items, these can be dynamic as well */}
          <div className="flex flex-wrap gap-4 pb-4">
            <div className="bg-cyan-600 text-white rounded-full py-2 px-4 flex items-center gap-2 cursor-pointer">
              <FaWallet /> <span>10 ETH</span>
              <AiFillCloseCircle />
            </div>
          </div>
          <div className="flex gap-4 pb-4">
            <div className="border border-gray-300 text-gray-700 rounded-full py-2 px-4 flex items-center gap-2 cursor-pointer">
              <FaImage /> <small>Image</small>
              {/* Replace `image` with the relevant state if needed */}
              {/* {image ? <AiFillCloseCircle /> : <TiTick />} */}
              <TiTick />
            </div>
          </div>
          <div className="flex gap-4 pb-4">
            <div className="border border-gray-300 text-gray-700 rounded-full py-2 px-4 flex items-center gap-2 cursor-pointer">
              <FaVideo /> <small>Video</small>
              {/* Replace `video` with the relevant state if needed */}
              <TiTick />
            </div>
          </div>
          <div className="flex gap-4 pb-4">
            <div className="border border-gray-300 text-gray-700 rounded-full py-2 px-4 flex items-center gap-2 cursor-pointer">
              <FaMusic /> <small>Music</small>
              {/* Replace `music` with the relevant state if needed */}
              <TiTick />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-cyan-600 text-white rounded-full py-2 px-4 flex items-center gap-2">
              <FaUser /> <small>Verified</small>
              <MdVerified />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
