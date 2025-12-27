```markdown
<div align="center">

# 🧠 EcoStudy AI

### Your Personal Economics Tutor Powered by RAG & Gemini AI

[![Status](https://img.shields.io/badge/Status-MVP%20Complete-success?style=for-the-badge)](https://eco-study-22ox86k7t-vivekk002s-projects.vercel.app/)
[![Stack](https://img.shields.io/badge/Stack-MERN%20%2B%20Gemini-0088cc?style=for-the-badge&logo=mongodb)](https://github.com/vivekk002/eco-lamda)
[![AI](https://img.shields.io/badge/AI-Gemini%201.5%20Flash-orange?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Live Demo](https://img.shields.io/badge/Live-Demo-ff4081?style=for-the-badge&logo=vercel)](https://eco-study-22ox86k7t-vivekk002s-projects.vercel.app/)

<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Books.png" alt="Books" width="150" />

**An intelligent RAG-powered platform that transforms Economics education through interactive AI conversations**

[Features](#-features) • [Architecture](#-system-architecture) • [Setup](#-quick-start) • [Tech Stack](#-tech-stack)

</div>

---

## 🎯 What Makes This Special?

**EcoStudy AI** isn't just another chatbot—it's your **personal Economics tutor** that understands context, references exact curriculum material, and explains concepts like a real teacher would.

Inspired by **NotebookLM**, this platform uses **Retrieval-Augmented Generation (RAG)** to ensure every answer is:
- ✅ Grounded in actual course material (Chapter 5.7 PDF + YouTube transcripts)
- ✅ Free from AI hallucinations
- ✅ Tailored specifically for **Oligopoly Theory** students

> **Think of it as having a personal tutor who has memorized your entire economics textbook and can explain any concept in seconds.**

---

## ✨ Features

### 🗣️ **Real-Time Voice Tutor**
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Robot.png" alt="Robot" width="25" /> Talk naturally with your AI tutor using voice commands

- **Two-Way Audio Conversations:** Ask questions verbally and get spoken responses
- **Teacher Persona:** AI adopts a Socratic teaching style, asking follow-up questions to deepen understanding
- **Complex Topic Mastery:** Explains advanced concepts like **Kinked Demand Curves** and **Game Theory** in simple terms
- **Powered by:** Web Speech API for seamless voice interaction

### 📹 **Intelligent Video Summaries**
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Clapper%20Board.png" alt="Video" width="25" /> Extract key insights from educational videos instantly

- Auto-generated summaries of lecture content
- Visual breakdowns of **Payoff Matrices** and **Nash Equilibrium**
- Quick "Exam Tips" highlighting important concepts

### 🧠 **Context-Aware Chat Interface**
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Nerd%20Face.png" alt="Nerd" width="25" /> Ask anything about Oligopolies and get precise, sourced answers

- **Source Attribution:** Every answer includes references like *"As mentioned in Section 5.7.3..."*
- **Zero-Shot Problem Solving:** Solves hypothetical scenarios using curriculum principles
- **No Hallucinations:** Responses are strictly limited to provided course material

---

## 🏗️ System Architecture

```
┌─────────────────┐
│  Student Query  │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────┐
│   Context Retrieval Layer   │  ← Extracts relevant PDF sections
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│   Prompt Engineering Layer  │  ← Injects curriculum context
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│   Gemini 1.5 Flash (LLM)   │  ← Generates grounded response
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│   Response with Sources     │
└─────────────────────────────┘
```

**Key Components:**
1. **Ingestion Pipeline:** Preprocesses PDFs and video transcripts into structured knowledge chunks
2. **RAG Engine:** Retrieves relevant context before generating responses
3. **AI Layer:** Gemini 1.5 Flash provides fast, accurate answers with educational formatting

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technologies |
|:---:|:---|
| **Frontend** | <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black" /> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/Tailwind-38B2AC?style=flat&logo=tailwind-css&logoColor=white" /> <img src="https://img.shields.io/badge/Framer-0055FF?style=flat&logo=framer&logoColor=white" /> |
| **Backend** | <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white" /> <img src="https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white" /> |
| **Database** | <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white" /> <img src="https://img.shields.io/badge/Mongoose-880000?style=flat&logo=mongoose&logoColor=white" /> |
| **AI/ML** | <img src="https://img.shields.io/badge/Gemini%201.5%20Flash-4285F4?style=flat&logo=google&logoColor=white" /> <img src="https://img.shields.io/badge/RAG%20Pipeline-FF6F00?style=flat&logo=databricks&logoColor=white" /> |
| **Auth** | <img src="https://img.shields.io/badge/JWT-000000?style=flat&logo=json-web-tokens&logoColor=white" /> <img src="https://img.shields.io/badge/Bcrypt-003A70?style=flat&logo=letsencrypt&logoColor=white" /> |

</div>

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have:
- **Node.js** v18 or higher
- **MongoDB Atlas** account (or local MongoDB instance)
- **Google Gemini API Key** ([Get it here](https://ai.google.dev/))

### Installation Steps

#### 1️⃣ Clone the Repository
```
git clone https://github.com/vivekk002/eco-lamda.git
cd assignment1
```

#### 2️⃣ Backend Setup
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

#### 3️⃣ Frontend Setup
```
cd ../client
npm install
npm run dev
```

#### 4️⃣ Access the Application
Open your browser and navigate to:
```
http://localhost:5173
```

---

## 🎨 Key Design Decisions

### Why Gemini 1.5 Flash?
- **Low Latency:** Critical for real-time voice interactions
- **Large Context Window:** Handles entire chapter content in a single prompt
- **Cost-Effective:** Flash variant optimized for educational use cases

### Prompt Engineering Strategy
Instead of generic responses, the system uses:
- **System Instructions:** Forces Socratic teaching methods
- **Few-Shot Examples:** Trains the model to cite specific textbook sections
- **Temperature Control:** Balances creativity with factual accuracy

### Authentication Architecture
- **Stateless JWT:** Reduces database queries during user sessions
- **Secure Password Hashing:** Bcrypt with salt rounds for user data protection

---

## 📸 Screenshots

<div align="center">

### Chat Interface
*Clean, distraction-free UI for focused learning*

### Voice Tutor Mode
*Natural conversations with AI-powered explanations*

### Video Summaries
*Quick insights extracted from educational content*

</div>

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve EcoStudy AI:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is part of a Full Stack AI Internship Assessment.

---

<div align="center">

### 🌟 Built with passion by [Vivek Kumar](https://github.com/vivekk002)

**If this project helped you, consider giving it a star ⭐**

[![GitHub](https://img.shields.io/badge/GitHub-vivekk002-181717?style=for-the-badge&logo=github)](https://github.com/vivekk002)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-ff4081?style=for-the-badge&logo=google-chrome)](https://vivekk002.vercel.app)

</div>
```

***
