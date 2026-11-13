import "dotenv/config";
import express from "express";
import type { Express } from "express";
import { GoogleGenAI } from "@google/genai";
import cors from "cors";
import bcrypt from "bcryptjs";
import { prisma } from "./lib/prisma.js";

const data = [
  {
    id: 1,
    name: "John Doe",
  },
  {
    id: 2,
    name: "Rick Ross",
  },
  {
    id: 3,
    name: "Jaden Smith",
  },
  {
    id: 4,
    name: "Rockafeller",
  },
];

interface ChatMessage {
  role: "user" | "ai";
  content: string;
}

interface AskRequest {
  question: string;
  history: ChatMessage[];
}

// app.get(path, callback);
function healthCheck(app: Express) {
  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", message: "Server is healthy", data });
  });
}

function getUsers(app: Express) {
  app.get("/api/users", async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });
      return res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      console.error("Failed to fetch users:", error);

      return res.status(500).json({
        success: false,
        error: "Failed to fetch users",
      });
    }
  });
}

function createUser(app: Express) {
  app.post("/api/users", async (req, res) => {
    try {
      const { username, name, email, password } = req.body ?? {};

      // Validate required fields
      if (typeof username !== "string" || !username.trim()) {
        return res.status(400).json({
          error: "Username is required",
        });
      }

      if (typeof password !== "string" || !password) {
        return res.status(400).json({
          error: "Password is required",
        });
      }

      // Validate field lengths
      if (username.trim().length < 3) {
        return res.status(400).json({
          error: "Username must be at least 3 characters long",
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          error: "Password must be at least 6 characters long",
        });
      }

      const passwordHash = await bcrypt.hash(password, 12);

      const user = await prisma.user.create({
        data: {
          username: username.trim(),
          name: typeof name === "string" ? name.trim() : null,
          email: typeof email === "string" ? email.trim() || null : null,
          passwordHash,
        },
        select: {
          id: true,
          username: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      console.error("User creation failed:", error);

      return res.status(500).json({
        error: "Internal server error",
      });
    }
  });
}

function aiQueryHandler(app: Express) {
  app.post("/api/ai/ask", async (req, res) => {
    const { question, history = [] } = req.body as AskRequest;

    if (typeof question !== "string" || !question.trim()) {
      return res.status(400).json({
        error: "Question is required",
      });
    }

    if (!Array.isArray(history)) {
      return res.status(400).json({
        error: "Invalid conversation history",
      });
    }

    try {
      // Convert frontend messages into Gemini's expected format
      const geminiHistory = history.map((message) => ({
        role: message.role === "ai" ? ("model" as const) : ("user" as const),
        parts: [{ text: message.content }],
      }));

      // Create a new chat with previous conversation history
      const chat = ai.chats.create({
        model: "gemini-3.5-flash-lite",
        history: geminiHistory,
      });

      // Send only the latest question
      const response = await chat.sendMessage({
        message: question,
      });

      return res.status(200).json({
        answer: response.text,
      });
    } catch (error) {
      console.error("Error querying AI:", error);

      return res.status(500).json({
        error: "Failed to generate AI response",
      });
    }
  });
}

function getHistory(app: Express) {
  app.get("/api/ai/history", (req, res) => {
    const { history = [] } = req.body as AskRequest;
    const chatHistory: ChatMessage[] = history.map((message) => ({
      role: message.role,
      content: message.content,
    }));
    res.status(200).json({
      history: chatHistory,
    });
  });
}

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing from environment variables");
}

const ai = new GoogleGenAI({ apiKey });

// 1. express()
// Creates an Express application
const app = express();

// Must come BEFORE routes
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// 2. healthCheck(app)
// Registers the GET /health route
healthCheck(app);
aiQueryHandler(app);
getHistory(app);
getUsers(app);
createUser(app);

// app.listen(5000)
// Starts listening for HTTP requests
app.listen(5000, () => console.log("Server is running on port 5000"));

// express.json() is a middleware that we register using app.use()
