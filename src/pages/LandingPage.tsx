import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, TrendingUp, Users, Zap } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Welcome to the Future of
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
                {' '}Entertainment Investment
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Connect creators with investors through our intelligent platform. 
              Fund the next blockbuster or discover your next investment opportunity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div 
              onClick={() => navigate('/auth?role=creator')}
              className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-transparent group-hover:border-blue-500 group-hover:shadow-2xl">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300">
                    <Film className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">CONTENT CREATOR</h3>
                  <p className="text-gray-600 mb-6">
                    Bring your vision to life. Get funding for your films and digital media projects 
                    with our intelligent investor matching system.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-blue-500" />
                    AI-Powered Analytics
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-blue-500" />
                    Investor Network
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2 text-blue-500" />
                    Smart Funding
                  </div>
                  <div className="flex items-center">
                    <Film className="w-4 h-4 mr-2 text-blue-500" />
                    Project Management
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform group-hover:scale-105">
                  Start Creating
                </button>
              </div>
            </div>

            <div 
              onClick={() => navigate('/auth?role=investor')}
              className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-transparent group-hover:border-teal-500 group-hover:shadow-2xl">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-teal-600 group-hover:to-teal-700 transition-all duration-300">
                    <TrendingUp className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">INVESTOR</h3>
                  <p className="text-gray-600 mb-6">
                    Invest in the entertainment industry with confidence. Discover promising projects 
                    and diversify your portfolio with creative content.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-teal-500" />
                    Risk Analysis
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-teal-500" />
                    Creator Network
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2 text-teal-500" />
                    ROI Tracking
                  </div>
                  <div className="flex items-center">
                    <Film className="w-4 h-4 mr-2 text-teal-500" />
                    Portfolio Insights
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-300 transform group-hover:scale-105">
                  Start Investing
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Choose Our Platform?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">AI-Powered Insights</h4>
                <p className="text-gray-600 text-sm">Advanced analytics for risk assessment and market predictions</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Secure Network</h4>
                <p className="text-gray-600 text-sm">Verified creators and investors in a trusted ecosystem</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Dynamic Profits</h4>
                <p className="text-gray-600 text-sm">Flexible profit-sharing models tailored to each project</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;