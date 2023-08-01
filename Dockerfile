FROM node:16-alpine

WORKDIR /pages

COPY package.json /pages

RUN yarn install

COPY . /pages

EXPOSE 3000

CMD ["yarn", "start"]