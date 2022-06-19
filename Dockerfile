FROM node:alpine
WORKDIR /opt/app
ADD package.json package.json
RUN yarn
ADD . .
RUN yarn build
RUN yarn --production
CMD ['node', './dist/main.js']