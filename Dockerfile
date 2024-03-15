
FROM node:20


WORKDIR /nodejs2024Q1-service/src


COPY package*.json ./

RUN npm install


COPY . .


RUN npm run build


EXPOSE 4000


CMD ["npm", "run", "start:prod"]