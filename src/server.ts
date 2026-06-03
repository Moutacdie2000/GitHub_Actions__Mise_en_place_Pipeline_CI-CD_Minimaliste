import { createApp } from "./app.js";

/**
 * Point d'entrée du serveur HTTP.
 *
 * Importe l'application Express configurée puis l'expose sur le port défini
 * par la variable d'environnement `PORT` (3000 par défaut).
 */
const port = Number(process.env.PORT) || 3000;
const app = createApp();

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`text-utils à l'écoute sur http://localhost:${port}`);
});
