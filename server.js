import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock data
let users = [];
let movies = [];
let investments = [];

// Authentication routes
app.post('/api/signup', (req, res) => {
  const { username, email, password, role } = req.body;
  
  console.log('Signup request:', { username, email, role });
  
  const existingUser = users.find(u => u.username === username || u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }
  
  const user = {
    id: Date.now().toString(),
    username,
    email,
    password,
    role,
    createdAt: new Date()
  };
  
  users.push(user);
  console.log('User created:', { ...user, password: undefined });
  res.json({ success: true, user: { ...user, password: undefined } });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  console.log('Login request:', { username });
  console.log('Available users:', users.map(u => ({ username: u.username, role: u.role })));
  
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    console.log('Login failed: Invalid credentials');
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  console.log('Login successful:', { ...user, password: undefined });
  res.json({ success: true, user: { ...user, password: undefined } });
});

// Movies routes
app.get('/api/movies', (req, res) => {
  res.json(movies);
});

app.get('/api/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === req.params.id);
  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }
  res.json(movie);
});

app.post('/api/movies', (req, res) => {
  const movie = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date(),
    investedAmount: 0
  };
  
  movies.push(movie);
  res.json(movie);
});

app.put('/api/movies/:id', (req, res) => {
  const movieIndex = movies.findIndex(m => m.id === req.params.id);
  if (movieIndex === -1) {
    return res.status(404).json({ error: 'Movie not found' });
  }
  
  movies[movieIndex] = { ...movies[movieIndex], ...req.body };
  res.json(movies[movieIndex]);
});

// Investment routes
app.post('/api/investments', (req, res) => {
  const investment = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date()
  };
  
  investments.push(investment);
  
  // Update movie invested amount
  const movie = movies.find(m => m.id === investment.movieId);
  if (movie) {
    movie.investedAmount = (movie.investedAmount || 0) + investment.totalAmount;
  }
  
  res.json(investment);
});

app.get('/api/investments', (req, res) => {
  const { creatorId } = req.query;
  
  if (creatorId) {
    const creatorMovies = movies.filter(m => m.creatorId === creatorId);
    const creatorInvestments = investments.filter(inv => 
      creatorMovies.some(movie => movie.id === inv.movieId)
    );
    res.json(creatorInvestments);
  } else {
    res.json(investments);
  }
});

// Initialize with some sample data
movies.push(
  {
    id: '1',
    title: 'Epic Adventure',
    poster: 'https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg',
    director: 'John Director',
    producer: 'Jane Producer',
    singer: 'Music Maestro',
    hero: 'Action Star',
    heroine: 'Lead Actress',
    totalAmount: 1000000,
    investedAmount: 350000,
    stockPrice: 100,
    createdAt: new Date(),
    creatorId: 'sample-creator'
  },
  {
    id: '2',
    title: 'Romantic Drama',
    poster: 'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg',
    director: 'Sarah Director',
    producer: 'Mike Producer',
    singer: 'Melody Singer',
    hero: 'Romantic Lead',
    heroine: 'Drama Queen',
    totalAmount: 750000,
    investedAmount: 200000,
    stockPrice: 75,
    createdAt: new Date(),
    creatorId: 'sample-creator-2'
  }
);

// Add some sample users for testing
users.push(
  {
    id: 'sample-investor',
    username: 'investor1',
    email: 'investor@test.com',
    password: 'password',
    role: 'investor',
    createdAt: new Date()
  },
  {
    id: 'sample-creator',
    username: 'creator1',
    email: 'creator@test.com',
    password: 'password',
    role: 'creator',
    createdAt: new Date()
  }
);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('Sample users for testing:');
  console.log('Investor: username="investor1", password="password"');
  console.log('Creator: username="creator1", password="password"');
});