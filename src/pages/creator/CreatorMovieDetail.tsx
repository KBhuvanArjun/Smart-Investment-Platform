import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovies, Movie } from "../../Data/dataManager";

const CreatorMovieDetail: React.FC = () => {
  const { id } = useParams(); // expects route like /creator-movie-detail/:id
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const allMovies = await getMovies();
      const found = allMovies.find((m) => m.id === id);
      if (found) setMovie(found);
    };
    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div className="text-center mt-10 text-lg font-medium">Loading movie details...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <img src={movie.poster} alt={movie.title} className="w-full h-64 object-cover rounded mb-4" />
      <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
      <p className="mb-4">An amazing upcoming project by our creator.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Cast & Crew</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <input defaultValue={movie.director} placeholder="Director" className="p-2 border rounded" />
        <input defaultValue={movie.producer} placeholder="Producer" className="p-2 border rounded" />
        <input placeholder="Singer" className="p-2 border rounded" />
        <input placeholder="Hero" className="p-2 border rounded" />
        <input placeholder="Heroine" className="p-2 border rounded" />
      </div>

      <h2 className="text-xl font-semibold mb-2">Funding Goal</h2>
<div className="grid grid-cols-2 gap-4 mb-6">
  <div>
    <label className="block mb-1 font-medium">Total Amount</label>
    <input defaultValue={movie.totalAmount} placeholder="Total Amount" className="p-2 border rounded w-full" />
  </div>
  <div>
    <label className="block mb-1 font-medium">Invested Amount</label>
    <input defaultValue={movie.investedAmount} placeholder="Invested Amount" className="p-2 border rounded w-full" />
  </div>
  <div>
    <label className="block mb-1 font-medium">Required Amount</label>
    <input
      defaultValue={movie.totalAmount - movie.investedAmount}
      placeholder="Required Amount"
      className="p-2 border rounded w-full"
    />
  </div>
  <div>
    <label className="block mb-1 font-medium">Stock Price</label>
    <input defaultValue={movie.stockPrice} placeholder="Stock Price" className="p-2 border rounded w-full" />
  </div>
</div>


      <button className="bg-yellow-500 px-4 py-2 rounded text-white mr-4">AI - Analysis</button>
      <button className="bg-green-600 px-4 py-2 rounded text-white">Save</button>
    </div>
  );
};

export default CreatorMovieDetail;
