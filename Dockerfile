# === STAGE 1: Composer Builder (PHP only)
FROM php:8.4-cli as composer-builder

RUN apt-get update && apt-get install -y \
    zip \
    unzip \
    curl \
    git \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd dom zip \
    && rm -rf /var/lib/apt/lists/*
    
# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
WORKDIR /app
COPY . .
RUN composer install --no-dev --no-interaction --optimize-autoloader

# === STAGE 2: Node Builder (frontend only)
FROM node:22-bookworm-slim as node-builder

WORKDIR /app
COPY . .
RUN npm ci && npm run build && cp public/build/.vite/manifest.json public/build

# === STAGE 3: Final Runtime Image
FROM php:8.4-fpm

# Install minimal runtime
RUN apt-get update && apt-get install -y \
    nginx \
    netcat-openbsd \
    python3-venv \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    curl \
    libonig-dev \
    libxml2-dev \
    && docker-php-ext-install \
    pdo pdo_mysql mbstring exif pcntl bcmath gd \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www

# Copy Laravel (backend) dari composer-builder
COPY --from=composer-builder /app /var/www

# Salin hasil build frontend dari node-builder
COPY --from=node-builder /app/public/build /var/www/public/build
COPY --from=node-builder /app/public/build/.vite/manifest.json /var/www/public/build/

# Copy nginx config & entrypoint
RUN rm -rf /etc/nginx/sites-enabled/*
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh && chmod -R 775 storage bootstrap/cache

# Cleanup
RUN rm -rf /var/cache/apk/* /tmp/*

EXPOSE 80
ENTRYPOINT ["/bin/sh", "./entrypoint.sh"]