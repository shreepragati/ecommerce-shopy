function Navbar() {
    return (
      <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                  <div className="flex items-center">
                      <h1 className="text-2xl font-bold text-gray-800">ShopEasy</h1>
                  </div>
                  <div className="hidden md:flex space-x-6">
                      <a href="/" className="text-gray-800 hover:text-blue-600 text-sm font-medium">
                          Home
                      </a>
                      <a href="/about" className="text-gray-800 hover:text-blue-600 text-sm font-medium">
                          About
                      </a>
                      <a href="/shop" className="text-gray-800 hover:text-blue-600 text-sm font-medium">
                          Shop
                      </a>
                      <a href="/login" className="text-gray-800 hover:text-blue-600 text-sm font-medium">
                          Login
                      </a>
                  </div>
                  <div className="md:hidden">
                      <button className="text-gray-800 hover:text-blue-600">
                          <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          >
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 6h16M4 12h16m-7 6h7"
                          />
                          </svg>
                      </button>
                  </div>
              </div>
          </div>
      </nav>
    )
  }
  
  export default Navbar