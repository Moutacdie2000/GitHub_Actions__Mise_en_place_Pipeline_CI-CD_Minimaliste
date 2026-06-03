/**
 * Fonctions utilitaires PURES de manipulation de texte.
 *
 * Aucune dépendance externe, aucun effet de bord : chaque fonction renvoie
 * un résultat déterministe à partir de ses seuls arguments. Elles sont donc
 * idéales pour des tests unitaires (cf. `text.test.ts`).
 */

/**
 * Transforme une chaîne en « slug » utilisable dans une URL.
 *
 * - Passe le texte en minuscules.
 * - Supprime les accents (normalisation Unicode NFD).
 * - Remplace tout caractère non alphanumérique par un tiret.
 * - Fusionne les tirets consécutifs et retire ceux en début/fin.
 *
 * @example slugify("Bonjour le Monde !") // "bonjour-le-monde"
 */
export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Compte le nombre de mots d'une chaîne.
 *
 * Les mots sont séparés par n'importe quelle suite d'espaces blancs.
 * Une chaîne vide ou composée uniquement d'espaces renvoie 0.
 *
 * @example wordCount("  un   deux trois ") // 3
 */
export function wordCount(input: string): number {
  const trimmed = input.trim();
  if (trimmed.length === 0) {
    return 0;
  }
  return trimmed.split(/\s+/).length;
}

/**
 * Tronque une chaîne à `maxLength` caractères et ajoute « … » si nécessaire.
 *
 * Le caractère de troncature « … » est inclus dans la longueur finale.
 * Si la chaîne est déjà assez courte, elle est renvoyée telle quelle.
 *
 * @throws {RangeError} si `maxLength` est négatif.
 * @example truncate("Bonjour le monde", 10) // "Bonjour l…"
 */
export function truncate(input: string, maxLength: number): string {
  if (maxLength < 0) {
    throw new RangeError("maxLength doit être un entier positif ou nul");
  }
  if (input.length <= maxLength) {
    return input;
  }
  if (maxLength === 0) {
    return "";
  }
  return input.slice(0, maxLength - 1) + "…";
}

/**
 * Met chaque mot en « Title Case » (première lettre en majuscule).
 *
 * Les séparateurs (espaces) d'origine entre les mots sont normalisés en
 * un espace simple. Une chaîne vide renvoie une chaîne vide.
 *
 * @example titleCase("bonjour le MONDE") // "Bonjour Le Monde"
 */
export function titleCase(input: string): string {
  const trimmed = input.trim();
  if (trimmed.length === 0) {
    return "";
  }
  return trimmed
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
