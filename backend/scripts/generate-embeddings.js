/**
 * Lit tous les fichiers .md dans /docs, les découpe en chunks (par section ##),
 * génère un embedding pour chaque chunk via l'API Gemini, et sauvegarde
 * le tout dans data/embeddings.json.
 *
 * Lancer avec : npm run generate-embeddings
 * (à relancer à chaque fois que tu modifies un fichier dans /docs)
 */

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY manquant. Copie .env.example vers .env et colle ta clé.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const EMBEDDING_MODEL = "gemini-embedding-001";

const DOCS_DIR = path.join(__dirname, "../docs");
const OUTPUT_FILE = path.join(__dirname, "../data/embeddings.json");

// Découpe un fichier markdown en chunks, un chunk par section "## ..."
// (le titre principal "# ..." est rattaché au premier chunk)
function chunkMarkdown(content, sourceFile) {
  const sections = content.split(/\n(?=## )/);
  return sections
    .map((s) => s.trim())
    .filter((s) => s.length > 20) // ignore les sections vides / notes résiduelles
    .map((text) => ({
      text: text.replace(/<!--[\s\S]*?-->/g, "").trim(), // retire les commentaires <!-- --> restants
      source: sourceFile,
    }))
    .filter((chunk) => chunk.text.length > 20);
}

async function embedText(text) {
  const response = await ai.models.embedContent({
    model: EMBEDDING_MODEL,
    contents: text,
  });
  return response.embeddings[0].values;
}

async function main() {
  const files = fs.readdirSync(DOCS_DIR).filter((f) => f.endsWith(".md"));

  if (files.length === 0) {
    console.error(`❌ Aucun fichier .md trouvé dans ${DOCS_DIR}`);
    process.exit(1);
  }

  const allChunks = [];
  for (const file of files) {
    const content = fs.readFileSync(path.join(DOCS_DIR, file), "utf-8");
    allChunks.push(...chunkMarkdown(content, file));
  }

  console.log(`${allChunks.length} chunks trouvés dans ${files.length} fichiers.\n`);

  const embedded = [];
  for (let i = 0; i < allChunks.length; i++) {
    const chunk = allChunks[i];
    process.stdout.write(`  → Embedding ${i + 1}/${allChunks.length} (${chunk.source})...`);
    try {
      const embedding = await embedText(chunk.text);
      embedded.push({ ...chunk, embedding });
      console.log(" ok");
    } catch (err) {
      console.log(" échec");
      console.error(`    Erreur sur le chunk ${i + 1} :`, err.message);
    }
    // petite pause pour rester tranquillement sous les limites du quota gratuit
    await new Promise((r) => setTimeout(r, 200));
  }

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(embedded, null, 2));
  console.log(`\n✅ ${embedded.length} embeddings sauvegardés dans ${path.relative(process.cwd(), OUTPUT_FILE)}`);
}

main().catch((err) => {
  console.error("Erreur fatale :", err);
  process.exit(1);
});
