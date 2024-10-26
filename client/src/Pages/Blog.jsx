import images from "../img";

const Blog = () => {
  return (
    <div>
      <div className="h-screen w-full z-[500]">
        <div className="w-full mx-auto py-10 px-4 md:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              From The Blog
            </h2>
          </div>
          <div className="grid max-w-2xl grid-cols-1 gap-8 mx-auto mt-8 auto-rows-fr lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <article className="relative flex flex-col justify-end px-4 pt-40 pb-4 overflow-hidden bg-gray-900 md:pt-28 isolate rounded-xl dark:shadow dark:shadow-gray-400/50">
              <img
                src={images.slider10}
                alt
                className="absolute inset-0 object-cover w-full h-full -z-10"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10 rounded-xl ring-1 ring-inset ring-gray-900/10" />
              <a
                className="text-lg font-semibold leading-6 text-white hover:text-teal-100"
                href
              >
                he Future of Artificial Intelligence: Trends and Challenges
              </a>
            </article>
            <article className="relative flex flex-col justify-end px-4 pt-40 pb-4 overflow-hidden bg-gray-900 md:pt-28 isolate rounded-xl dark:shadow dark:shadow-gray-400/50">
              <img
                src={images.slider11}
                alt
                className="absolute inset-0 object-cover w-full h-full -z-10"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10 rounded-xl ring-1 ring-inset ring-gray-900/10" />
              <a
                className="text-lg font-semibold leading-6 text-white hover:text-teal-100"
                href
              >
                he Rise of Blockchain Technology: A Comprehensive Guide
              </a>
            </article>
            <article className="relative flex flex-col justify-end px-4 pt-40 pb-4 overflow-hidden bg-gray-900 md:pt-28 isolate rounded-xl dark:shadow dark:shadow-gray-400/50">
              <img
                src={images.slider12}
                alt
                className="absolute inset-0 object-cover w-full h-full -z-10"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10 rounded-xl ring-1 ring-inset ring-gray-900/10" />
              <a
                className="text-lg font-semibold leading-6 text-white hover:text-teal-100"
                href
              >
                How Quantum Computing Will Revolutionize Data Security
              </a>
            </article>
            <article className="relative flex flex-col justify-end px-4 pt-40 pb-4 overflow-hidden bg-gray-900 md:pt-28 isolate rounded-xl dark:shadow dark:shadow-gray-400/50">
              <img
                src={images.slider13}
                alt
                className="absolute inset-0 object-cover w-full h-full -z-10"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10 rounded-xl ring-1 ring-inset ring-gray-900/10" />
              <a
                className="text-lg font-semibold leading-6 text-white hover:text-teal-100"
                href
              >
                he Future of Artificial Intelligence: Trends and Challenges
              </a>
            </article>
            <article className="relative flex flex-col justify-end px-4 pt-40 pb-4 overflow-hidden bg-gray-900 md:pt-28 isolate rounded-xl dark:shadow dark:shadow-gray-400/50">
              <img
                src={images.slider14}
                alt
                className="absolute inset-0 object-cover w-full h-full -z-10"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10 rounded-xl ring-1 ring-inset ring-gray-900/10" />
              <a
                className="text-lg font-semibold leading-6 text-white hover:text-teal-100"
                href
              >
                he Rise of Blockchain Technology: A Comprehensive Guide
              </a>
            </article>
            <article className="relative flex flex-col justify-end px-4 pt-40 pb-4 overflow-hidden bg-gray-900 md:pt-28 isolate rounded-xl dark:shadow dark:shadow-gray-400/50">
              <img
                src={images.slider15}
                alt
                className="absolute inset-0 object-cover w-full h-full -z-10"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10 rounded-xl ring-1 ring-inset ring-gray-900/10" />
              <a
                className="text-lg font-semibold leading-6 text-white hover:text-teal-100"
                href
              >
                How Quantum Computing Will Revolutionize Data Security
              </a>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
