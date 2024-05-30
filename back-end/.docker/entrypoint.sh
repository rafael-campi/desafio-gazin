#!/bin/sh

# Ajuste de permissões
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Execute os comandos necessários
composer install --no-interaction --optimize-autoloader --no-dev
php artisan key:generate
php artisan migrate

# Inicie o PHP-FPM
exec php-fpm
