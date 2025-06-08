import React from 'react';
import { Tv, Clock, Star } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const WebSeriesPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Header showNavigation />
      
      <main className="flex-1 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Web Series
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover and invest in the next generation of digital entertainment content
            </p>
          </div>

          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <Tv className="w-16 h-16 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Web Series Coming Soon
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              We're expanding our platform to include web series and digital content investments. 
              This exciting new category will offer even more opportunities for creators and investors.
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Premium Content</h3>
                <p className="text-gray-600">High-quality web series from talented creators worldwide</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Flexible Formats</h3>
                <p className="text-gray-600">From mini-series to full seasons, various content lengths</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Tv className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Digital First</h3>
                <p className="text-gray-600">Content designed specifically for digital platforms</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-xl p-8 text-white max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="mb-6">
                Be the first to know when web series investments become available on our platform.
              </p>
              <div className="flex space-x-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WebSeriesPage;