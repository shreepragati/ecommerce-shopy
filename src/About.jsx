import Navbar from "./components/Navbar";

const AboutPage = () => {
  return (
    <div className="font-sans">
      <Navbar />
      

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold">About Us</h1>
          <p className="mt-4 text-lg md:text-xl">
            Learn more about our journey, values, and vision for the future.
          </p>
        </div>
      </header>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Our Mission & Vision
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to revolutionize the online shopping experience
                by providing high-quality products at unbeatable prices. We are
                committed to ensuring customer satisfaction through exceptional
                service and seamless experiences.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We envision a world where online shopping is effortless,
                trustworthy, and accessible to everyone. We aim to be the most
                customer-centric e-commerce platform by driving innovation and
                fostering trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Our Story
          </h2>
          <p className="text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
            Founded in 2020, ShopEasy began as a small venture to bring quality
            products to people’s doorsteps. Over the years, we’ve grown into a
            thriving e-commerce platform, catering to thousands of happy
            customers worldwide. Our journey has been fueled by our passion for
            excellence, innovation, and a commitment to make shopping as simple
            as it should be.
          </p>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                John Doe
              </h3>
              <p className="text-blue-600">CEO & Founder</p>
              <p className="mt-2 text-gray-600">
                John leads our vision and strategy, ensuring we deliver the best
                for our customers.
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                Jane Smith
              </h3>
              <p className="text-blue-600">Head of Operations</p>
              <p className="mt-2 text-gray-600">
                Jane oversees the daily operations to keep everything running
                smoothly.
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                Alex Brown
              </h3>
              <p className="text-blue-600">Marketing Specialist</p>
              <p className="mt-2 text-gray-600">
                Alex drives our marketing campaigns and builds lasting customer
                relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <footer className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Ready to shop with us?</h2>
          <p className="mt-4 text-lg">
            Experience the difference with ShopEasy today. Let’s make shopping
            fun and easy.
          </p>
          <div className="mt-8">
            <a
              href="#"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow hover:bg-gray-100"
            >
              Start Shopping
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;