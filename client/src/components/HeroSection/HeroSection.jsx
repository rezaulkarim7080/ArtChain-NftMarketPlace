import images from "../../img";
import Button from "../Navbar/Button/Button";

const HeroSection = () => {
  return (
    <div className="md:h-screen flex items-center px-5 ">
      <div className="grid grid-cols-1 md:grid-cols-2  items-center  ">
        {/* /// box left  */}
        <div className="">
          <h1 className="md:text-5xl text-3xl font-semibold md:mb-0 mb-2 leading-tight">
            Discover Digital Art, Collect and Sell Your Specific NFTs.
          </h1>
          <p className="mt-4 mb-8">
            Discover the most outstanding NFTs in all topics. Your NFTs and sell
            them.
          </p>
          <div className="gap-5">
            <a href={`/search`}>
              <Button btnName="Your Search" classStyle="md:px-6 md:py-3" />
            </a>
          </div>
        </div>
        {/* /// box right  */}
        <div className="flex items-center justify-center ">
          <img src={images.hero14} alt="hero section" className="w-[100%] " />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
