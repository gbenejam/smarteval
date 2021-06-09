# syntax=docker/dockerfile:1

FROM node:14-buster

# build the server-app for production

WORKDIR /frontend

COPY server-app/package.json ./
COPY server-app/src ./src
COPY server-app/public ./public
RUN yarn install && yarn build

# set up the node server

WORKDIR /smarteval

ENV DB_HOST="mongo-db"
ENV DB_PORT="27018"
ENV DEV="true"

COPY api/package.json api/index.js api/wait-for-it.sh ./

RUN cp -R /frontend/build . && \
  yarn install && \
  chmod +x wait-for-it.sh
