const Button = ({ btnName, handleClick, icon, classStyle }) => {
  return (
    <div className="inline-block">
      <button
        className={`bg-cyan-600 text-white py-2 rounded-3xl px-5 hover:bg-cyan-700  ${classStyle}`}
        // className={`btn btn-primary rounded-3xl px-5 ${classStyle}`}
        onClick={handleClick}
      >
        {icon} {btnName}
      </button>
    </div>
  );
};

export default Button;
