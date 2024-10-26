import React from "react";

const Subscribe = () => {
  return (
    <div className="pb-5 py-16 px-2 sm:py-24 lg:py-32 border-[2px] rounded-xl border-gray-200 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4  ">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="max-w-xl text-3xl font-bold tracking-tight  sm:text-4xl lg:col-span-7">
          <h2 className="inline sm:block lg:inline xl:block">
            Subscribe to get the latest news updates about NFTS
          </h2>
        </div>
        <form className="w-full max-w-md lg:col-span-5 lg:pt-2">
          <div className="flex gap-x-4">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="min-w-0 flex-auto rounded-md border-0  px-3.5 py-2 shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="flex rounded-md  px-3.5 py-2.5 text-sm font-semibold shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
            >
              Subscribe
            </button>
          </div>
          <p className="mt-4 text-sm leading-6 ">
            Get regular updates about interesting & secret upcoming NFT projects
            & events that are coming exclusively on our site
            <a
              href="https://www.swellai.com/privacy"
              className="font-semibold "
            >
              privacy&nbsp;policy
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
