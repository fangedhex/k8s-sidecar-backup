FROM fangedhex/baseimage-s6
RUN apk add --no-cache nodejs yarn
ADD docker /
WORKDIR /app
ADD . .
RUN yarn install --frozen-lockfile && yarn build
