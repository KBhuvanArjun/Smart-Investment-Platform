import React from 'react';
import { motion } from 'framer-motion';
import { Film, Users, DollarSign, TrendingUp, PlusCircle, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const CreatorHome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Header showNavigation />
      
      <main className="flex-1 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Creator Dashboard
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bring your creative vision to life with intelligent funding solutions
            </p>
          </div>

          <div className="mb-12">
        <div className="prose max-w-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-primary-700">Home</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="mb-4">A Smart Investment Platform for Films and Digital Media Projects is a next-generation web-based ecosystem that connects digital content creators with public investors. The platform empowers creators to showcase their pitches, timelines, and budgets, while enabling investors to fund promising projects and earn a share of future profits — simulating a stock-market-like experience in the entertainment sector.</p>
              
              <h3 className="text-xl font-semibold mb-2 text-primary-600">Terms & Conditions:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><span className="font-medium">User Roles:</span> Creators may submit only original projects with complete documentation. Investors are responsible for assessing project risk using the tools provided.</li>
                <li><span className="font-medium">Profit Distribution:</span> Revenue sharing is proportional to the investment made, based on actual project performance. The platform does not guarantee returns; investments carry inherent risk.</li>
                <li><span className="font-medium">AI Features:</span> With built-in AI features for project evaluation, fraud detection, and revenue forecasting, the platform ensures a secure, transparent, and scalable model for media financing.</li>
                <li><span className="font-medium">Legal Compliance:</span> Users must comply with applicable IP, copyright, and funding laws. The platform holds no liability for legal disputes arising from uploaded content or investments.</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Film className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">12</h3>
              <p className="text-gray-600">Active Projects</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">248</h3>
              <p className="text-gray-600">Total Investors</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">$1.2M</h3>
              <p className="text-gray-600">Funds Raised</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">85%</h3>
              <p className="text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreatorHome;