FROM node:15-alpine

WORKDIR /root/nestjs-project-template

COPY . .

RUN yarn

CMD ["node", "dist/main.js"]
