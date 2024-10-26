import React from "react";
import { BsArrowBarRight, BsSearch } from "react-icons/bs";

const SearchBar = ({ onHandleSearch }) => {
  // Function to handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    onHandleSearch(value); // Pass the input value to the search handler
  };

  return (
    <div className="w-full flex justify-center items-center pt-10">
      <div className="flex items-center rounded-full w-full md:w-1/2">
        {/* Search Bar - Hidden on smaller screens */}
        <div className="relative flex w-full">
          <input
            type="text"
            placeholder="Search NFT"
            className="input input-bordered w-full rounded-full pl-4"
            onChange={handleInputChange}
          />
          <BsSearch className="absolute right-3 top-3 text-xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
