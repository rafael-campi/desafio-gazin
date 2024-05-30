# Etapa 2: Servir os arquivos estáticos usando nginx
FROM nginx:alpine

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos estáticos da pasta de build para o nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar o arquivo de configuração do nginx
COPY .docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# Expor a porta 3000
EXPOSE 3000

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]
