FROM node:alpine
WORKDIR /usr/app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 9000
CMD ["npm", "run", "start"]
