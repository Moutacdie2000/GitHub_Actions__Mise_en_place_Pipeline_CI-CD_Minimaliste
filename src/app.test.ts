import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp, APP_VERSION } from "./app.js";

const app = createApp();

describe("GET /health", () => {
  it("répond 200 avec le statut ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});

describe("GET /", () => {
  it("renvoie le nom et la version de l'API", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("text-utils");
    expect(res.body.version).toBe(APP_VERSION);
    expect(Array.isArray(res.body.endpoints)).toBe(true);
  });
});

describe("GET /api/slugify", () => {
  it("transforme le texte fourni en slug", async () => {
    const res = await request(app).get("/api/slugify").query({ text: "Bonjour le Monde !" });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ input: "Bonjour le Monde !", slug: "bonjour-le-monde" });
  });

  it("répond 400 quand le paramètre text est absent", async () => {
    const res = await request(app).get("/api/slugify");
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});

describe("GET /api/wordcount", () => {
  it("compte les mots du texte fourni", async () => {
    const res = await request(app).get("/api/wordcount").query({ text: "un deux trois" });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ input: "un deux trois", count: 3 });
  });

  it("répond 400 quand le paramètre text est absent", async () => {
    const res = await request(app).get("/api/wordcount");
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});

describe("Routes inconnues", () => {
  it("répond 404 sur une route non définie", async () => {
    const res = await request(app).get("/route-inexistante");
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });
});
