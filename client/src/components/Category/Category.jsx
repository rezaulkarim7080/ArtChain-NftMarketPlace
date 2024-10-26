import images from "../../img";
import { BsCCircleFill } from "react-icons/bs";

const Category = () => {
  const CategoryArray = [
    { image: images.creatorbackground1, category: "Games" },
    { image: images.creatorbackground8, category: "Sports" },
    { image: images.creatorbackground3, category: "Arts" },
    { image: images.creatorbackground4, category: "Photography" },
    { image: images.creatorbackground6, category: "Music" },
    { image: images.creatorbackground9, category: "Arts" },
  ];

  return (
    <div className="flex justify-center items-center px-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ">
        {CategoryArray.map((el, i) => (
          <div
            key={i}
            className="relative transition-shadow duration-300 ease-in rounded-lg overflow-hidden cursor-pointer hover:shadow-lg bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg"
          >
            <img
              src={el.image}
              alt="Background image"
              className="w-full rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 flex items-center gap-4 bg-opacity-70 bg-white p-2">
              <span className="text-3xl mt-1">
                <BsCCircleFill />
              </span>
              <div>
                <h4 className="text-lg font-semibold">{el.category}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
