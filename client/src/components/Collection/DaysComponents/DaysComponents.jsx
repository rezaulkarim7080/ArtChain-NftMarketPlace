import React from "react";
import images from "../../../img";
import { MdVerified } from "react-icons/md";

const DaysComponents = ({ el, i }) => {
  return (
    <div className="w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg transition-shadow duration-300 ease-in cursor-pointer hover:shadow-lg">
      <div>
        <div className="relative">
          <img
            src={el.background}
            alt="profile image"
            className="w-full h-[300px] rounded-lg"
            width={400}
            height={400}
          />
          <div className="grid grid-cols-3 absolute bottom-0 left-0 right-0 p-2">
            {[el.background, el.background, el.background].map((src, index) => (
              <img
                key={index}
                src={src}
                alt="profile"
                className={`w-24 h-24 rounded-lg border-2 ${
                  index === 0 ? "rounded-tl-lg" : ""
                } ${index === 1 ? "rounded-tr-lg" : ""} ${
                  index === 2 ? "rounded-tr-lg" : ""
                }`}
                width={100}
                height={100}
              />
            ))}
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold">{el.collection}</h2>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2">
              <img
                src={el.user}
                alt="profile"
                className="w-8 h-8 rounded-full"
                width={30}
                height={30}
              />
              <p className="">
                Creator{" "}
                <span className="flex items-center gap-1">
                  {el.name} <MdVerified />
                </span>
              </p>
            </div>
            <div className="flex-shrink-0">
              <small className=" border-2 border-yellow-400 py-1 px-3 rounded-lg">
                1.12 ETH
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaysComponents;
