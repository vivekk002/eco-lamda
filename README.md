Here is the complete `README.md` content in a single copyable block.

```markdown
# 🧠 EcoStudy AI: RAG-Powered Economics Tutor

![Project Status](https://img.shields.io/badge/Status-MVP%20Complete-success)
![Tech Stack](https://img.shields.io/badge/Stack-MERN%20%2B%20Gemini-blue)
![AI Model](https://img.shields.io/badge/AI-Gemini%201.5%20Flash-orange)

> **Live Demo:** [https://eco-study-22ox86k7t-vivekk002s-projects.vercel.app/](https://eco-study-22ox86k7t-vivekk002s-projects.vercel.app/)

## 📖 Overview

**EcoStudy AI** is an interactive educational platform modeled after **NotebookLM**, specifically tailored for Economics students studying **Oligopoly Theory**.

Unlike generic chatbots, this application uses a **Retrieval-Augmented Generation (RAG)** approach. It grounds all answers strictly in the provided curriculum material (Chapter 5.7 PDF and specific YouTube video transcripts), ensuring students receive accurate, exam-relevant information without hallucinations.

## ✨ Key Features (Assignment Deliverables)

### 1. 🗣️ Interactive Voice Tutor (Real-Time)
A flagship feature simulating a real-world tutoring session.
- **Two-way Audio:** Students can ask questions verbally.
- **AI Persona:** The agent adopts a "Teacher" persona to explain complex topics like the **Kinked Demand Curve** and **Interdependence**.
- **Tech:** Web Speech API and audio processing for seamless student-teacher dialogue.

### 2. 📹 Visual Video Summaries
- Automatically extracts key concepts from educational videos.
- Generates "Exam Tips" and visual breakdowns of **Game Theory** and **Payoff Matrices**.

### 3. 🧠 Context-Aware Chat
- **Source Grounding:** The AI explicitly references specific sections of the text (e.g., *"As mentioned in the concentration ratio section..."*).
- **Zero-Shot Reasoning:** Solves hypothetical economic scenarios based on the ingested rules.

## 🏗️ System Architecture

The application follows a modern MERN architecture enhanced with Generative AI capabilities:

1.  **Ingestion Layer:** Source materials (PDFs/Video Transcripts) are processed and structured.
2.  **Context Injection:** User queries are augmented with relevant context chunks before reaching the LLM.
3.  **Generation Layer:** Google's **Gemini 1.5 Flash** generates responses, formatted specifically for educational clarity.

## 🛠️ Tech Stack

| Component | Technologies |
| :--- | :--- |
| **Frontend** | React (Vite), TypeScript, Tailwind CSS, Framer Motion |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (User Auth & History), Mongoose |
| **AI Engine** | Google Gemini API (Generative Content & Reasoning) |
| **Auth** | JSON Web Tokens (JWT), Bcrypt |

## 🚀 Setup & Installation

Follow these steps to run the project locally.

### Prerequisites
* Node.js (v18+)
* MongoDB Atlas Connection String
* Google Gemini API Key

### 1. Clone the Repository
```bash
git clone [https://github.com/vivekk002/eco-lamda.git](https://github.com/vivekk002/eco-lamda.git)
cd assignment1

```

### 2. Backend Configuration

Navigate to the server directory and install dependencies:

```bash
cd server
npm install

```

Create a `.env` file in the `/server` root with the following credentials:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_secure_secret_key

```

Start the API server:

```bash
npm run dev

```

### 3. Frontend Configuration

Navigate to the client directory and start the UI:

```bash
cd ../client
npm install
npm run dev

```

Access the app at `http://localhost:5173`.

## 🧪 Engineering Decisions & Trade-offs

* **Gemini 1.5 Flash:** Chosen for its low latency and high context window, which is critical for real-time educational dialogue compared to heavier models.
* **Prompt Engineering:** Implemented "System Instructions" to force the AI to adopt a Socratic teaching style (asking questions back to the student) rather than just dumping information.
* **JWT Auth:** Stateless authentication was chosen to reduce database load during scaling.

## 🔮 Future Roadmap

* [ ] **Vector Database Integration:** Migrating from context injection to a dedicated Vector DB (Pinecone/Weaviate) for handling larger textbooks.
* [ ] **Multi-Modal Uploads:** Allowing students to upload their own handwritten graph notes for analysis.
* [ ] **Quiz Generation:** Auto-generating MCQs based on the chat history.

---

*Developed by Vivek Kumar as part of the Full Stack AI Internship Assessment.*

```

```
