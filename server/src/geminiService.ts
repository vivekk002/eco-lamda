import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined in the environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

const GLOBAL_CONTEXT = `
  TOPIC: Economics - Oligopoly
  KEY CONCEPTS:
  1. Oligopoly: Market dominated by few large firms. High barriers to entry. Interdependence.
  2. Kinked Demand Curve: Explains price stability. Rivals follow price cuts but ignore price hikes.
  3. Game Theory: Strategic decision making. Nash Equilibrium (no player benefits from changing strategy unilaterally).
  4. Collusion: Cooperation to fix prices. Overt (cartels) vs Tacit (price leadership).
  5. Examples: Supermarkets, Oil industries.
`;

export async function getGeminiResponse(question: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const prompt = `
      You are an expert Economics Tutor for EcoStudy AI. 
      Respond naturally to user greetings and questions.
      If the user asks an academic question, base your answer strictly on this context:
      ${GLOBAL_CONTEXT}

      USER QUESTION: ${question}
      
      YOUR RESPONSE:
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble thinking right now. Please check my API key.";
  }
}
