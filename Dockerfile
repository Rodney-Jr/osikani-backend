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

# ✅ Run migrations ONLY at runtime (Railway network available)
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
