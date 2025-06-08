import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, Star, TrendingUp, Search, Filter } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getMovies, Movie } from '../../Data/dataManager';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const InvestorMovies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMovies().then((data) => {
      setMovies(data);
      setLoading(false);
    });
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2 text-primary-800">Movie Projects</h1>
        <p className="text-gray-600">Discover and invest in upcoming film projects</p>
      </motion.div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search movies..."
              className="input-field pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-secondary flex items-center justify-center space-x-2 whitespace-nowrap">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading movies...</p>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredMovies.map((movie) => (
            <motion.div key={movie.id} variants={item}>
              <Link to={`/investor/movie/${movie.id}`} className="block">
                <div className="card hover:shadow-xl transition-shadow duration-300">
                  <div className="relative pb-[150%] overflow-hidden rounded-t-lg">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="absolute w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-primary-800 hover:text-primary-600 transition-colors duration-200">
                      {movie.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Goal: ${movie.totalAmount.toLocaleString()}
                    </p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-secondary-500 h-2.5 rounded-full"
                        style={{ width: `${(movie.investedAmount / movie.totalAmount) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {Math.round((movie.investedAmount / movie.totalAmount) * 100)}% funded
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}

      {!loading && filteredMovies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No movies found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default InvestorMovies;
