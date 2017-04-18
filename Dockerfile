FROM node:latest

RUN apt-get update
RUN npm install -g mocha gulp