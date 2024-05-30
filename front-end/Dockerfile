# Etapa 1: Construir a aplicação
FROM node:22-alpine AS build

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json para o contêiner
COPY package.json package-lock.json ./

# Instalar as dependências
RUN npm install

# Copiar todo o código da aplicação para o contêiner
COPY . .

# Construir a aplicação para produção
RUN npm run build

# Etapa 2: Servir os arquivos estáticos usando nginx
FROM nginx:alpine

# Copiar os arquivos estáticos da pasta de build para o nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar o arquivo de configuração do nginx
COPY .docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# Expor a porta 80
EXPOSE 80

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]
