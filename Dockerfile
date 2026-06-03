# syntax=docker/dockerfile:1

############################
# Étape 1 : build (compilation TypeScript -> JavaScript)
############################
FROM node:20-alpine AS build
WORKDIR /app

# Installer TOUTES les dépendances (dont devDependencies) de manière reproductible.
COPY package.json package-lock.json* ./
RUN npm ci

# Copier les sources et compiler vers dist/.
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Élaguer les devDependencies : il ne reste que les deps de production.
RUN npm prune --omit=dev

############################
# Étape 2 : runtime (image finale minimale)
############################
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Récupérer uniquement les artefacts nécessaires depuis l'étape de build.
COPY package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Exécuter en tant qu'utilisateur non-root (l'utilisateur `node` existe dans l'image officielle).
USER node

EXPOSE 3000
CMD ["node", "dist/server.js"]
