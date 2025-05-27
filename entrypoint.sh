#!/bin/sh

# Copy .env kalau belum ada
if [ ! -f .env ]; then
    cp .env.example .env
fi

# Tunggu MySQL siap
echo "Menunggu database MySQL..."
while ! nc -z db 3306; do
  sleep 1
  echo "Menunggu database MySQL..."
done
echo "Database MySQL siap!"

# Setup Laravel
php artisan key:generate
php artisan migrate --force
# php artisan db:seed --force

# Permissions
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
chmod -R 775 /var/www/storage /var/www/bootstrap/cache

php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Start PHP-FPM (background, biar nginx bisa start)
php-fpm -D

# Start Nginx (foreground agar container tetap jalan)
nginx -g "daemon off;"
