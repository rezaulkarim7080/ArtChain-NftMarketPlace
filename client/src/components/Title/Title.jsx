import React from "react";

const Title = ({ heading, paragraph }) => {
  return (
    <div className="w-full text-center my-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">{heading}</h2>
        <p className="text-lg">{paragraph}</p>
      </div>
    </div>
  );
};

export default Title;
