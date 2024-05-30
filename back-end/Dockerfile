FROM php:8.3-fpm-alpine
RUN apk add --no-cache openssl bash nodejs npm postgresql-dev
RUN docker-php-ext-install bcmath pdo pdo_pgsql

WORKDIR /var/www

RUN rm -rf /var/www/html
RUN ln -s public html


RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer


COPY . /var/www
COPY .env.example /var/www/.env

#RUN chmod -R 777 /etc/hosts

#RUN echo "IP_ADDRESS db" >> /etc/hosts

RUN chmod -R 777 /var/www/storage
RUN php artisan migrate
RUN php artisan key:generate

EXPOSE 9000

ENTRYPOINT [ "php-fpm" ]