import React from "react";

const NFTTabs = ({ dataTab, icon }) => {
  return (
    <div>
      {dataTab.map((el, i) => (
        <div
          className="flex items-center gap-4 py-4 border-b border-gray-300"
          key={i + 1}
        >
          <img
            src={el}
            alt="image"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="grid self-start mt-1.5">
            <span className="font-semibold">
              Offer by $560 <span>Relasj</span> {icon}
            </span>
            <small className="mt-0.5">jun 01 -- 3:32 pm</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NFTTabs;
