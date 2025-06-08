import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, Brain, DollarSign, CheckCircle } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getMovies, Movie } from '../../Data/dataManager';

// interface Movie {
//   id: string;
//   title: string;
//   poster: string;
//   director: string;
//   producer: string;
//   singer: string;
//   hero: string;
//   heroine: string;
//   totalAmount: number;
//   investedAmount: number;
//   stockPrice: number;
// }

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFunding, setShowFunding] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  useEffect(() => {
  if (id) {
    getMovies().then((allMovies) => {
      const selectedMovie = allMovies.find((m) => m.id === id);
      if (selectedMovie) {
        setMovie(selectedMovie);
      }
      setLoading(false);
    });
  }
}, [id]);


  const calculateProgress = (invested: number, total: number) => {
    return Math.min((invested / total) * 100, 100);
  };

  const getRiskLevel = () => {
    if (!movie) return 'Medium';
    const progress = calculateProgress(movie.investedAmount, movie.totalAmount);
    if (progress > 70) return 'Low';
    if (progress > 30) return 'Medium';
    return 'High';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'text-green-600 bg-green-100';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'High':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <Header showNavigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading movie details...</p>
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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Movie Not Found</h2>
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

  const requiredAmount = movie.totalAmount - movie.investedAmount;
  const riskLevel = getRiskLevel();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Header showNavigation />
      
      <main className="flex-1 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate('/investor/movies')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Movies</span>
          </button>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full rounded-2xl shadow-xl"
              />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-6">{movie.title}</h1>
              
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Project Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 mb-1">Director</p>
                    <p className="font-semibold text-gray-800">{movie.director}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Producer</p>
                    <p className="font-semibold text-gray-800">{movie.producer}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Music</p>
                    <p className="font-semibold text-gray-800">{movie.singer}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Lead Actor</p>
                    <p className="font-semibold text-gray-800">{movie.hero}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600 mb-1">Lead Actress</p>
                    <p className="font-semibold text-gray-800">{movie.heroine}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setShowFunding(!showFunding)}
                  className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-teal-600 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Target className="w-6 h-6" />
                  <span>FUNDING GOAL</span>
                </button>

                {showFunding && (
                  <div className="bg-white rounded-2xl shadow-lg p-6 animate-fadeIn">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Funding Details</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Amount:</span>
                        <span className="font-bold text-2xl text-gray-800">${movie.totalAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Invested Amount:</span>
                        <span className="font-bold text-2xl text-teal-600">${movie.investedAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Required Amount:</span>
                        <span className="font-bold text-2xl text-orange-600">${requiredAmount.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
                        <div
                          className="bg-gradient-to-r from-teal-500 to-blue-500 h-4 rounded-full transition-all duration-300"
                          style={{ width: `${calculateProgress(movie.investedAmount, movie.totalAmount)}%` }}
                        ></div>
                      </div>
                      <p className="text-center text-gray-600">
                        {Math.round(calculateProgress(movie.investedAmount, movie.totalAmount))}% funded
                      </p>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setShowAnalysis(!showAnalysis)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Brain className="w-6 h-6" />
                  <span>AI - ANALYSIS</span>
                </button>

                {showAnalysis && (
                  <div className="bg-white rounded-2xl shadow-lg p-6 animate-fadeIn">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">AI Risk Analysis</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Risk Score:</span>
                        <span className={`font-bold px-4 py-2 rounded-full ${getRiskColor(riskLevel)}`}>
                          {riskLevel}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Fraud Detection:</span>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="font-bold text-green-600">Clear</span>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 mt-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Analysis Summary</h4>
                        <p className="text-gray-600 text-sm">
                          Based on project details, team credentials, and funding progress, this project shows 
                          {riskLevel === 'Low' ? ' strong potential with minimal risk factors.' : 
                           riskLevel === 'Medium' ? ' moderate potential with manageable risk factors.' : 
                           ' high potential but with elevated risk factors that require careful consideration.'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => navigate(`/investor/invest/${movie.id}`)}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <DollarSign className="w-6 h-6" />
                  <span>INVEST NOW</span>
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

export default MovieDetail;