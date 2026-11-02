import "dotenv/config";
import express from "express";
import type { Express } from "express";
import { GoogleGenAI } from "@google/genai";

// app.get(path, callback);
function healthCheck(app: Express){
    app.get('/health', (req, res) => {
        res.status(200).json({ status: 'ok' });
    })
}

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing from environment variables");
}

const ai = new GoogleGenAI({ apiKey });

// 1. express()
// Creates an Express application
const app = express() 


// 2. healthCheck(app)
// Registers the GET /health route
healthCheck(app);


// app.listen(5000)
// Starts listening for HTTP requests
app.listen(5000, () => console.log('Server is running on port 5000'))