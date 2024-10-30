FROM node:latest

RUN npm install -g typescript

COPY ./ ./front

WORKDIR ./front

RUN sh setup.sh

CMD npm run start
