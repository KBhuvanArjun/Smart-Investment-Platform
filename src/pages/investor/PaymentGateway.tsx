import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Shield, CheckCircle, ArrowLeft } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const PaymentGateway: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { investment, movie } = location.state || {};

  if (!investment || !movie) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <Header showNavigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Information Not Available</h2>
            <button
              onClick={() => navigate('/investor/movies')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Movies
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Header showNavigation />
      
      <main className="flex-1 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              Payment Gateway
            </h1>
            <p className="text-xl text-gray-600">
              Complete your investment in {movie.title}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>
                
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-20 h-28 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{movie.title}</h3>
                    <p className="text-gray-600">Investment Opportunity</p>
                  </div>
                </div>

                <div className="space-y-4 border-t pt-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Number of Stocks:</span>
                    <span className="font-semibold">{investment.stockCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price per Stock:</span>
                    <span className="font-semibold">${investment.stockPrice}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-4">
                    <span>Total Amount:</span>
                    <span className="text-green-600">${investment.totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-800">Secure Transaction</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Your payment is protected by 256-bit SSL encryption and blockchain technology.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment Gateway</h2>
                
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CreditCard className="w-12 h-12 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Payment Gateway Integration
                  </h3>
                  
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    This is a placeholder for the payment gateway integration. 
                    In a production environment, this would connect to payment processors 
                    like Stripe, PayPal, or other secure payment systems.
                  </p>

                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Supported Payment Methods</h4>
                      <div className="flex justify-center space-x-4 text-sm text-gray-600">
                        <span>• Credit Cards</span>
                        <span>• Bank Transfer</span>
                        <span>• Digital Wallets</span>
                        <span>• Cryptocurrency</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        alert('Payment gateway integration will be implemented in production. Your investment has been recorded!');
                        navigate('/investor/movies');
                      }}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-4 px-6 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <CheckCircle className="w-6 h-6" />
                      <span>Proceed to Payment</span>
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      By proceeding, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentGateway;