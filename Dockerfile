FROM node:16.14-alpine

WORKDIR /app

COPY [^node_modules]* .
RUN apk update && apk add bash
RUN yarn install

# Development
# CMD ["yarn", "dev"]

# Production
RUN npm install -g pm2
RUN yarn build
CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]