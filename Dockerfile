# Base Image
FROM node:20-alpine

# Install OpenSSL (REQUIRED for Prisma)
RUN apt-get update && apt-get install -y openssl \
  && rm -rf /var/lib/apt/lists/*
  
# Working Directory
WORKDIR /app

# Install Dependencies
COPY package*.json ./
RUN npm ci

# Copy Source Code
COPY . .

# Build for Production
# This runs "vite build" (frontend) and "tsup" (backend)
RUN npm run build

# Environment Setup
ENV NODE_ENV=production
ENV PORT=3001

# Start Server
# The "start" script runs "node dist/server/index.js"
CMD ["npm", "start"]
