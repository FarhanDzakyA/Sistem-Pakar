import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <span className="text-2xl font-bold">SKINTOLOGY</span>
        </div>
        <div className="flex space-x-8">
          <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Diagnose</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">About Us</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="grid grid-cols-2 bg-gradient-to-r from-rose-100 to-gray-200">
        <div className="relative h-96">
          <img
            src="/api/placeholder/600/500"
            alt="Skincare Model"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col items-center justify-center p-8 space-y-6">
          <h1 className="text-3xl font-semibold text-gray-800 text-center">
            "Advanced Skin Type Analysis for Smarter Skincare Decisions."
          </h1>
          <button className="bg-white px-6 py-3 rounded-md text-gray-800 hover:bg-gray-50 transition-colors">
            Diagnose Now
          </button>
        </div>
      </div>

      {/* About Us Section */}
      <div className="max-w-4xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">About Us</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Skintology uses the Certainty Factor (CF) method to identify your skin type with precision. 
          This approach measures the confidence level of a hypothesis based on available evidence. 
          Each symptom is assigned a weight and CF value, which are used to calculate the total CF 
          for each skin type. The results are then normalized to provide a clear and accurate diagnosis, 
          helping you understand your skin better and make informed skincare choices.
        </p>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-16">
        <h2 className="text-3xl font-semibold text-center mb-12">Meet Our Team</h2>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-4 gap-8">
            {[
              'Farhan Dzaky Aldias',
              'Suntan Jundi Khalid',
              'Ananda Sheva Hidayat',
              'Leo Nardo'
            ].map((name) => (
              <div
                key={name}
                className="bg-brown-800 text-white p-4 rounded-lg text-center"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-brown-900 text-white py-4 text-center">
        <p>©2024 SKINTOLOGY. All Right Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;