# ─────────────────────────────────────
# Stage 1: Build
# ─────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies with cache layer
COPY package.json package-lock.json* ./
RUN npm ci --prefer-offline

# Copy source
COPY . .

# Build static export
RUN npm run build

# ─────────────────────────────────────
# Stage 2: Serve with Nginx
# ─────────────────────────────────────
FROM nginx:1.27-alpine AS runner

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Custom nginx config optimised for Next.js static export
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
