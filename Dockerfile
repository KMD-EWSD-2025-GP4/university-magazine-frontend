# Build stage
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Add build arguments for environment variables
ARG VITE_API_URL
# Create .env file from build arguments
RUN echo "VITE_API_URL=${VITE_API_URL:-http://localhost:3001}" > .env

COPY . .
RUN pnpm build:force

# Production stage
FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]