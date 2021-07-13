FROM node:alpine

WORKDIR /root/nestjs-project-template

COPY . .

RUN yarn

RUN yarn build

CMD ["node", "dist/main.js"]
