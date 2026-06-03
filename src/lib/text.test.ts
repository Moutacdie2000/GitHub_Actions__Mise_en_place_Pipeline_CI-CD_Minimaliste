import { describe, it, expect } from "vitest";
import { slugify, wordCount, truncate, titleCase } from "./text.js";

describe("slugify", () => {
  it("met le texte en minuscules et remplace les espaces par des tirets", () => {
    expect(slugify("Bonjour le Monde")).toBe("bonjour-le-monde");
  });

  it("supprime les accents", () => {
    expect(slugify("Crème brûlée à Noël")).toBe("creme-brulee-a-noel");
  });

  it("retire la ponctuation et fusionne les tirets consécutifs", () => {
    expect(slugify("Hello,   World!!!")).toBe("hello-world");
  });

  it("retire les tirets en début et en fin", () => {
    expect(slugify("  !!! Salut !!!  ")).toBe("salut");
  });

  it("renvoie une chaîne vide pour une entrée vide", () => {
    expect(slugify("")).toBe("");
  });

  it("renvoie une chaîne vide quand il n'y a aucun caractère alphanumérique", () => {
    expect(slugify("!!! ??? ...")).toBe("");
  });
});

describe("wordCount", () => {
  it("compte les mots séparés par un espace simple", () => {
    expect(wordCount("un deux trois")).toBe(3);
  });

  it("ignore les espaces multiples et en bordure", () => {
    expect(wordCount("  un   deux  trois ")).toBe(3);
  });

  it("renvoie 0 pour une chaîne vide", () => {
    expect(wordCount("")).toBe(0);
  });

  it("renvoie 0 pour une chaîne composée uniquement d'espaces", () => {
    expect(wordCount("    \t  \n ")).toBe(0);
  });

  it("compte un mot unique", () => {
    expect(wordCount("bonjour")).toBe(1);
  });
});

describe("truncate", () => {
  it("ne modifie pas une chaîne plus courte que la limite", () => {
    expect(truncate("court", 10)).toBe("court");
  });

  it("ne modifie pas une chaîne exactement à la limite", () => {
    expect(truncate("douze", 5)).toBe("douze");
  });

  it("tronque et ajoute le caractère de troncature", () => {
    expect(truncate("Bonjour le monde", 10)).toBe("Bonjour l…");
  });

  it("renvoie le caractère de troncature seul pour des limites très courtes", () => {
    expect(truncate("abcdef", 1)).toBe("…");
  });

  it("renvoie une chaîne vide quand la limite vaut 0", () => {
    expect(truncate("abcdef", 0)).toBe("");
  });

  it("lève une RangeError pour une limite négative", () => {
    expect(() => truncate("abc", -1)).toThrow(RangeError);
  });
});

describe("titleCase", () => {
  it("met une majuscule à chaque mot", () => {
    expect(titleCase("bonjour le monde")).toBe("Bonjour Le Monde");
  });

  it("normalise les mots déjà en majuscules", () => {
    expect(titleCase("bonjour le MONDE")).toBe("Bonjour Le Monde");
  });

  it("normalise les espaces multiples en un espace simple", () => {
    expect(titleCase("  bonjour   le  monde ")).toBe("Bonjour Le Monde");
  });

  it("renvoie une chaîne vide pour une entrée vide", () => {
    expect(titleCase("")).toBe("");
  });
});
