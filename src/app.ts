import express, { type Express, type Request, type Response } from "express";
import { slugify, wordCount } from "./lib/text.js";

/**
 * Version applicative exposée par l'API.
 * Synchronisée manuellement avec le champ `version` du package.json.
 */
export const APP_VERSION = "1.0.0";

/**
 * Construit et configure l'application Express.
 *
 * L'application est volontairement SÉPARÉE du démarrage du serveur
 * (cf. `server.ts`) afin de pouvoir l'importer telle quelle dans les
 * tests d'intégration (supertest) sans ouvrir de port réseau.
 */
export function createApp(): Express {
  const app = express();

  // Page d'accueil : informations générales sur l'API.
  app.get("/", (_req: Request, res: Response) => {
    res.json({
      name: "text-utils",
      version: APP_VERSION,
      description: "Petite API de manipulation de texte (support du pipeline CI/CD).",
      endpoints: ["/health", "/api/slugify?text=", "/api/wordcount?text="],
    });
  });

  // Sonde de santé utilisée par les orchestrateurs / le pipeline.
  app.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
  });

  // Transforme le paramètre `text` en slug.
  app.get("/api/slugify", (req: Request, res: Response) => {
    const text = req.query.text;
    if (typeof text !== "string") {
      res.status(400).json({ error: "Le paramètre 'text' est requis." });
      return;
    }
    res.json({ input: text, slug: slugify(text) });
  });

  // Compte le nombre de mots du paramètre `text`.
  app.get("/api/wordcount", (req: Request, res: Response) => {
    const text = req.query.text;
    if (typeof text !== "string") {
      res.status(400).json({ error: "Le paramètre 'text' est requis." });
      return;
    }
    res.json({ input: text, count: wordCount(text) });
  });

  // Gestion générique des routes inconnues (404).
  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: "Ressource introuvable." });
  });

  return app;
}
