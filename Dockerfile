FROM node:lts-alpine
RUN apk add --no-cache mariadb-client
WORKDIR /app
ADD . .
RUN yarn install --frozen-lockfile && yarn build
CMD [ "node", "." ]
