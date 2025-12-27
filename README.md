
<div align="center">

# 🧠 EcoStudy AI

### Your Personal Economics Tutor Powered by RAG & Gemini AI

![Status](https://img.shields.io/badge/Status-MVP%20Complete-success?style=for-the-badge)
![Stack](https://img.shields.io/badge/Stack-MERN%20%2B%20Gemini-0088cc?style=for-the-badge&logo=mongodb)
![AI](https://img.shields.io/badge/AI-Gemini%201.5%20Flash-orange?style=for-the-badge&logo=google)
![Live Demo](https://img.shields.io/badge/Live-Demo-ff4081?style=for-the-badge&logo=vercel)

<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Books.png" alt="Books" width="120" />

**An intelligent RAG-powered platform that transforms Economics education through interactive AI conversations**

[🚀 Live Demo](https://eco-study-22ox86k7t-vivekk002s-projects.vercel.app/) • [Features](#features) • [Tech Stack](#tech-stack) • [Installation](#installation)

</div>

---

## 🎯 What Makes This Special?

**EcoStudy AI** isn't just another chatbot—it's your personal Economics tutor that understands context, references exact curriculum material, and explains concepts like a real teacher would.

Inspired by **NotebookLM**, this platform uses **Retrieval-Augmented Generation (RAG)** to ensure every answer is:

- ✅ Grounded in actual course material (Chapter 5.7 PDF + YouTube transcripts)
- ✅ Free from AI hallucinations
- ✅ Tailored specifically for Oligopoly Theory students

> **Think of it as having a personal tutor who has memorized your entire economics textbook and can explain any concept in seconds.**

---

## ✨ Features

### 🗣️ Real-Time Voice Tutor

Talk naturally with your AI tutor using voice commands.

- **Two-Way Audio Conversations:** Ask questions verbally and get spoken responses
- **Teacher Persona:** AI adopts a Socratic teaching style, asking follow-up questions to deepen understanding
- **Complex Topic Mastery:** Explains advanced concepts like Kinked Demand Curves and Game Theory in simple terms
- **Powered by:** Web Speech API for seamless voice interaction

### 📹 Intelligent Video Summaries

Extract key insights from educational videos instantly.

- Auto-generated summaries of lecture content
- Visual breakdowns of Payoff Matrices and Nash Equilibrium
- Quick "Exam Tips" highlighting important concepts
- Time-stamped key moments

### 🧠 Context-Aware Chat Interface

Ask anything about Oligopolies and get precise, sourced answers.

- **Source Attribution:** Every answer includes references like *"As mentioned in Section 5.7.3..."*
- **Zero-Shot Problem Solving:** Solves hypothetical scenarios using curriculum principles
- **No Hallucinations:** Responses are strictly limited to provided course material
- **Chat History:** Saves your learning progress across sessions

---

## 🏗️ System Architecture

```
                           ┌──────────────────────┐
                           │   Student Query      │
                           │  (Text/Voice Input)  │
                           └──────────┬───────────┘
                                      │
                                      ▼
                           ┌──────────────────────┐
                           │  Context Retrieval   │
                           │       Layer          │
                           │                      │
                           │ -  PDF Chunking       │
                           │ -  Semantic Search    │
                           │ -  Relevance Scoring  │
                           └──────────┬───────────┘
                                      │
                                      ▼
                           ┌──────────────────────┐
                           │  Prompt Engineering  │
                           │       Layer          │
                           │                      │
                           │ -  Context Injection  │
                           │ -  System Instructions│
                           │ -  Temperature Control│
                           └──────────┬───────────┘
                                      │
                                      ▼
                           ┌──────────────────────┐
                           │   Gemini 1.5 Flash   │
                           │       (LLM)          │
                           │                      │
                           │ -  Text Generation    │
                           │ -  Reasoning Engine   │
                           │ -  Source Attribution │
                           └──────────┬───────────┘
                                      │
                                      ▼
                           ┌──────────────────────┐
                           │  Response Formatter  │
                           │                      │
                           │ -  Markdown Format    │
                           │ -  Source Citations   │
                           │ -  Audio Output       │
                           └──────────┬───────────┘
                                      │
                                      ▼
                           ┌──────────────────────┐
                           │   User Interface     │
                           │  (Chat/Voice Mode)   │
                           └──────────────────────┘
```

### Architecture Components

| Component | Description | Technology |
| --- | --- | --- |
| **Ingestion Pipeline** | Preprocesses PDFs and video transcripts into structured knowledge chunks | Python, PDF.js |
| **RAG Engine** | Retrieves relevant context before generating responses | Custom retrieval algorithm |
| **AI Layer** | Gemini 1.5 Flash provides fast, accurate answers with educational formatting | Google Gemini API |
| **Authentication** | Secure user management and session handling | JWT, Bcrypt |
| **Database** | Stores user data, chat history, and curriculum metadata | MongoDB Atlas |

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technologies |
| --- | --- |
| **Frontend** | ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) ![Tailwind](https://img.shields.io/badge/Tailwind-38B2AC?style=flat&logo=tailwind-css&logoColor=white) ![Framer](https://img.shields.io/badge/Framer-0055FF?style=flat&logo=framer&logoColor=white) |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white) |
| **Database** | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat) |
| **AI/ML** | ![Gemini](https://img.shields.io/badge/Gemini%201.5%20Flash-4285F4?style=flat&logo=google&logoColor=white) ![RAG](https://img.shields.io/badge/RAG%20Pipeline-FF6F00?style=flat) |
| **Auth** | ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=json-web-tokens&logoColor=white) ![Bcrypt](https://img.shields.io/badge/Bcrypt-003A70?style=flat) |

</div>

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have:

- **Node.js** v18 or higher
- **MongoDB Atlas** account (or local MongoDB instance)
- **Google Gemini API Key** - [Get it here](https://ai.google.dev/)

### Setup Steps

#### 1. Clone the Repository

```
git clone https://github.com/vivekk002/eco-lamda.git
cd assignment1
```

#### 2. Backend Configuration

Navigate to the server directory and install dependencies:

```
cd server
npm install
```

Create a `.env` file in the `/server` directory:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_secure_random_string
```

Start the backend server:

```
npm run dev
```

The backend will run on `http://localhost:5000`

#### 3. Frontend Configuration

Open a new terminal and navigate to the client directory:

```
cd ../client
npm install
```

Start the development server:

```
npm run dev
```

#### 4. Access the Application

Open your browser and navigate to:

```
http://localhost:5173
```

---

## 📂 Project Structure

```
eco-lamda/
│
├── client/                          # React Frontend Application
│   ├── public/                      # Static assets
│   │   ├── index.html
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── components/              # Reusable React components
│   │   │   ├── Chat/
│   │   │   │   ├── ChatInterface.tsx
│   │   │   │   ├── MessageBubble.tsx
│   │   │   │   └── InputBox.tsx
│   │   │   │
│   │   │   ├── Voice/
│   │   │   │   ├── VoiceTutor.tsx
│   │   │   │   └── AudioControls.tsx
│   │   │   │
│   │   │   ├── Video/
│   │   │   │   ├── VideoSummary.tsx
│   │   │   │   └── TimelineView.tsx
│   │   │   │
│   │   │   └── Auth/
│   │   │       ├── Login.tsx
│   │   │       └── Register.tsx
│   │   │
│   │   ├── pages/                   # Page-level components
│   │   │   ├── Home.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── Profile.tsx
│   │   │
│   │   ├── services/                # API integration services
│   │   │   ├── api.ts               # Axios configuration
│   │   │   ├── authService.ts       # Authentication APIs
│   │   │   └── chatService.ts       # Chat/AI APIs
│   │   │
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   └── useChat.ts
│   │   │
│   │   ├── utils/                   # Utility functions
│   │   │   ├── speechRecognition.ts
│   │   │   └── formatters.ts
│   │   │
│   │   ├── types/                   # TypeScript type definitions
│   │   │   └── index.ts
│   │   │
│   │   ├── App.tsx                  # Root component
│   │   ├── main.tsx                 # Entry point
│   │   └── index.css                # Global styles
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── server/                          # Node.js Backend Application
│   ├── config/
│   │   └── database.js              # MongoDB connection setup
│   │
│   ├── models/                      # Mongoose schemas
│   │   ├── User.js                  # User model
│   │   ├── ChatHistory.js           # Chat history model
│   │   └── Document.js              # Curriculum document model
│   │
│   ├── routes/                      # Express route handlers
│   │   ├── auth.js                  # Authentication routes
│   │   ├── chat.js                  # Chat/AI interaction routes
│   │   └── user.js                  # User profile routes
│   │
│   ├── controllers/                 # Business logic controllers
│   │   ├── authController.js        # Auth logic
│   │   ├── chatController.js        # AI/RAG logic
│   │   └── userController.js        # User management logic
│   │
│   ├── middleware/                  # Express middlewares
│   │   ├── auth.js                  # JWT verification
│   │   ├── errorHandler.js          # Error handling
│   │   └── validator.js             # Input validation
│   │
│   ├── services/                    # External service integrations
│   │   ├── geminiService.js         # Gemini API integration
│   │   ├── ragService.js            # RAG pipeline logic
│   │   └── pdfProcessor.js          # PDF parsing service
│   │
│   ├── utils/                       # Helper functions
│   │   ├── tokenGenerator.js        # JWT utilities
│   │   └── logger.js                # Logging utility
│   │
│   ├── data/                        # Static curriculum data
│   │   ├── chapter_5_7.pdf
│   │   └── video_transcripts.json
│   │
│   ├── .env                         # Environment variables
│   ├── server.js                    # Express server entry point
│   └── package.json
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## 🎨 Key Design Decisions

### Why Gemini 1.5 Flash?

- **Low Latency:** Critical for real-time voice interactions
- **Large Context Window:** Handles entire chapter content in a single prompt (1M tokens)
- **Cost-Effective:** Flash variant optimized for educational use cases
- **Multimodal Support:** Processes both text and audio inputs seamlessly

### Prompt Engineering Strategy

Instead of generic responses, the system uses:

- **System Instructions:** Forces Socratic teaching methods
- **Few-Shot Examples:** Trains the model to cite specific textbook sections
- **Temperature Control:** Balances creativity with factual accuracy (set to 0.7)
- **Context Injection:** Relevant curriculum snippets are prepended to every query

### Authentication Architecture

- **Stateless JWT:** Reduces database queries during user sessions
- **Secure Password Hashing:** Bcrypt with 10 salt rounds for user data protection
- **Token Expiration:** 7-day expiry for security balance

---

## 🔑 Environment Variables

### Backend (.env)

| Variable | Description | Example |
| --- | --- | --- |
| `PORT` | Server port number | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `GEMINI_API_KEY` | Google Gemini API key | `AIzaSy...` |
| `JWT_SECRET` | Secret key for JWT signing | `your_random_secret_key_here` |

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve EcoStudy AI:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is part of a Full Stack AI Internship Assessment.

---

## 🙏 Acknowledgments

- **Google Gemini AI** for providing the LLM capabilities
- **NotebookLM** for RAG architecture inspiration
- **MongoDB Atlas** for database hosting
- **Vercel** for seamless deployment

---

<div align="center">

### 🌟 Built by [Vivek Kumar](https://github.com/vivekk002)

**If this project helped you, consider giving it a star ⭐**

[![GitHub](https://img.shields.io/badge/GitHub-vivekk002-181717?style=for-the-badge&logo=github)](https://github.com/vivekk002)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-ff4081?style=for-the-badge&logo=google-chrome)](https://vivekk002.vercel.app)

</div>
