import { useEffect, useRef, useState } from "react";
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";
import { motion } from "framer-motion";
import SliderCard from "./SliderCard/SliderCard";
import images from "../../img";

const Slider = () => {
  const slideArray = [
    { background: images.creatorbackground2, user: images.user3 },
    { background: images.creatorbackground5, user: images.user2 },
    { background: images.creatorbackground8, user: images.user5 },
    { background: images.creatorbackground6, user: images.user1 },
    { background: images.creatorbackground1, user: images.user6 },
  ];

  const [width, setWidth] = useState(0);
  const dragSlider = useRef();

  useEffect(() => {
    setWidth(dragSlider.current.scrollWidth - dragSlider.current.offsetWidth);
  }, []);

  const handleScroll = (direction) => {
    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;
    if (direction === "left") {
      dragSlider.current.scrollLeft -= scrollAmount;
    } else {
      dragSlider.current.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="w-full">
      <div className="w-4/5 mx-auto py-0  lg:py-32">
        <h2 className="text-xl md:text-3xl leading-none">Explore NFTs Video</h2>
        <div className="flex justify-between items-center mt-4 mb-8">
          <p>Click on play icon & enjoy NFTs</p>
          <div className="flex gap-8 text-2xl items-center">
            <div
              className="border border-gray-400 md:p-4 p-2 rounded-full cursor-pointer transition-all duration-300 ease-in hover:bg-gray-400 hover:text-white hover:shadow-lg"
              onClick={() => handleScroll("left")}
            >
              <TiArrowLeftThick />
            </div>
            <div
              className="border border-gray-400 md:p-4 p-2 rounded-full cursor-pointer transition-all duration-300 ease-in hover:bg-gray-400 hover:text-white hover:shadow-lg"
              onClick={() => handleScroll("right")}
            >
              <TiArrowRightThick />
            </div>
          </div>
        </div>
        <motion.div className="w-full overflow-hidden" ref={dragSlider}>
          <motion.div
            className="flex gap-4 md:p-16 p-8 cursor-grab"
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
          >
            {slideArray.map((el, i) => (
              <SliderCard key={i + 1} el={el} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slider;
