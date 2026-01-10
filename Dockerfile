FROM node:20-alpine

# Install necessary binaries for Prisma and Alpine
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

# Install dependencies separately to leverage Docker cache
COPY package*.json ./
RUN npm ci

# Copy the rest of the source code
COPY . .

# --- THE FIX ---
# Provide a dummy DATABASE_URL just for the build phase.
# This prevents Error P1012 during prisma generate.
ENV DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"

# Generate Prisma Client and build the app
RUN npx prisma generate
RUN npm run build

# Clear the build-time ENV (so it doesn't accidentally point to the placeholder at runtime)
ENV DATABASE_URL=""

ENV NODE_ENV=production
ENV PORT=3001

# Run migrations and start the server
CMD ["/bin/sh", "-c", "npx prisma migrate deploy && node dist/server/index.cjs"]