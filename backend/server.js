require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY manquant dans .env");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const EMBEDDING_MODEL = "gemini-embedding-001";
const CHAT_MODEL = "gemini-3.6-flash";

const EMBEDDINGS_FILE = path.join(__dirname, "data/embeddings.json");
let knowledgeBase = [];

function loadKnowledgeBase() {
  if (!fs.existsSync(EMBEDDINGS_FILE)) {
    console.error(`❌ ${EMBEDDINGS_FILE} introuvable. Lance d'abord : npm run generate-embeddings`);
    process.exit(1);
  }
  knowledgeBase = JSON.parse(fs.readFileSync(EMBEDDINGS_FILE, "utf-8"));
  console.log(`📚 Base de connaissances chargée : ${knowledgeBase.length} chunks.`);
}

// Similarité cosinus entre deux vecteurs d'embedding
function cosineSimilarity(a, b) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

async function embedQuery(text) {
  const response = await ai.models.embedContent({
    model: EMBEDDING_MODEL,
    contents: text,
  });
  return response.embeddings[0].values;
}

// Retourne les topK chunks les plus proches de la question posée
function getTopChunks(queryEmbedding, topK = 4) {
  const scored = knowledgeBase.map((chunk) => ({
    ...chunk,
    score: cosineSimilarity(queryEmbedding, chunk.embedding),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK);
}

const SYSTEM_PROMPT = `Tu es l'assistant du portfolio de Maryem Bannour (utilise toujours "elle"/"ses"/"sa" pour parler d'elle), étudiante en Master ISI et développeuse full-stack/mobile en cours de spécialisation en IA.
Réponds UNIQUEMENT à partir du contexte fourni ci-dessous, en français, de façon claire et concise (2-4 phrases maximum sauf si la question demande plus de détail).
Si la question sort du sujet (rien à voir avec Maryem, son parcours, ses projets ou ses compétences), réponds poliment que tu ne peux répondre qu'aux questions sur le profil de Maryem.
Ne fabrique jamais d'information qui n'est pas dans le contexte fourni.`;

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Le champ 'message' est requis." });
    }

    const queryEmbedding = await embedQuery(message);
    const topChunks = getTopChunks(queryEmbedding, 4);
    const context = topChunks.map((c) => c.text).join("\n\n---\n\n");

    const prompt = `${SYSTEM_PROMPT}

Contexte :
${context}

Question du visiteur : ${message}`;

    const response = await ai.models.generateContent({
      model: CHAT_MODEL,
      contents: prompt,
    });

    res.json({ reply: response.text });
  } catch (err) {
    console.error("Erreur /chat :", err);
    res.status(500).json({ error: "Une erreur est survenue côté serveur." });
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", chunks: knowledgeBase.length });
});

loadKnowledgeBase();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Serveur RAG lancé sur http://localhost:${PORT}`);
});
