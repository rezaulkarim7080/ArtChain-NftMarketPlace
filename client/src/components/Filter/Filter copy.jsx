import { useState } from "react";

const Filter = ({ nfts, setNfts, nftCopy }) => {
  const [selectedProperty, setSelectedProperty] = useState(""); // State for the selected property filter

  // Example filter values, these can be dynamically populated from the metadata as well
  const availableProperties = [
    "All",
    "Art",
    "Photography",
    "Music",
    "Sports",
    "Collectibles",
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

  return (
    <div className="p-4 bg-gray-200 rounded-md shadow-md mb-6">
      <h2 className="text-lg font-semibold mb-4">Filter NFTs by Properties</h2>
      <div className="flex gap-4">
        {/* Buttons for selecting property */}
        {availableProperties.map((property, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-md border border-gray-400 transition-colors ${
              selectedProperty === property
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
            onClick={() => handleFilterChange(property)}
          >
            {property}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filter;
