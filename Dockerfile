# Base Image
FROM node:20-alpine

# Install OpenSSL (REQUIRED for Prisma)
RUN apk add --no-cache openssl libc6-compat

# Working Directory
WORKDIR /app

# Install Dependencies
COPY package*.json ./
RUN npm ci

# Copy Source Code
COPY . .

# 🔑 Generate Prisma Client (REQUIRED)
RUN npx prisma generate

# Build for Production
RUN npm run build

# Environment Setup
ENV NODE_ENV=production
ENV PORT=3001

# Start Server
CMD ["npm", "start"]
