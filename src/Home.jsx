import Navbar from "./components/Navbar";

const HomePage = () => {
  return (
    <div className="font-sans">
      <Navbar />

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold">
            Your Favorite Online Store
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Discover the best products and deals. Start your shopping journey
            today.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <a
              href="/shop"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow hover:bg-gray-100"
            >
              Shop Now
            </a>
            <a
              href="/about"
              className="bg-blue-700 px-6 py-3 rounded-lg shadow hover:bg-blue-800"
            >
              Learn More
            </a>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Why Shop With Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center items-center h-16 w-16 bg-blue-600 text-white rounded-full mx-auto mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7M8 21h8m-4-8v8"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Free Shipping</h3>
              <p className="mt-2 text-gray-600">
                Enjoy free shipping on all orders over $50.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center items-center h-16 w-16 bg-blue-600 text-white rounded-full mx-auto mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c2.28 0 4-1.72 4-4S14.28 0 12 0 8 1.72 8 4s1.72 4 4 4z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Best Prices</h3>
              <p className="mt-2 text-gray-600">
                We offer the most competitive prices.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center items-center h-16 w-16 bg-blue-600 text-white rounded-full mx-auto mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 7V3m0 0L9 6m3-3l3 3M4 17v4m0 0h16v-4M4 17L7 14m0 0L4 11m3 3h10m0 0l3 3m-3-3L17 14"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                Hassle-Free Returns
              </h3>
              <p className="mt-2 text-gray-600">
                Shop confidently with easy returns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 ShopEasy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;