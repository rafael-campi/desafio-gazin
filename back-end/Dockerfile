FROM php:8.3-fpm-alpine

# Instalação de dependências
RUN apk add --no-cache openssl bash nodejs npm postgresql-dev

# Extensões PHP
RUN docker-php-ext-install bcmath pdo pdo_pgsql

# Define o diretório de trabalho
WORKDIR /var/www

# Configurações do projeto
RUN rm -rf /var/www/html
RUN ln -s public html

# Instalação do Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copia os arquivos do projeto
COPY . /var/www
COPY .env.example /var/www/.env

# Define permissões para a pasta de armazenamento antes de instalar dependências
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
RUN chmod -R 775 /var/www/storage /var/www/bootstrap/cache


# Volta para o usuário root para realizar outras tarefas administrativas
USER root

# Define permissões novamente para garantir que o Laravel pode escrever nos diretórios necessários
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
RUN chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Copia e dá permissão ao entrypoint script
COPY .docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Exposição da porta
EXPOSE 9000

# Define o entrypoint
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
