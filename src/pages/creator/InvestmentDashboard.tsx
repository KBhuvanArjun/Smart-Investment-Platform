import React, { useState, useEffect } from 'react';
import { Users, DollarSign, TrendingUp, Film, PieChart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface Investment {
  id: string;
  movieId: string;
  investorId: string;
  investorName: string;
  stockCount: number;
  stockPrice: number;
  totalAmount: number;
  createdAt: string;
}

interface Movie {
  id: string;
  title: string;
  poster: string;
  totalAmount: number;
  investedAmount: number;
}

interface InvestmentData {
  totalInvestors: number;
  totalInvestment: number;
  investments: Investment[];
  movies: Movie[];
}

const InvestmentDashboard: React.FC = () => {
  const [data, setData] = useState<InvestmentData>({
    totalInvestors: 0,
    totalInvestment: 0,
    investments: [],
    movies: []
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchInvestmentData();
  }, [user]);

  const fetchInvestmentData = async () => {
    try {
      // Fetch investments for creator's projects
      const investmentResponse = await fetch(`http://localhost:3001/api/investments?creatorId=${user?.id}`);
      const investments = await investmentResponse.json();

      // Fetch creator's movies
      const moviesResponse = await fetch('http://localhost:3001/api/movies');
      const allMovies = await moviesResponse.json();
      const creatorMovies = allMovies.filter((movie: Movie) => movie.creatorId === user?.id);

      // Calculate totals
      const uniqueInvestors = new Set(investments.map((inv: Investment) => inv.investorId)).size;
      const totalInvestment = investments.reduce((sum: number, inv: Investment) => sum + inv.totalAmount, 0);

      setData({
        totalInvestors: uniqueInvestors,
        totalInvestment,
        investments,
        movies: creatorMovies
      });
    } catch (error) {
      console.error('Error fetching investment data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMovieTitle = (movieId: string) => {
    const movie = data.movies.find(m => m.id === movieId);
    return movie ? movie.title : 'Unknown Movie';
  };

  const getMoviePoster = (movieId: string) => {
    const movie = data.movies.find(m => m.id === movieId);
    return movie ? movie.poster : '';
  };

  const getInvestmentsByMovie = () => {
    const movieInvestments: { [key: string]: Investment[] } = {};
    data.investments.forEach(investment => {
      if (!movieInvestments[investment.movieId]) {
        movieInvestments[investment.movieId] = [];
      }
      movieInvestments[investment.movieId].push(investment);
    });
    return movieInvestments;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <Header showNavigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading investment dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const movieInvestments = getInvestmentsByMovie();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Header showNavigation />
      
      <main className="flex-1 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Investment Dashboard
            </h1>
            <p className="text-xl text-gray-600">
              Track your investor relationships and funding progress
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">{data.totalInvestors}</h3>
              <p className="text-gray-600">Total Investors</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">${data.totalInvestment.toLocaleString()}</h3>
              <p className="text-gray-600">Total Investment</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Film className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">{data.movies.length}</h3>
              <p className="text-gray-600">Active Projects</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">{data.investments.length}</h3>
              <p className="text-gray-600">Total Investments</p>
            </div>
          </div>

          {data.investments.length === 0 ? (
            <div className="text-center py-16">
              <PieChart className="w-24 h-24 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-600 mb-4">No Investments Yet</h3>
              <p className="text-gray-500">Once investors start funding your projects, you'll see detailed analytics here.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(movieInvestments).map(([movieId, investments]) => (
                <div key={movieId} className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="flex items-center space-x-6 mb-6">
                    <img
                      src={getMoviePoster(movieId)}
                      alt={getMovieTitle(movieId)}
                      className="w-20 h-28 object-cover rounded-lg"
                    />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {getMovieTitle(movieId)}
                      </h2>
                      <div className="grid grid-cols-3 gap-6 text-center">
                        <div>
                          <p className="text-2xl font-bold text-blue-600">
                            {new Set(investments.map(inv => inv.investorId)).size}
                          </p>
                          <p className="text-sm text-gray-600">Investors</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-600">
                            ${investments.reduce((sum, inv) => sum + inv.totalAmount, 0).toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600">Total Raised</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-purple-600">
                            {investments.reduce((sum, inv) => sum + inv.stockCount, 0)}
                          </p>
                          <p className="text-sm text-gray-600">Stocks Sold</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Investor</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Stocks</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Investment</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {investments.map((investment) => (
                          <tr key={investment.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                                  <span className="text-white font-semibold text-sm">
                                    {investment.investorName.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <span className="font-medium text-gray-800">{investment.investorName}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-gray-700">{investment.stockCount}</td>
                            <td className="py-4 px-4">
                              <span className="font-semibold text-green-600">
                                ${investment.totalAmount.toLocaleString()}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-gray-600">
                              {new Date(investment.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InvestmentDashboard;