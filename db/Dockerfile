# syntax=docker/dockerfile:1

FROM mongo:4.2.14 as build

WORKDIR /smarteval

COPY smarteval data-files/

RUN nohup bash -c "mongod --dbpath=/data/db &" && sleep 10 && \
  mongorestore -d smarteval data-files && \
  chown -R mongodb:mongodb /data/db && \
  chmod -R go+w /data/db


FROM build

RUN rm -f /tmp/mongodb-*

EXPOSE 27018
CMD ["mongod", "--port=27018", "--dbpath=/data/db"]