import { Link } from "react-router-dom";

const HelpCenter = () => {
  const helpCenter = [
    {
      name: "Contact Us",
      link: "contact-us",
    },
    {
      name: "Blog",
      link: "blog",
    },
    {
      name: "Subscription",
      link: "subscription",
    },
  ];

  return (
    <div>
      {helpCenter.map((el, i) => (
        <div
          key={i}
          className="p-2 hover:bg-cyan-600 hover:text-white rounded-md transition duration-300"
        >
          <Link to={`/${el.link}`} className="block">
            {el.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HelpCenter;
