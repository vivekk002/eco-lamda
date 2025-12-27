const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { User, Chat, Source } = require('./models');
const { getGeminiResponse } = require('./geminiService');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to Atlas MongoDB'))
  .catch(err => {
    console.error('MongoDB Connection Error:', err.name);
    if (err.name === 'MongooseServerSelectionError') {
      console.error('--------------------------------------------------');
      console.error('ACTION REQUIRED: IP Whitelisting Needed');
      console.error('Your server IP is not whitelisted in MongoDB Atlas.');
      console.error('Whitelist this IP: 152.58.185.71');
      console.error('Check instructions in the sidebar plan.');
      console.error('--------------------------------------------------');
    } else {
      console.error(err);
    }
  });

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Auth Routes
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Signup attempt:', { name, email });
  try {
    const user = new User({ name, email, password });
    await user.save();
    console.log('User created successfully');
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(400).json({ error: err.message || 'Signup failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', email);
  try {
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '24h' });
      console.log('Login successful');
      res.json({ token, name: user.name });
    } else {
      console.log('Invalid credentials');
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Sources Route
app.get('/api/sources', authenticateToken, async (req, res) => {
  try {
    const sources = await Source.find();
    res.json(sources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tips Route (Feature B: Video Summaries)
app.get('/api/tips', authenticateToken, async (req, res) => {
  res.json([
    { 
      id: 1, 
      title: 'Kinked Demand Curve Logic', 
      type: 'graph',
      concept: 'Price Rigidity',
      caption: 'Firms fear raising prices (elastic demand) and cutting prices (inelastic demand), leading to Price Rigidity.',
      duration: '2:45',
      videoUrl: 'https://www.youtube.com/embed/Ec19ljjvlCI',
      startTime: 165 // 2:45 is 165 seconds
    },
    { 
      id: 2, 
      title: 'The Payoff Matrix', 
      type: 'matrix',
      concept: 'Nash Equilibrium',
      caption: 'The Nash Equilibrium: Why firms often settle for lower profits rather than trusting each other.',
      data: {
        firmA: 'Firm A',
        firmB: 'Firm B',
        cells: [
          { a: 'High Price', b: 'High Price', valA: '£3m', valB: '£3m' },
          { a: 'High Price', b: 'Low Price', valA: '£0', valB: '£5m' },
          { a: 'Low Price', b: 'High Price', valA: '£5m', valB: '£0' },
          { a: 'Low Price', b: 'Low Price', valA: '£1m', valB: '£1m' }
        ]
      },
      duration: '3:12',
      videoUrl: 'https://www.youtube.com/embed/Z_S0VA4jKes',
      startTime: 3 // Started at 3s as per user link
    },
    { 
      id: 3, 
      title: 'Concentration Ratio Formula', 
      type: 'formula',
      concept: 'Market Structure',
      caption: 'Exam Tip: Add the market share of the top X firms. If high, it\'s an oligopoly.',
      formula: 'CR_x = Σ S_i',
      details: 'Where S_i is the market share of the i-th firm.',
      duration: '1:30',
      videoUrl: 'https://www.youtube.com/embed/Ec19ljjvlCI',
      startTime: 90 // 1:30 is 90 seconds
    }
  ]);
});

// Chat Routes (Private)
app.post('/api/chat', authenticateToken, async (req, res) => {
  const { question, type } = req.body;
  const answer = await getGeminiResponse(question);
  
  const chat = new Chat({
    userId: req.user.userId,
    question,
    answer,
    type: type || 'text'
  });
  await chat.save();
  
  res.json({ answer });
});

app.get('/api/chat/history', authenticateToken, async (req, res) => {
  const history = await Chat.find({ userId: req.user.userId }).sort({ createdAt: -1 });
  res.json(history);
});

// Admin Seed
app.post('/api/admin/seed', async (req, res) => {
    await Source.deleteMany({});
    await Source.create([
      { title: 'Oligopoly Theory PDF', type: 'pdf' },
      { title: 'Kinked Demand Visuals', type: 'video' }
    ]);
    res.send('Seeded');
});

app.listen(PORT, () => console.log(`Server on ${PORT}`));
