// src/dataManager.ts

export type UserRole = 'investor' | 'creator';

export interface User {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  id?: string; // Made optional to avoid breaking existing code
}

interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

interface AddUserResult {
  success: boolean;
  error?: string;
}

const users: User[] = [
  {
    username: 'investor1',
    email: 'investor1@example.com',
    password: 'password',
    role: 'investor',
    id: '1', // Added but kept original structure
  },
  {
    username: 'creator1',
    email: 'creator1@example.com',
    password: 'password',
    role: 'creator',
    id: '2', // Added but kept original structure
  },
];

let currentUser: User | null = null;

export function getUsers(): User[] {
  return users;
}

export function addUser(newUser: User): AddUserResult {
  const exists = users.some(user => user.username === newUser.username);
  if (exists) {
    return { success: false, error: 'Username already exists' };
  }
  users.push(newUser);
  return { success: true };
}

export function authenticateUser(username: string, password: string): AuthResult {
  const user = users.find(
    user => user.username === username && user.password === password
  );
  if (user) {
    currentUser = user;
    return { success: true, user };
  }
  return { success: false, error: 'Invalid credentials' };
}

export function getCurrentUser(): User | null {
  return currentUser;
}

export function logoutUser(): void {
  currentUser = null;
}

export interface Movie {
  id: string;
  title: string;
  poster: string;
  director: string;
  producer: string;
  totalAmount: number;
  investedAmount: number;
  stockPrice: number;
  availableStocks: number; // Added this missing property
  creatorId: string;
}

const movies: Movie[] = [
  {
    id: '1',
    title: "The Last Horizon",
    poster: "https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    director: "Sarah Johnson",
    producer: "Michael Roberts",
    totalAmount: 2500000,
    investedAmount: 1750000,
    stockPrice: 100,
    availableStocks: 7500, // (2500000 - 1750000) / 100 = 7500
    creatorId: 'creator1'
  },
  {
    id: '2',
    title: "Whispers of the Heart",
    poster: "https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    director: "Robert Zhang",
    producer: "Sophia Davis",
    totalAmount: 1200000,
    investedAmount: 850000,
    stockPrice: 80,
    availableStocks: 4375, // (1200000 - 850000) / 80 = 4375
    creatorId: 'creator1'
  },
  {
    id: '3',
    title: "Shadows of Truth",
    poster: "https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    director: "Thomas Miller",
    producer: "Jennifer Brown",
    totalAmount: 1800000,
    investedAmount: 450000,
    stockPrice: 70,
    availableStocks: 19285, // (1800000 - 450000) / 70 = 19285
    creatorId: 'creator1'
  },
  {
    id: '4',
    title: "Beyond the Mountains",
    poster: "https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    director: "Alex Turner",
    producer: "Lisa Rodriguez",
    totalAmount: 3000000,
    investedAmount: 2100000,
    stockPrice: 120,
    availableStocks: 7500, // (3000000 - 2100000) / 120 = 7500
    creatorId: 'creator1'
  },
  {
    id: '5',
    title: "The Forgotten Symphony",
    poster: "https://images.pexels.com/photos/2777898/pexels-photo-2777898.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    director: "Elizabeth Parker",
    producer: "William Harris",
    totalAmount: 1500000,
    investedAmount: 900000,
    stockPrice: 90,
    availableStocks: 6666, // (1500000 - 900000) / 90 = 6666
    creatorId: 'creator1'
  },
  {
    id: '6',
    title: "City of Dreams",
    poster: "https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    director: "Mark Wilson",
    producer: "Jessica Moore",
    totalAmount: 2200000,
    investedAmount: 1200000,
    stockPrice: 85,
    availableStocks: 11764, // (2200000 - 1200000) / 85 = 11764
    creatorId: 'creator1'
  },
  {
    id: '7',
    title: "The Last Guardian",
    poster: "https://images.pexels.com/photos/6447217/pexels-photo-6447217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    director: "David Scott",
    producer: "Laura Thomas",
    totalAmount: 4000000,
    investedAmount: 1500000,
    stockPrice: 150,
    availableStocks: 16666, // (4000000 - 1500000) / 150 = 16666
    creatorId: 'creator1'
  },
  {
    id: '8',
    title: "Echoes of Yesterday",
    poster: "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    director: "Patricia Nelson",
    producer: "George Mitchell",
    totalAmount: 2800000,
    investedAmount: 1900000,
    stockPrice: 110,
    availableStocks: 8181, // (2800000 - 1900000) / 110 = 8181
    creatorId: 'creator1'
  }
];

// Keep your original structure but fix the data consistency issue
let movieList: Movie[] = [];

// Get all movies - return the main movies array, not movieList
export function getMovies(): Promise<Movie[]> {
  return Promise.resolve(movies);
}

export function addMovie(newMovie: Movie): Movie {
  movieList.push(newMovie);
  return newMovie;
}

export function getCreatorMovies(creatorId: string): Promise<Movie[]> {
  const creatorMovies = movieList.filter(movie => movie.creatorId === creatorId);
  return Promise.resolve(creatorMovies);
}

export function updateMovie(updated: Movie): void {
  // Update in the main movies array since that's what getMovies() returns
  const index = movies.findIndex((m) => m.id === updated.id);
  if (index !== -1) {
    movies[index] = updated;
  }
  
  // Also update in movieList for consistency
  const movieListIndex = movieList.findIndex((m) => m.id === updated.id);
  if (movieListIndex !== -1) {
    movieList[movieListIndex] = updated;
  }
}
