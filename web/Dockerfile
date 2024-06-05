# frontend/Dockerfile

FROM node:20 

WORKDIR /app 

COPY  package*.json ./

RUN npm install 

COPY . .
COPY .env ./

RUN npm run build 

EXPOSE 3000

CMD ["npm", "start"]