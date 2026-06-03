import { defineConfig } from "vitest/config";

/**
 * Configuration Vitest.
 *
 * - `environment: node` : les tests s'exécutent dans un contexte Node
 *   (API Express + supertest, aucune dépendance navigateur).
 * - `include` : on ne ramasse que les fichiers `*.test.ts` du dossier `src`.
 */
export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
