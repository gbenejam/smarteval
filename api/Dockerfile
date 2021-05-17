# syntax=docker/dockerfile:1

FROM node:14-buster

WORKDIR /smarteval

ENV DB_HOST="mongo-db"
ENV DB_PORT="27018"

COPY package.json index.js wait-for-it.sh ./

RUN yarn install && \
  chmod +x wait-for-it.sh
