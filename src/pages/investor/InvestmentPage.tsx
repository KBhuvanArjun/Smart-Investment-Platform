import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getMovies, Movie, updateMovie } from '../../Data/dataManager';

const InvestmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [stockCount, setStockCount] = useState(1);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movies = await getMovies();
        const found = movies.find((m) => m.id === id);
        if (found) {
          setMovie(found);
        } else {
          console.warn('Movie not found');
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMovie();
  }, [id]);

  const handleStockChange = (increment: boolean) => {
    if (!movie) return;

    const requiredAmount = movie.totalAmount - movie.investedAmount;
    const maxAffordableStocks = Math.floor(requiredAmount / movie.stockPrice);
    const maxAllowed = Math.min(movie.availableStocks, maxAffordableStocks);

    setStockCount((prev) =>
      increment
        ? Math.min(prev + 1, maxAllowed)
        : Math.max(1, prev - 1)
    );
  };

  const handleBuy = () => {
    if (!movie || !user) return;

    const investmentAmount = stockCount * movie.stockPrice;
    const requiredAmount = movie.totalAmount - movie.investedAmount;

    if (investmentAmount > requiredAmount || stockCount > movie.availableStocks) {
      alert("Investment exceeds the allowed limit.");
      return;
    }

    const updatedMovie = {
      ...movie,
      investedAmount: movie.investedAmount + investmentAmount,
      availableStocks: movie.availableStocks - stockCount,
    };

    updateMovie(updatedMovie);
    setMovie(updatedMovie);

    const investment = {
      movieId: movie.id,
      investorId: user.id,
      investorName: user.username,
      stockCount,
      stockPrice: movie.stockPrice,
      totalAmount: investmentAmount,
    };

    navigate('/investor/payment', {
      state: {
        investment,
        movie: { title: movie.title, poster: movie.poster },
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <Header showNavigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading investment details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <Header showNavigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Investment Not Available</h2>
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

  const totalInvestment = stockCount * movie.stockPrice;
  const requiredAmount = movie.totalAmount - movie.investedAmount;
  const maxAffordableStocks = Math.floor(requiredAmount / movie.stockPrice);
  const maxAllowedStocks = Math.min(movie.availableStocks, maxAffordableStocks);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Header showNavigation />
      <main className="flex-1 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(`/investor/movie/${movie.id}`)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Movie Details</span>
          </button>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              Invest in {movie.title}
            </h1>
            <p className="text-xl text-gray-600">
              Choose your investment amount and secure your stake in this project
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full rounded-2xl shadow-xl mb-6"
              />
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Investment Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Required:</span>
                    <span className="font-bold text-xl text-gray-800">
                      ${requiredAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Price per Stock:</span>
                    <span className="font-bold text-xl text-blue-600">
                      ${movie.stockPrice}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Available Stocks:</span>
                    <span className="font-bold text-xl text-red-600">
                      {movie.availableStocks}
                    </span>
                  </div>
                  <div className="border-t pt-3 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800 font-semibold">Your Investment:</span>
                      <span className="font-bold text-2xl text-green-600">
                        ${totalInvestment.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
                  Investment Calculator
                </h2>
                <div className="space-y-8">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-4">
                      Number of Stocks
                    </label>
                    <div className="flex items-center justify-center space-x-6">
                      <button
                        onClick={() => handleStockChange(false)}
                        className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        disabled={stockCount <= 1}
                      >
                        <Minus className="w-6 h-6" />
                      </button>

                      <div className="bg-gray-100 rounded-xl px-8 py-4">
                        <span className="text-3xl font-bold text-gray-800">{stockCount}</span>
                      </div>

                      <button
                        onClick={() => handleStockChange(true)}
                        className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                        disabled={stockCount >= maxAllowedStocks}
                      >
                        <Plus className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6">
                    <div className="text-center">
                      <p className="text-gray-600 mb-2">Total Investment Amount</p>
                      <p className="text-4xl font-bold text-blue-600 mb-4">
                        ${totalInvestment.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {stockCount} stocks × ${movie.stockPrice} per stock
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleBuy}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-4 px-6 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center space-x-3 text-lg"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    <span>BUY NOW</span>
                  </button>

                  <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                    <p className="font-medium mb-2">Investment Terms:</p>
                    <ul className="space-y-1">
                      <li>• Minimum investment: 1 stock</li>
                      <li>• Returns based on project performance</li>
                      <li>• Transparent profit sharing model</li>
                      <li>• Secure blockchain-based transactions</li>
                    </ul>
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

export default InvestmentPage;
