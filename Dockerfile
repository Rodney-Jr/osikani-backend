FROM node:20-alpine

RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Prisma client generation DOES NOT require DB
RUN npx prisma generate

# Build app
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3001

# 🚨 Explicit shell + explicit commands (prevents pid1 error)
CMD ["/bin/sh", "-c", "npx prisma migrate deploy && node dist/server/index.js"]
